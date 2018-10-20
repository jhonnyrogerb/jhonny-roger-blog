---
title: "Criando um Site Estático com Hugo Parte 3: Exibindo Posts"
author: Jhonny Roger
image: /img/gradiente-green-red.png
type: post
date: 2017-11-26
excerpt: Neste post nós começaremos a criar os single templates para exibir um post com o gerador de sites estáticos Hugo.
categories:
  - Hugo
  - Geradores estáticos
  - Go
tags:
  - geradores
  - estáticos
  - site
  - sites estáticos
  - blog
  - gohugo
  - go
  - golang
  - html
  - static generators
  - hugo
---

Posts anteriores:

- [O Que São Geradores de Sites Estáticos?](/o-que-sao-geradores-de-sites-estaticos/)
- [Criando um site estático com Hugo Parte 1: Instalação](/criando-um-site-estatico-com-hugo-parte-1-instalacao/)
- [Introdução ao Hugo - Diretórios Content e Archetypes](/introducao-ao-hugo-diretorios-content-e-archetypes/)
- [Introdução ao Hugo - Diretórios Layouts e Templates](/introducao-ao-hugo-diretorios-layouts-e-templates/)
- [Introdução ao Hugo - Criação de Templates](/introducao-ao-hugo-criacao-de-templates/)
- [Introdução ao Hugo - Diretórios Data, Static e Themes](/introducao-ao-hugo-diretorios-data-static-e-themes/)
- [Criando um site estático com Hugo Parte 2: Construindo a Homepage](/criando-um-site-estatico-com-hugo-parte-2-construindo-a-homepage/)

No último post da série, nós criamos o template da nossa homepage, algo que eu esqueci de mencionar foi sobre os dois tipos de templates que existem em Hugo, *list* e *single*.

O conceito de cada um é bem simples, os templates do tipo *list* são correspondentes a páginas onde serão listados links de outros posts/páginas, como por exemplo a nossa homepage. Já o tipo *single* corresponde a um template que representa o conteúdo de uma página em específico, como uma página com o conteúdo de um post por exemplo.

Apenas para recordar, este é o preview de como está o nosso blog até o momento:


  ![preview hugo site](/img/Peek 2017-11-18 18-34.gif)


CRIANDO A PÁGINA DO POST
-----------------------

Para criar um template para uma *single page* é necessário criar uma subpasta no diretório layouts, correspondente à pasta do tipo de conteúdo que será renderizado. No nosso exemplo nós temos apenas o tipo *post* na pasta *content* *(content/posts)*, para criar o template para estes arquivos nós iremos criar uma pasta chamada *post* com o arquivo de template *single.html* (*layouts/post/single.html*).

Veja este exemplo de código:

    <!-- layouts/post/single.html -->
    <!DOCTYPE html>
    <html>
    <head>
      <title>{{ .Title }}</title>
      <link rel="stylesheet" type="text/css" href="/css/style.css">
    </head>
    <body>
        <div class="content">
            <div class="main-post">
                <h1 class="main-post-title">
                    <a href="{{ .RelPermalink }}">{{ .Title }}</a>
                </h1>
                <p class="post-excerpt">
                    {{ .Param "excerpt" }}
                </p>
                <p class="post-author">
                    por: {{ .Param "author" }} - {{ .Date.Format "02/01/2006" }}
                </p>
            </div>

            <main class="post-wrapper">
                <article class="post-content">
                    {{.Content}}
                </article>
            </main>
        </div>
    </body>
    </html


Neste trecho nós temos vários elementos que são semelhantes à nossa página principal. O elemento *div.main-post*, é bastante parecido com o que nós já vimos no template da *homepage*, com exceção de que aqui nós não precisamos do *range* pois estamos exibindo apenas o conteúdo de um único post. 
 
A grande diferença está na forma de se acessar o conteúdo em texto de um arquivo *.md*, isto é feito através do atributo *.Content*, este atributo indica o lugar onde a *template engine* do Hugo irá renderizar o conteúdo do arquivo ".md" já transformado em HTML. 

Este trecho de código ficaria assim: 

  ![preview hugo site](/img/Peek 2017-11-26 11-26-2.gif)

O conteúdo do nosso post não tem nenhuma formatação CSS ainda, o HTML do conteúdo do post gerado pelo Hugo não tem nenhuma organização baseada em classes, componentes, etc. Sendo assim, todos os nossos estilos serão adicionados diretamente nas tags HTML.   

Apenas reforçando que CSS/estilo não são o foco desta série, esta parte vai depender de sua criatividade e necessidade. 

    .post-content {
      color: #3c3c3c;
      overflow: hidden;
      width: 90%;
      margin: 40px auto;
    }

    .post-content img {
      width: 100%;
    }

    .post-content h1 {
      font-size: 2em;
    }

    .post-content h2 {
      font-size: 1.7em;
    }

    .post-content h3 {
      font-size: 1.3em;
    }

    .post-content img, .post-content video {
      max-width: 100%;
      box-shadow: 0px 0px 3px 0px rgba(51, 41, 37, 0.7);
      border-radius: 5px;
    }

    .post-content em {
      font-weight: 300;
      background: #f5f5f5;
      color: #777;
    }

    .post-content p {
      font-size: 1.3em;
      margin-bottom: 1.8em;
      font-weight: normal;
    }

    .post-content a {
      font-weight: 900;
      text-decoration: underline;
    }

    .post-content li {
      margin-bottom: 10px;
      font-size: 1.2em;
    }

    .post-content ul, .post-content ol {
      margin: 40px 20px;
      padding-left: 40px;
      font-weight: lighter;
    }

    .post-content h1 {
      margin: 3.5em 0 1.67em;
      font-weight: 900;
    }

    .post-content h2 {
      margin: 3.5em 0 1.83em;
      font-weight: 900;
    }

    .post-content h3 {
      margin: 3.5em 0 1.5em;
      font-weight: 900;
    }

    .post-content h6 {
      margin: 30px 0 20px;
      font-size: 1.1em;
    }

    .post-content blockquote {
      padding: 30px;
      display: block;
    }


UTILIZANDO O HIGHLIGHT.JS
-------------------

No GIF de preview acima, os trechos de código estão sem nenhum tipo de estilo e coloração de sintaxe. Para resolver isso, existe uma ótima biblioteca chamada *highlight.js* que faz o papel de *sitaxe highlighter*, deixando estes códigos de exemplo com a aparência semelhante à de editores como Sublime, VSCcode, entre outros. 
 
É muito simples utilizar o *highlight.js*, basta importar o *javascript* e o *css* da biblioteca e chamar a função de inicialização. 

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css" />    
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
    <script>
        hljs.initHighlighting()
    </script>

A partir daí o próprio *highlight.js* irá buscar por todos os trechos de código fonte no HTML *(geralmente as tags pre e code)*, e tentará identificar o tipo de linguagem para aplicar a coloração mais adequada automaticamente. 
  
Caso você precise utilizar esta funcionalidade em seu projeto, dê uma olhada na [Documentação](https://highlightjs.org) dessa lib, ela é bastante completa e sua API tem diversos métodos, parâmetros de configuração, temas, etc. 

ADICIONANDO A SEÇÃO DE COMENTÁRIOS
--------------------------------

Devido à natureza estática do Hugo, não é possível criar uma seção de comentários dinâmica nativa utilizando banco de dados ou outros recursos de persistência no servidor. 

O melhor caminho neste caso é recorrer a serviços de terceiros, dentre os mais utilizados estão o serviço de comentários do Facebook e o Disqus. Eu particularmente prefiro utilizar o Disqus como plataforma de comentários por ele ser mais simples, flexível e amigável que o Facebook. 

Para utilizar o Disqus, basta criar uma conta e preencher o formulário de criação de site clicando neste [link](https://disqus.com/admin/create/) seguindo todos os passos. No final do cadastro será disponibilizado um código para adicionar no seu site, basta copiar o código do e colar no arquivo de template, o embed oferecido pelo Disqus será mais ou menos assim: 

    <div id="disqus_thread"></div>
    <script>

    /**
    *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
    *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/

    var disqus_config = function () {
    this.page.url = {{ .Permalink }};  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = {{ .Permalink }}; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };

    (function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://jr.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    })();
    </script>
    <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
                                

Os únicos parâmetros que deverão ser modificados são *this.page.url* e *this.page.identifier*, que serão utilizados para que o Disqus organize corretamente os comentários de seu site, neste caso eu estou usando o link do post tanto como url como id único. 
  
Para finalizar, segue o código do nosso template:

    <!DOCTYPE html>
    <html>
    <head>
      <title>{{ .Title }}</title>
      <link rel="stylesheet" type="text/css" href="/css/style.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css" />
    </head>
    <body>
        <div class="content">
            <div class="main-post">
                <h1 class="main-post-title">
                    <a href="{{ .RelPermalink }}">{{ .Title }}</a>
                </h1>
                <p class="post-excerpt">
                    {{ .Param "excerpt" }}
                </p>
                <p class="post-author">
                    por: {{ .Param "author" }} - {{ .Date.Format "02/01/2006" }}
                </p>
            </div>

            <main class="post-wrapper">
                <article class="post-content">
                    {{.Content}}
                    <div id="disqus_thread"></div>
                </article>
            </main>
        </div>
    
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
        <script>
            hljs.initHighlighting()
        
            /**
            *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
            *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/

            var disqus_config = function () {
            this.page.url = {{ .Permalink }};  // Replace PAGE_URL with your page's canonical URL variable
            this.page.identifier = {{ .Permalink }}; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
            };

            (function() { // DON'T EDIT BELOW THIS LINE
            var d = document, s = d.createElement('script');
            s.src = 'https://jr.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
            })();
        </script>
        <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
    </body>
    </html>


  ![preview hugo site](/img/Peek 2017-11-26 19-56-3.gif)

Muito simples Não? No nosso proximo post nós falaremo sobre alguns outros tipos de *list templates* e sobre como reutilizar templates com *partials*, até a próxima!


