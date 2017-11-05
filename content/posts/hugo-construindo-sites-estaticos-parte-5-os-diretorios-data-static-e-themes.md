---
title: Hugo - Construindo Sites Estáticos Parte 5 - Data, Static e Themes
author: Jhonny Roger
image: /img/HUGO.jpg
type: post
date: 2017-08-15
excerpt: Para finalizarmos a nossa saga sobre a introdução ao Hugo, vamos falar sobre os três ultimos diretórios principais que faltavam, Data, Static e Themes
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


O DIRETÓRIO DATA
-----------------

O diretório Data, é um diretório onde se pode armazenar dados adicionais, como listas de endereços, listas de imagens, lista de eventos ou qualquer outro tipo de coleção dados que você queira que o HUGO utilize como suplemento para a construção das páginas de seu site. 
  
Estes dados são opcionais, ou seja, não são cruciais para a criação de uma página web, mas, eles podem ser de grande auxilio caso seja necessário consumir uma grande quantidade de dados nos templates. 
  
Os arquivos de dados podem ser armazenados em três formatos YALM, TOML e JSON. No exemplo abaixo, temos uma coleção de imagens que foi salva no formato JSON *data/cats.json* 

      {
        "images": [
            "https://media.gettyimages.com/photos/portrait-of-bald-man-carrying-persian-kitten-on-shoulder-studio-shot-picture-idsb10069853i-002?b=1&k=6&m=sb10069853i-002&s=170x170&h=nBX9euVufDBzBtixQ0yiMJDp5Sh9lnMLUOgD6XzCyio=",
            "https://media.gettyimages.com/photos/miaow-picture-idJD6520-001?b=1&k=6&m=JD6520-001&s=170x170&h=eQGvVJB_SshJtSiXsCbc8FFCzCtnUv8L7XiXyHAb16E=",
            "https://media.gettyimages.com/photos/kitten-sitting-on-edge-of-chair-picture-id57520351?b=1&k=6&m=57520351&s=170x170&h=z8QBmm4AFJOKhgjZ7cV_9zmKle-UR4I21kptPGzNxe0=",
            "https://media.gettyimages.com/photos/perky-puss-picture-idHP0185-001?b=1&k=6&m=HP0185-001&s=170x170&h=S99B59xzuma9k6XCUa4wdwGqduGCzYUSHuITbxCqLgg=",
            "https://media.gettyimages.com/photos/bald-man-carrying-persian-kitten-on-shoulder-studio-shot-picture-idsb10069853i-001?b=1&k=6&m=sb10069853i-001&s=170x170&h=GrNcdH6BoXjOC1y24ArtUhtPpBytV-QNm1QCSD_eKlk=",
            "https://media.gettyimages.com/photos/kittens-in-baskets-picture-id87589761?b=1&k=6&m=87589761&s=170x170&h=HkOZPDDUaEh6u0hM9UqzrRtPgrRPgDEoNG1ago9Hjqw=",
            "https://media.gettyimages.com/photos/four-kitten-in-wicker-basket-picture-id57520348?b=1&k=6&m=57520348&s=170x170&h=mxzkJC1cwSipmiEZq5ObWHo4nIBBTC0SiAScKx0Fgmc=",
            "https://media.gettyimages.com/photos/four-kitten-on-floor-in-studio-picture-id57520360?b=1&k=6&m=57520360&s=170x170&h=JQC3c-6rV9Fv2CFS1rT6jf9SSD4adpagaI2YWyP9mDo=",
            "https://media.gettyimages.com/photos/going-for-gold-picture-idHU1349-001?b=1&k=6&m=HU1349-001&s=170x170&h=XD8Rqqo_3ju92DIQ87CdMGAL8KKrXtIxsM_LYISoeDk="
        ]
    }

Estes dados ficarão disponíveis para serem consumidos nos seus templates através de um Map na variável *$.Site.Data*, esta coleção poderá ser consumida da seguinte forma:

    {{ range $.Site.Data.cats.images }}
        <img src="{{ . }}"/>
    {{ end }}


O DIRETÓRIO STATIC
------------------

O diretório *Static*, como o próprio nome diz, é onde será armazenado todos os arquivos estáticos do site como arquivos javascript, css, imagens, etc. Os arquivos serão mapeados nos templates através de urls de acordo com o nome das pastas onde eles estão armazenas, exemplo se um arquivo for armazenado na pasta *static/javascript/main.js* ele poderá ser acessado da seguinte forma: 
  
    <script src="/javascript/main.js"></script>


O DIRETÓRIO THEMES
-------------------

O HUGO tem um sistema de criação, instalação e personalização de temas muito poderoso, você pode encontrar os inúmeros temas criados pela comunidade [aqui](https://themes.gohugo.io/).

Cada tema representará um subdiretório dentro da pasta *themes*, sendo que cada pasta de tema terá seus próprios layouts, arquivos estáticos e archetypes. Para criar um novo tema pela CLI do HUGO você pode utilizar o seguinte comando: 

    hugo new theme [nome-do-tema]
    hugo new theme tema-blog

Com este comando será criada uma subpasta correspondente ao nome do tema no diretório *themes*, *themes/theme-blog*. A estrutura básica ficara assim:

    tema-blog
    ├── archetypes 
    ├── theme.toml 
    ├── layouts 
    └── static

Estas pastas desempenharão as mesmas funções que nós já vimos anteriormente, a pasta *archetypes* guardará esquemas de metadados reutilizáveis, a pasta *layouts* será responsável pelos seus templates e a pasta *static* será responsável pelos arquivos estáticos. A única diferença neste caso, é que todas estas funções serão exclusivas deste tema. 
  
Algo importante ao se considerar é a ordem de prioridades de busca do HUGO, os diretórios de um tema sempre serão os últimos na ordem de prioridade, para exemplificar, vamos pegar um exemplo do terceiro post da nossa série: 

    1.  /layouts/artigo/artigotecnologia.html
    2.  /layouts/posts/artigotecnologia.html 
    3.  /layouts/artigo/single.html
    4.  /layouts/posts/single.html
    5.  /layouts/_default/single.html
    6.  /themes/<THEME>/layouts/artigo/artigotecnologia.html
    7.  /themes/<THEME>/layouts/posts/artigotecnologia.html
    8.  /themes/<THEME>/layouts/artigo/single.html
    9.  /themes/<THEME>/layouts/posts/single.html
    10. /themes/<THEME>/layouts/_default/single.html

Como você pode notar, a lista de prioridades aumentou um pouco se comparado ao post anterior. Caso exista um template correspondente ao arquivo *.md* na pasta *layouts* raiz do HUGO, este template terá uma prioridade maior do que qualquer outro template que estiver dentro da pasta *layouts* do seu tema. 
  
Eu estarei abordando melhor o assunto de criação de tema na próxima parte da nossa série de posts, agora o foco será a criação de um tema do início até a publicação de um blog. Até a próxima!. 