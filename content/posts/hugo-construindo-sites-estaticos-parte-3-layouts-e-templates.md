---
title: Hugo - Construindo Sites Estáticos Parte 3 - Layouts e Templates
author: Jhonny Roger
image: /img/gradiente-green.png
type: post
date: 2017-08-12
excerpt: Confinuando a nossa série sobre Hugo, hoje falaremos sobre um das partes mais importantes do projeto, o diretório layouts e algumas regras sobre templates.
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

A pasta *layouts* é uma das mais importantes de um projeto HUGO, nela ficarão todos os templates de seu site. Estes templates são basicamente arquivos no formato *.html* que determinarão como um conjunto de páginas serão renderizadas, ou seja, como as informações ficarão dispostas quando o arquivo *.html* final de cada uma destas páginas forem gerados. 

Este diretório está diretamente ligado ao diretório *content* que nós vimos no post anterior. Quando você rodar o comando para realizar o build do seu site, o HUGO tentará encontrar um template que melhor corresponde a cada um dos seus arquivos *.md*.  

ORDEM DE BUSCA
--------------

Para realizar este “match” entre template e conteúdo, o HUGO utiliza uma regra de prioridade, para exemplificar melhor, suponha que temos o seguinte arquivo *.md*: 
 
    content/posts/post-1.md

    ---
    title: Primeiro Post
    date: 2017-08-11
    description: Um post de exemplo.
    ---
      

O HUGO percorrerá as subpastas e arquivos da pasta *layouts* até encontrar o template correto nesta ordem:

    1. /layouts/TIPO-NAO-DECLARADO/TEMPLATE-NAO-DECLARADO.html  //<-- TEMPLATE INCORRETO
    2. /layouts/posts/TEMPLATE-NAO-DECLARADO.html  //<-- TEMPLATE INCORRETO 
    3. /layouts/TIPO-NAO-DECLARADO/single.html  //<-- TEMPLATE INCORRETO
    4. /layouts/posts/single.html  //<-- TEMPLATE CORRETO - BREAK
    5. /layouts/_default/single.html

Primeiramente ele tentará encontrar o template baseado no que foi especificado na seção de metadados do seu arquivo *.md*, seja por tipo ou nome do template. Como aqui nada foi declarado, o HUGO tentará encontrar o seu template baseado no caminho do seu arquivo de conteúdo.

Sendo assim se o caminho do seu arquivo *.md* é *content/posts/nome_do_arquivo.md* o HUGO assumirá que o template estará na pasta *layouts/posts/single.html*, e, uma vez que o template correspondente for encontrado, a página .html final será automaticamente criada tendo ele como base. 

Caso o tempĺate não seja encontrado, o template do subdretório *_default*, será o último na linha de prioridades e, portanto, ele será utilizado para renderizar a página final. Se nenhum template for encontrado seguindo as regras de prioridades (nem mesmo o *layouts/_default/single.html*), a página *.html* final simplismente não será gerada. 

Vamos para mais um exemplo, agora com o seguinte arquivo: 

    content/posts/post-2.md

    ---
    title: Segundo Post
    date: 2017-08-11
    description: Segundo post de exemplo.
    type: artigo
    layout: artigotecnologia
    ---

Como agora o tipo e o nome do template foram declarados, a ordem de busca ficaria da seguinte forma:

      1. /layouts/artigo/artigotecnologia.html //<-- TEMPLATE CORRETO - BREAK
      2. /layouts/posts/artigotecnologia.html 
      3. /layouts/artigo/single.html
      4. /layouts/posts/single.html
      5. /layouts/_default/single.html

Com essa regra você pode criar vários templates diferentes para cada seção do seu site, apesar da maioria dos projetos, devido a simplicidade, precisarem apenas do template */layouts/_default/single.html*. 

TEMPLATE DE HOMEPAGE
--------------------

Mas e quanto a homepage? Bem existe um template especifico para a página inicial, este template fica na raiz do diretório layouts é o index.html, nesse arquivo você colocará toda a lógica para gerar a página de apresentação de seu site. Existe ainda o arquivo */layouts/_default/lists.html* que será o segundo na ordem de prioridade caso não exista o arquivo *index.html*.

Basicamente a order de prioridades é a seguinte:

      1. /layouts/index.html
      2. /layouts/_default/list.html

TEMPLATES BASEADOS EM TAXONOMIA
--------------------------------

Existe ainda uma variedade de tipos de layouts específicos, um dos mais interessantes são os layouts por taxonomia. Estes layouts organizam listas de conteúdo baseadas em categoria, autor, tags etc.  

Para criar um template baseado em taxonomia basta gerar um arquivo *.html* no diretório *layouts/taxonomy* como o nome da taxonomia desejada, exemplos: *layouts/taxonomy/category.html*, *layouts/taxonomy/tags.html*.  

O Hugo será capaz de reconhecer o tipo de taxonomia pelo nome do arquivo e organizar listas de posts baseados nela. Quando o site for renderizado, as urls de cada taxonomia ficará no seguinte padrão *nome-taxonomia/termo-taxonomia*, exemplos: */categories/javascript* (listará todos os posts cuja a categoria seja Javascript), *author/jhonny-roger/* (listará todos os posts cujo autor seja “Jhonny Roger”) e assim por diante. 

Caso você queira se aprofundar mais neste assunto, a documentação do HUGO tem uma sessão bastante completa sobre [layouts e templates](https://gohugo.io/templates/.), com exemplos do mais básico ao mais avançado. Até o próximo post!. 