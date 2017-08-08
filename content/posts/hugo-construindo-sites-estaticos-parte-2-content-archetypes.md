---
title: Hugo - Construindo Sites Estáticos Parte 2 - Content e Archetype
author: Jhonny Roger
image: /img/hugologo.png
type: post
date: 2017-08-07
excerpt: Nesta segunda parte da série de tutorias sobre o gerador de sites estáticos Hugo, falaremos sobre a estrutura básica do projeto, começando pelos diretórios content e archetype
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
---

A estrutura de diretórios do Hugo é bastante simples, no total são 6 pastas principais e um arquivo de configuração. Para gerar o esqueleto de um novo projeto via CLI basta digitar o comando:

    Hugo new site nome_do_site 

Este comando gerará seguinte estrutura:
  
    
    nome_do_site
    ├── archetypes 
    ├── config.toml 
    ├── content
    ├── data 
    ├── layouts 
    ├── static 
    └── themes

Eu farei um post explicando a fundo cada um destes diretórios, os primeiros da lista serão o content e archetype.

O DIRETÓRIO CONTENT
-------------------

O diretório *content* é onde será armazenado todo o conteúdo do seu site, ou seja, é nele que ficarão salvos os arquivos *.md*. 

Cada subpasta que é filha direta de *content* será considerada pelo Hugo como uma seção do site, por exemplo, se o seu site tiver três seções principais:  artigos, posts e eventos, cada uma delas deverá ter um subdiretório correspondente: *content/artigos*, *content/posts* e *content/eventos*. 

Não confunda seções com categorias! Para o Hugo seções são uma forma de organizar o conteúdo do seu site por tipos de páginas, principalmente quando o assunto é o layout e tipo de informação.

As urls de suas páginas também dependem diretamente da sua estrutura de seções, veja este exemplo;
  
    .
    └── content
    ├── artigos
    |   ├── _index.md    // <- example.com/artigos/
    |   ├── artigo-1.md  // <- example.com/artigos/artigo-1/
    |   └── artigo-2.md  // <- example.com/artigos/artigo-2/
    └── eventos
    |   ├── _index.md    // <- example.com/eventos/
    |   ├── evento-1.md  // <- example.com/eventos/evento-1/
    |   └── evento-2.md  // <- example.com/eventos/evento-2/
    └── posts
    |   ├── _index.md    // <- example.com/posts/
    |   ├── post-1.md    // <- example.com/posts/post-1/
    |   ├── post-2.md    // <- example.com/posts/post-2/


Aqui temos as três seções, artigos, eventos e posts, as url geradas seguirão o padrão url-base/nome-da-sessao/nome-do-arquivo. Claro que isto é o defaul do Hugo, mas como ele é uma ferramenta extremamente customizável, existe a possibilidade você alterar o padrão das urls.

### METADADOS

Uma parte muito importante dos arquivos markdown que irão guardar o conteúdo do seu site são os metadados, ou como descrito na documentação do Hugo *front matter.*

Os metadados devem ser declarados no início de cada arquivo *.md* e são responsáveis por armazenar informações sobre cada peça de conteúdo do seu site como título, data de postagem, categorias, tags, nome do autor, etc.

Você ainda pode passar qualquer outro parâmetro customizado de sua preferência como metadado, que o Hugo será capaz de indexar estes parâmetros da mesma forma com que ele indexa os parâmetros pré-definidos.

O formato padrão de um metadado é o TOML, mas você também pode usar JSON ou YAML. Um bloco de dados TOML é identificado por *'+++'*, já o YAML é identificado por *'---'*, para JSON basta seguir o padrão abre e fecha chaves *{ }*. Veja alguns exemplos de metadados em cada um dos três formatos.

TOML

    +++
    title = "Hugo - Construindo Sites Estáticos Parte 1 - Instalação"
    excerpt = "Primeira parte da série de tutorias sobre o gerador de sites estáticos Hugo, abordando o processo de instação da ferramenta"
    tags = [ "hugo", "geradores", "golang", "html" ]
    date = "2017-08-04"
    categories = [
      "Hugo",
      "Geradores estáticos"
      "Go",
      "Tutorial"
    ]
    +++

YAML

    ---
    title: "Hugo - Construindo Sites Estáticos Parte 1 - Instalação"
    excerpt: "Primeira parte da série de tutorias sobre o gerador de sites estáticos Hugo, abordando o processo de instação da ferramenta"
    tags: [ "hugo", "geradores", "golang", "html" ]
    date: "2017-08-04"
    categories:
      - Hugo
      - Geradores estáticos
      - Go
      - Tutorial
    ---

JSON

    {
      "title": "Hugo - Construindo Sites Estáticos Parte 1 - Instalação",
      "description": "Primeira parte da série de tutorias sobre o gerador de sites estáticos Hugo, abordando o processo de instação da ferramenta",
      "tags": [ "hugo", "geradores", "golang", "html" ],
      "date": "2017-08-04",
      "categories": [
        "Hugo",
        "Geradores estáticos"
        "Go",
        "Tutorial"
      ]
    }

É extremamente importante que você mantenha um padrão nos metadados do seu conteúdo, pois, uma estrutura de metadados completamente despadronizada pode quebrar completamente a lógica do seu layout e te trazer muita dor de cabeça.

O DIRETÓRIO ARCHETYPES
----------------------

A pasta archetypes é o lugar aonde ficará guardado todos os arquivos com modelos de metadados pré-definidos por você.

O uso deste diretório não é obrigatório, mas ele pode ser bastante útil caso você utilize os comandos da CLI do Hugo e tenha vários modelos de metadados com regras e parâmetros diferentes para cada seção do seu site. Veja este exemplo de um arquivo archetypes com o modelo padrão de metadados da seção posts.

    ---
    author: 
    type: post
    image: 
    excerpt: 
    categories:
      - Artigos
    ---

O comando *new*, cria um arquivo .*md* com uma estrutura de metadados padrão do Hugo, mas, caso exista um arquivo archetype o Hugo criará o arquivo .*md* já com a estrutura definida de acordo com o modelo do archetype especificado por você. Isto facilita muito na hora de publicar novos conteúdos, pois, mantém o padrão de cada seção e não quebra a estrutura do site.

    Hugo new posts/novo-post.md 

Existe uma ordem na qual o Hugo procurará pelos archetypes quando você criar um arquivo via CLI, está ordem será definida pela seção onde o conteúdo está sendo criado. Se o Hugo não encontrar um arquivo no diretório archetypes com o mesmo nome da seção do conteúdo ele utilizará o archetype definido no arquivo *default.md*, caso ele não encontre o arquivo *defaul.md* ele utilizará um modelo de metadados padrão interno.

 1. archetypes/posts.md
 2. archetypes/default.md
 3. Themes/<THEME>/archetypes/posts.md
 4. Themes/<THEME>/archetypes/default.md

Se você não for utilizar o CLI do Hugo para criar os arquivos .md então não precisa se preocupar muito com este diretório, mas não se esqueça, mantenha um padrão nos metadados se seu site. 

Caso você queira ver alguns exemplos em produção destes diretórios, você pode ir no meu [repositório](https://github.com/jhonnyrogerb/jhonny-roger-blog) do Github, lá você encontrará o código fonte completo deste blog que também é feito em Hugo. 
