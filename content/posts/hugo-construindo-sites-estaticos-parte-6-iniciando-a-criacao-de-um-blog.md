---
title: Hugo - Construindo Sites Estáticos Parte 6 - Iniciando a criação de um Blog
author: Jhonny Roger
image: /img/hugo-hero.png
type: post
date: 2017-10-17
excerpt: Nesta post nós vamos começar a criar um blog com Hugo iniciando pela homepage.
categories:
  - Hugo
  - Geradores estáticos
  - Tutorial
  - Go
  - HTML
tags:
  - geradores
  - estáticos
  - go
  - golang
  - html
  - static generators
  - hugo
---


CRIANDO UM NOVO BLOG
-----------------

Para criar um novo projeto Hugo basta utilizar o seguinte comando:

    hugo new site nome-do-site

Este comando irá gerar uma pasta com a estrutura básica de um projeto HUGO.

    nome-do-site
    ├── archetypes 
    ├── config.toml 
    ├── content
    ├── data 
    ├── layouts 
    ├── static 
    └── themes

Nós já falamos sobre todas as pastas que compõem um site em Hugo ao longo da série, faltou apenas o arquivo *config.toml* que nós falaremos agora.

CONFIG.TOML
-----------

O arquivo *config.toml* é o arquivo de configuração principal de um projeto HUGO, nele estarão guardadas todas as informações globais de seu site, assim como algumas das configurações que ditarão como as páginas serão renderizadas. 
 
 
O formato *.toml* não é o único aceito para este arquivo de configuração, ele também pode ser criado nos formatos *.yaml* e *.json*, mas por padrão o formato mais utilizado é o *toml*. 
 
 
Inicialmente, o arquivo config.toml gerado pelo HUGO terá o seguinte conteúdo: 

    baseURL = "http://example.org/"
    languageCode = "en-us"
    title = "My New Hugo Site

O atributo *baseURL* corresponde a URL base do site, no caso deste blog, foi configurado como *baseURL* o endereço do meu domínio pessoal *"jhonnyroger.com"*. O segundo atributo é o *languageCode* que determinará qual é o idioma padrão do seu site, no caso de um blog em português do Brasil o recomendado é utilizar o código da língua *"pt-BR"*. O último parâmetro é o título do site, nada de especial aqui, você pode colocar o que for de sua preferência como valor deste parâmetro. 

Existem vários outros parâmetros que podem ser utilizados neste arquivo de configuração, é possível até criar variáveis personalizadas conforme a sua necessidade. Por enquanto estes três parâmetros são o suficiente para nós prosseguirmos com a criação da *homepage*, conforme nós formos avançando no desenvolvimento novos recursos serão apresentados. 

CRIANDO UM TEMA
-----------------

Com as configurações básicas do arquivo *config.toml* já realizadas, chegou a hora de criar o nosso tema. Vamos utilizar novamente a CLI do HUGO com o seguinte comando:

    hugo new theme meu-tema

Este comando criará uma pasta com o nome do seu tema dentro do diretório *themes* do Hugo, nela estará a estrutura básica para a criação de um tema. 
  
No diretório *themes* podem existir vários temas diferentes, para que o HUGO saiba qual tema utilizar na hora de gerar o seu site, você deve especificar o nome dele no arquivo *config.toml.* através do atributo *theme*:

    #config.toml
    baseURL = "http://jhonnyroger.com/"
    languageCode = "pt-BR"
    title = "Site Exemplo | HUGO"
    theme = "meu-tema"

Feito isso, já podemos iniciar a criação do template da págarquivosina principal, mas antes nós vamos precisar de algum conteúdo para listar em nossa página, para isto eu deixarei este [link](/files/content.zip) com alguns arquivos *.md* de exemplo caso você precise.

O Template da *homepage* do nosso site é o arquivo *index.html* que fica no diretório *themes/&lt;nome-do-tema&gt;/layouts*, vamos começar com o seguinte código:

    <!DOCTYPE html>
    <html>
    <head>
      <title>{{ .Site.Title }}</title>
    </head>
    <body>
      <div class="content">
        <div class="post-list">
          {{ range (where .Pages "Type" "post")}}
          <div class="post-item">
            <h1 class="post-title">
              <a href="{{ .RelPermalink }}">{{ .Title }}</a>
            </h1>
            <p class="post-excerpt">
              {{ .Param "excerpt" }}
            </p>
            <p class="post-author">
              por: {{ .Param "author" }} - {{ .Date.Format "02/01/2006" }}
            </p>
          </div>
          {{end}}
        </div>
      </div>
    </body>
    </html>

O primeiro item a se destacar neste código é objeto *.Site*, ele é um *Map* que  irá guardar todos os valores globais definidos no arquivo *config.toml*, neste caso nós utilizamos ele para recuperar o valor que foi configurado como título do site. 
 
Depois temos a parte do código que é responsável por listar todos os posts utilizando a função *range*, esta função é a responsável por percorrer coleções de dados (semelhante a um loop for), aqui estamos iterando a coleção *.Pages* que é um *Map* onde o Hugo irá armazenar uma lista com todas as páginas do seu site. 

Junto com a função *range*, também foi utilizado a função *where* que serve para filtrar itens de uma coleção, removendo valores indesejados de acordo com os parâmetros recebidos. No nosso caso apenas as páginas cujo o tipo seja "posts", ou seja, páginas que estejam na pasta *content/posts* ou que tenham o parâmetro "type" com valor *post* na seção de metadados serão exibidas. 
  
Dentro do contexto de *range* nós podemos acessar todos os valores referentes ao post atual de cada loop, como título, descrição, nome do autor, o link para o post, data de postagem e qualquer outro valor que esteja nos metadados de cada post.

GERANDO O SITE
--------------

Para gerar o site, basta utilizar o comando *hugo* dentro da pasta raiz do projeto, este comando irá gerar as páginas do seu site na pasta *public*.

Mas existe ainda o comando *hugo server*, que é ótimo para o desenvolvimento. Este comando irá construir o seu site e subir um servidor local, o mais interessante é que toda vez que ocorrer alguma mudança o Hugo automaticamente irá renderizar seu site novamente.

O resultado do nosso código até aqui ficaria o seguinte:

      hugo server

  ![preview hugo site](/img/Peek 2017-11-18 15-24.gif)

ADICIONANDO UM POUCO DE ESTILO
-----------------------------

Neste serie eu não darei muito foco para *CSS*, todos os nossos exemplos serão bastante simples e servirão apenas como base para que você use a sua criatividade para criar seu próprio tema. 

Os arquivos *.css* assim como qualquer outro tipo de arquivo estático como *js* e imagens ficarão na pasta *themes/&lt;nome-do-tema&gt;/static/*, vamos criar o arquivo *themes/&lt;nome-do-tema&gt;/static/css/style.css* com o seguinte conteúdo.

    .content{
      font-family: sans-serif;
    }

    .post-list{
      display: flex;
      flex-wrap: wrap;
    }


    .post-item{
      margin: 20px;
      flex: 1 0 350px;
    }

    .post-title a{
      text-decoration: none;
      color: #555;
    }

    .post-title a:hover{
      color: yellow;
    }

Para importar este arquivo em nosso template basta adicionar a seguinte linha na tag &lt;head&gt;:

    <link rel="stylesheet" type="text/css" href="/css/style.css">

  ![preview hugo site](/img/Peek 2017-11-18 16-56.gif) 

ADICIONANDO POST EM DESTAQUE
---------------------------

Agora vamos criar uma sessão de post em destaque na nossa página principal, tenha em mente que isto também é algo que vai depender da sua criatividade e necessidade. Existem várias formas de se chegar ao resultado final, a que nós utilizaremos agora irá introduzir duas novas funções muito importantes a *first* e a *after*.

Veja este exemplo:

    <!DOCTYPE html>
    <html>
    <head>
      <title>{{ .Site.Title }}</title>
      <link rel="stylesheet" type="text/css" href="/css/style.css">
    </head>
    <body>
        <div class="content">
            <div class="main-post">
                {{ range first 1 (where .Pages "Type" "post")}}
                    <h1 class="main-post-title">
                        <a href="{{ .RelPermalink }}">{{ .Title }}</a>
                    </h1>
                    <p class="post-excerpt">
                        {{ .Param "excerpt" }}
                    </p>
                    <p class="post-author">
                        por: {{ .Param "author" }} - {{ .Date.Format "02/01/2006" }}
                    </p>
                {{end}}
            </div>
            <div class="post-list">
                {{ range after 1 (where .Pages "Type" "post")}}
                    <div class="post-item">
                        <h1 class="post-title">
                            <a href="{{ .RelPermalink }}">{{ .Title }}</a>
                        </h1>
                        <p class="post-excerpt">
                            {{ .Param "excerpt" }}
                        </p>
                        <p class="post-author">
                            por: {{ .Param "author" }} - {{ .Date.Format "02/01/2006" }}
                        </p>
                    </div>
                {{end}}
            </div>
        </div>
    </body>
    </html>

 
A função *first* retorna os primeiros valores de uma coleção de acordo com o número passado como primeiro argumento, por exemplo *first 5 colecaoX* retornará apenas os cinco primeiros valores desta coleção.  
 
 
Neste exemplo, como apenas o último post criado será destacado, foi utilizado *first 1*, lembrando que o Hugo organiza os posts em ordem decrescente baseado no parâmetro "date", ou seja, os posts serão organizados dos mais novos para os mais antigos. 
 
 
Já a função *after* é utilizada para pular itens de uma coleção, exemplo, *after 5 colecaoX* irá exibir apenas os itens de uma coleção que vierem depois dos primeiro cinco itens. Como nós já exibimos o ultimo post em destaque, não há a necessidade de exibi-lo novamente na lista de posts, por isto foi utilizado o *after 1*. 
 
 
Com uma pequena atualização no *css* a nossa página principal agora estará assim: 

      .content{
        font-family: sans-serif;
      }

      .post-list{
        display: flex;
        flex-wrap: wrap;
      }


      .post-item{
        margin: 20px;
        flex: 1 0 350px;
      }

      .post-title{
        font-size: 28px;
      }

      .post-title a{
        text-decoration: none;
        color: #555;
      }

      .post-title a:hover{
        color: yellow;
      }

      .main-post{
        text-align: center;
        margin: 50px;
      }

      .main-post-title{
        font-size: 76px
      }

      .main-post-title a{
        text-decoration: none;
        color: #555;
      }

      .main-post-title a:hover{
        color: yellow;
      }


  ![preview hugo site](/img/Peek 2017-11-18 18-34.gif)

No nosso próximo post, nós estaremos criando os templates para exibir o conteúdo de cada post e separando algumas partes reutilizáveis de nossos templates em partials. Até a próxima! 