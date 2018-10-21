---
title: "Não tema as PWAs, aprenda progressivamente - Service Workers"
author: Jhonny Roger
image: https://res.cloudinary.com/jhonny-roger-blog/image/upload/v1538920148/Blog/pwa-720p.jpg
type: post
date: 2018-10-20
excerpt: Progressive Web Apps são mais simples do que você imagina! Um tutorial inicial sobre a API de Service Workers.
categories:
  - PWA
  - JavaScript
  - Web
tags:
  - PWA
  - Progressive Web Apps
  - Javascript
  - SW
  - Service Workers
  - Html
  - Web
---


### O que são PWAs?

Fala galera! Hoje nós vamos falar sobre um assunto que está gerando bastante hype na comunidade web, as PWAs. 

PWAs ou Progressive Web Apps são um conjunto de estratégias, APIs e tecnologias que estão dando novos poderes para a web como plataforma, fazendo com que páginas web se pareçam e se comportem como apps nativas.

Elas possibilitam acesso a funcionalidades como funcionamento offline, push notifications, cacheamento de assets, cacheamento de requisições, instalação, ícone na home screen, splash screen, cor de tema, , sincronização em segundo plano entre outras.

Segundo a Google PWAs devem ser:

- Confiáveis: Carregam instantaneamente e nunca apresentam o (o dinossaurinho do Chrome) mesmo em casos de problemas com a conexão. Sua app sempre estará minimamente funcional quando o usuário precisar.

- Rápidas: 53% dos usuários abandonam um site que demora mais de 3s para carregar, com PWA a experiência de carregamento deve ser rápida e a navegação suave.

- Gerar Engajamento: Se parece com um app nativo, são instaláveis e podem ser adicionadas na home do usuário aumentando as chances do usuário acessar novamente sua app, além de oferecer alternativas de interação com o usuário como push notifications.

Este é um assunto bem amplo e ainda está em evolução, para este post não ficar enorme nós focaremos na API mais poderosa quando o assunto é PWA, a API de Service Workers. 

<p class="ciu_embed" data-feature="serviceworkers" data-periods="future_1,current,past_1,past_2" data-accessible-colours="false">
  <a href="http://caniuse.com/#feat=serviceworkers">Can I Use serviceworkers?</a> Data on support for the serviceworkers feature across the major browsers from caniuse.com.
</p>

###  Service Workers

Um Service Worker é um Worker que basicamente funciona como um proxy no lado do cliente, como ele é possível interceptar requisições de rede e a navegação em si possibilitando o cacheamento de assets e até mesmo de requisições, além de funcionalidades extras como push notifications e background sync. No entanto existem algumas regras para se ficar atento:

- Só é possível registrar um Service Worker por escopo
- Por só existir um Service Worker por escopo, a mesma "instancia" de um Service Worker controlará todas as páginas e abas do seu site no navegador
- O Service Worker roda em uma thread separada, sendo assim, ele não pode acessar e modificar diretamente a DOM
- Ele é pensado para ser 100% assíncrono, desta forma, não é possível realizar operações bloqueantes e nem utilizar APIS bloqueantes como o localStorage.
- Por ser uma api 100% assíncrona, todas as suas funções são baseadas em promises, sendo assim é necessário estar familiarizado com a sintaxe e funcionamento de promises - async/await.
- Service Workers só funcionam em sites protegidos por HTTPS, no entanto é possível rodar um Service Worker em ambiente de desenvolvimento no localhost sem um certificado SSL/TLS.
- Não utilize cache para servir o arquivo de Sservice Worker, o mais correto é configurar o header max-age para zero em seu servidor para que o arquivo nunca seja cacheado pelo browser.

### Registrando um Service Worker

O registro de um Service Worker é o primeiro passo para inicializar o seu ciclo de vida, ele pode ser feito em qualquer arquivo de script que é carregado em sua página ou até mesmo dentro de uma tag script. O mais recomendável é inserir o script de registro no `head` para que ele carregue o mais rápido o possível.

Veja o código de exemplo:

      //Verifica se o navegador oferece suporte a Service Worker
      if ('serviceWorker' in navigator) {
          //registra o Service Worker
          navigator.serviceWorker.register("./sw.js")
              .then(registration => {
                  console.log("Service Worker registred", registration)
              })
              .catch(err => {
                  console.error("Failed to register Service Worker", err)
              })
      }

O primeiro passo é verificar se o navegador oferece suporte a Service Workers, se não oferecer nada acontece (feijoada), caso contrário o Service Worker será registrado. A etapa de registro é basicamente a parte onde o browser baixa e armazena o Service Worker epassa para a primeira etapa do ciclo de vida que é a instalação.
 
O arquivo do Service Worker, aqui chamado de "sw.js" é o arquivo onde estará toda a nossa lógica e estratégia para cada evento do Service Worker, este arquivo preferencialmente deve ser criado na raiz da pasta pública do seu projeto.
 
### Instalando um Service Worker


Agora no arquivo "sw.js" vamos criar um handler para o evento de instalação do nosso Service Worker, como dito anteriormente, este evento ocorre sempre após o registro (imediatamente ou quando a aba é atualizada) ou quando o código do Service Worker é atualizado.

      self.addEventListener('install', event => {
        console.log('[ServiceWorker] Installed');
      });

Uma estratégia muito utilizada nesta etapa do ciclo de vida é a chamada `pre-cache` onde geralmente se realiza o cache do `App Shell`. App Shell são todos os arquivos que compõe o esqueleto visual e de navegação básicos de sua App como menus, containers etc, com estes arquivos cacheados a experiência de carregamento visual inicial se torna praticamente instantânea. Veja este exemplo:

      var CACHE_NAME = 'v1';

      var CACHE_FILES = [
          './index.html',
          './js/main.js',
          './css/style.css'
      ]

      self.addEventListener('install', event => {
          console.log('[ServiceWorker] Installed');

          event.waitUntil(async function () {
              const cache = await caches.open(CACHE_NAME);
              console.log('[ServiceWorker] Caching App Shell');
              return cache.addAll(CACHE_FILES);
          }());
      });

Neste caso, nós estamos utilizando a API de cache para cachear todos os arquivos essenciais para a App Shell que são designados na constante CACHE_FILES. A função `event.waitUntil` é uma função que estende a vida de um evento, basicamente nós estamos falando para que o browser não mate o evento de instalação enquanto a promise que está dentro do `waitUntil` seja resolvida ou rejeitada, sem esta função o browser pode matar o evento a qualquer momento.
 
A partir de agora estes arquivos serão servidos do cache e não do servidor.
 
![exemplo ciclo de vida app shell](https://developers.google.com/web/updates/images/2015/11/appshell/appshell-1.jpg)

### Ativação

A próxima etapa do ciclo de vida é a `activate`, ou ativação. O evento de ativação ocorre apenas uma vez depois de uma instalação.
Veja este exemplo:

      self.addEventListener('activate', event => {
          console.log('[ServiceWorker] Activated');

          event.waitUntil(async function () {
              const cachesKeys = await caches.keys();
              const deletePromises = cachesKeys.map((cacheName) => {
                  if (cacheName !== CACHE_NAME) {
                      console.log('[ServiceWorker] Removing Cached Files from Cache - ', cacheName);
                      return caches.delete(cacheName);
                  }
              })

              return await Promise.all(deletePromises);
          }());
      });

Você pode utilizar várias estratégias nesta etapa, neste caso eu estou utilizando uma estratégia bastante comum que é limpar o cache de qualquer versão anterior do Service Worker caso o `CACHE_NAME` seja alterado, liberando espaço em disco do usuário. A função `waitUntil` exerce a mesma função, estender a vida do evento esperando a promise ser resolvida.

### Fetch e estratégias de cacheamento

Após o evento de ativação o Service Worker está 100% instalado e pronto para escutar outros eventos do ciclo de vida, como o `fetch`, `message`, `push`, `sync`. Por enquanto nós iremos focar no `fetch`. 

O `fetch` será executado para toda requisição no servidor que estiver dentro do escopo do Service Worker, ele é ideal para estratégias de interceptação e cacheamento de requisições.
 
As três estratégias mais comuns são a `offline-first`, `online-first\offline-fallback` e uma estratégia híbrida entre as duas.
 
### Offline First
A estratégia `offline-first` prioriza o cache offline, neste código primeiro nós interceptamos a requisição antes dela se quer chegar ao servidor. 

Veja um exemplo:

    //offline-first intercepta as requisições e serve as versões cacheadas
    self.addEventListener('fetch', event => {
        console.log('[ServiceWorker] Fetch', event.request.url);

        event.respondWith(async function () {
            try {
                //Verifica se a requisição já está no cache, caso esteja retorna a responsta cacheada
                const cachedResponse = await caches.match(event.request);
                if (cachedResponse) {
                    console.log("[ServiceWorker] Found in Cache", event.request.url, cachedResponse);
                    return cachedResponse;
                }

                //Se a requisição não estiver no cache, realiza a requisição
                const response = await fetch(event.request);

                //Cacheia a requisição
                const responseClone = response.clone();
                const cache = await caches.open(CACHE_NAME);
                cache.put(event.request, responseClone);
                console.log('[ServiceWorker] New Data Cached', event.request.url);
                return response;
            } catch (err) {
                console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
            }
        }());
    });

O `respondWith` é o interceptador da requisição, caso ele seja chamado dentro do evento de `fetch` ele obrigatoriamente deverá retornar uma promise que se resolve ou se rejeita com um objeto do tipo `Response`, caso o `respondWith` não seja chamado a requisição ocorrerá normalmente sem nenhuma interceptação. 

O primeiro passo é verificar se está requisição está em nosso cache, caso ela esteja nós retornamos o objeto `Response` cacheado. Isto faz com que as respostas das requisições se tornem praticamente instantâneas. Qualquer requisição HTTP pode ser cacheada, desde requisições que trazem imagens, arquivos estáticos, até mesmo respostas de API como JSONs, XMLs etc.

Caso a requisição não esteja no cache, nós realizamos a requisição normalmente no servidor e cacheamos uma versão clonada da resposta através do método `response.clone()`, este método é necessário pois um objeto response pode ser acessado apenas uma única vez por questões de segurança e para evitar que alguém modifique a resposta de uma requisição. Com esta requisição e resposta armazenadas no cache, a próxima vez que a sua aplicação realizar a mesma requisição ela não precisará solicitar a resposta do servidor e sim do cache.

### Online First / Offline Fallback

A estratégia `online-first` ou `offline-fallback` é utilizada quando você precisa da versão mais atualizada de suas requisições e/ou não pode depender do cache mas precisa de um fallback para que o usuário possa continuar navegando normalmente pela sua aplicação quando ele estiver sem conexão com a internet ou quando algum erro de rede ocorrer.
 
Veja um exemplo:

    //online-first intercepta das requisições e serve as versões cacheadas apenas em caso de erro
    self.addEventListener('fetch', event => {
        console.log('[ServiceWorker] Fetch', event.request.url);

        event.respondWith(async function () {
            try {
                //Realiza a requisição no servidor e sempre cacheia.
                //Caso falhe busca do cache, em caso de sucesso apenas retorna a requisicao do servidor
                //Status de erro como 400~500 não disparam exceção na Api de fech e devem ser 
                //tratados individualmente de acordo com as suas necessidades. 
                //Exceções são disparadas apenas quando o servidor não está acessivel (offline).
                const response = await fetch(event.request);
                
                const cachedResponse = await caches.match(event.request);
                if (!cachedResponse) {
                    const responseClone = response.clone();
                    const cache = await caches.open(CACHE_NAME);
                    cache.put(event.request, responseClone);
                    console.log('[ServiceWorker] New Data Cached', event.request.url);
                }

                return response;
            } catch (err) {
                const cachedResponse = await caches.match(event.request);
                
                if (cachedResponse) {
                    console.log("[ServiceWorker] Found in Cache", event.request.url, cachedResponse);
                    return cachedResponse;
                }
            }
        }());
    });

Aqui a requisição, apesar de interceptada, é realizada normalmente no servidor e cacheada caso ela ainda não esteja disponível no cache. A diferença é que se o usuário estiver offline nós verificamos se a requisição existe no cache e retornamos ela, fazendo com que a navegação básica continue mesmo que o usuário não tenha uma rede disponível ou o servidor falhe em entregar a requisição.
 
Neste trecho de código este tratamento é realizado dentro do bloco `catch` pois a API de `fetch` dispara uma exceção quando o usuário está offline ou quando o servidor não está disponível, porém, ela não dispara exceções em casos de erros http no range de 400~500. Você pode realizar um tratamento semelhante para estes tipos de erros caso ache necessário.

### Abordagem Híbrida - Offline First com Cache Update

Uma abordagem híbrida que reúne o melhor dos dois mundos é a Offline First com Cache Update, com está estratégia o cache ainda é priorizado, porem toda a vez que um recurso é solicitado no cache uma requisição para solicitar a sua versão mais atualizada no servidor é realizada em background ao mesmo tempo.
 
Está é uma estratégia muito eficaz pois faz com que o usuário tenha a experiência "instantânea" e "offline" do `app-cache` sempre acessando uma versão mais atualizada possível deste recurso, basicamente o usuário estará sempre apenas um passo atrás do servidor.
 
Veja um exemplo:

    //Função que atualiza o cache
    const cacheUpdate = (event) => {
        event.waitUntil(async function () {
            try {
                const response = await fetch(event.request);
                if (!response) {
                    console.log("[ServiceWorker] No response from fetch update")
                    return response;
                }

                const responseClone = response.clone();
                const cache = await caches.open(CACHE_NAME);
                cache.put(event.request, responseClone);
                console.log('[ServiceWorker] Cache Updated', event.request.url);
                return response;
            } catch (err) {
                console.log('[ServiceWorker] Error Fetching & Updateting Data', err);
            }
        }());
    }


    //Offline-first-update
    self.addEventListener('fetch', event => {
        console.log('[ServiceWorker] Fetch', event.request.url);

        event.respondWith(async function () {
            try {
                //Verifica se a requisição já está no cache, caso esteja retorna a resposta cacheada
                //porém ao mesmo tempo recupera uma nova versão do cache no servidor
                //na próxima vez que o cliente solicitar esta requisição
                //a versão servida será a mais atualizada
                //basicamente e teoricamente o cliente estará sempre um passo atrás do servidor
                const cachedResponse = await caches.match(event.request);
                if (cachedResponse) {
                    console.log("[ServiceWorker] Found in Cache", event.request.url, cachedResponse);
                    cacheUpdate(event);
                    return cachedResponse;
                } 

                const serverResponse = await fetch(event.request);
        
                //cacheia a requisição
                const responseClone = serverResponse.clone();
                const cache = await caches.open(CACHE_NAME);
                cache.put(event.request, responseClone);
                console.log('[ServiceWorker] New Data Cached', event.request.url);
                return serverResponse;
            } catch (err) {
                console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
            }
        }());
    });

A única diferença entre este trecho de código e a `offine-first` é basicamente a inclusão da função `cacheUpdate`, esta é uma função criada para atualizar o cache de forma assíncrona toda vez que um recurso for servido via cache. Neste caso nós apenas disparamos a promise e não esperamos ela ser resolvida para não atrapalhar o fluxo da requisição e servir o recurso cacheado o mais rápido o possível. Na próxima vez que o usuário solicitar o mesmo recurso ele terá a versão mais atualizada.

Caso vocês se interessem acessem o meu repositório no <a href="https://github.com/jhonnyrogerb/pwa-service-worker-examples#service-worker-examples" target="_blank">Github</a> com exemplos destas tres estratégias citadas neste post.

<div class="github-card" data-github="jhonnyrogerb/pwa-service-worker-examples" data-width="400" data-height="178" data-theme="default"></div>
<script src="//cdn.jsdelivr.net/github-cards/latest/widget.js"></script>

No próximo post, nós iremos abordar algumas outras estratégias possíveis como evento de `fetch` e os eventos de `background sync` e `push notifications`. Até a próxima!

<script src="https://cdn.jsdelivr.net/gh/ireade/caniuse-embed/caniuse-embed.min.js"></script>