---
title: O que são geradores de sites estáticos?
author: Jhonny Roger
image: /img/hugologo.png
type: post
date: 2017-08-03
excerpt: Os geradores de sites estáticos são focados na simplicidade e podem ser uma ótima alternativa aos CMS tradicionais
categories:
  - Geradores estáticos
  - Hugo
  - Go
  - HTML
tags:
  - ssl
  - go
  - golang
  - html
  - static generators
---

AFINAL, O QUE SÃO GERADORES DE SITES ESTÁTICOS?
-----------------------------------------------

Geradores de sites estáticos, são ferramentas que possibilitam gerar HTML puro a partir de templates predefinidos sem nenhuma dependência no servidor, ou seja, sem precisar de banco de dados, servidores, frameworks web ou qualquer coisa do tipo (alguns até usam algum banco de dados como fonte de conteúdo, porem o resultado final sempre serão arquivos estáticos). 

A grande maioria destas ferramentas são alimentadas com arquivos de texto no formato .md, o famoso markdown, onde o conteúdo destes arquivos é injetado em um motor de template e convertido em arquivos HTML prontos para serem servidos para o usuário. Eles oferecem recursos como loopings, templates, condicionais, includes, e dependendo do caso funcionalidades extras da linguagem na qual o ele foi escrito. 
 
 
E QUAIS SÃO AS VANTAGENS DESSES GERADORES?
------------------------------------------

Bem a principal vantagem é que você estará servindo conteúdo estático, ou seja, nada de se preocupar em preparar todo um ambiente server-side com servidores, banco de dados, frameworks, dependências, módulos, plugins, é só pegar os arquivos html gerados, jogar em um servidor HTTP qualquer tipo o Apache ou Nginx e pronto o site já está funcionando. 
 
Uma outra vantagem é a velocidade, pense em um blog feito em WordPress, toda vez que um usuário requisitar uma página do blog no mínimo acontece o seguinte: 

 1. O servidor recebe a requisição  
 2. Um Código server-side se conectar a um banco de dados MySQL e executar diversas queries em diversas tabelas 
 3. O conteúdo das pesquisas no banco de dados é processado de acordo com as regras de negócio e o resultado é injetado em uma página/template  
 4. O template é renderizado e o HTML é gerado  
 5. O servidor retorna o html gerado

Para um site estático este processo se resumiria em: 

 1. O servidor recebe a requisição 
 2. O servidor retorna o html estático 
 
Bem mais direto não? Claro que existem alguns truques para cachear informação no WordPress, porem com sites estáticos essa preocupação não é necessária.
 
Existem dezenas de geradores estáticos implementados em praticamente qualquer linguagem que você possa imaginar, destes destaco o [Jekyll](https://jekyllrb.com/) (O mais famoso de todos), o [Docpad](https://github.com/docpad/docpad), o [Middleman](https://github.com/middleman/middleman) e o meu preferido o [Hugo](https://github.com/gohugoio/hugo).
 
O Hugo é um gerador escrito em Go e é o que eu estou usando neste blog! Ele é insanamente rápido e simples de aprender, não é necessário ter nenhum conhecimento aprofundando em Go para brincar com ele, basta dar uma olhada na [documentação oficial](https://gohugo.io/) que você já será capaz de criar o seu blog em menos de 15 minutos - Você quer @RubyOnRails. 

A comunidade Hugo também é muito forte e ativa, sempre terá alguém disposto a ajudar quem está com dúvidas, falo isso por experiencia própria. A comunidade também produz vários templates gratuitos, existe até uma [página oficial](https://themes.gohugo.io/) com um compilado de templates publicados, mas nada impede que você crie o seu próprio tema personalizado que é uma tarefa bem fácil graças a simplicidade do Hugo. 
 
 
CUIDADO COM O HYPE!
-------------------

Don't Believe the Hype! Geradores estáticos definitivamente não foram feitos para substituir os grandes CMS do mercado em todas as situações, eles só devem ser usados quando uma CMS não faz sentido ou é complexo demais para a solução do problema. Alguns exemplos onde um os sistemas tradicionais ainda seriam uma boa escolha são: 
 
 1. **Conteúdo dinâmico ou em "tempo real":** por exemplo um blog que precisa organizar os posts dinamicamente de acordo com as preferências do usuário ou por posts mais populares no momento, não existe uma solução definitiva para esta questão quando assunto são sites estáticos já que uma vez que o HTML é gerado ele será o mesmo para todos que requisitarem a página.
 2. **Cliente leigo ou inflexível:** editar uma .md é menos amigável que escrever um post no WordPress, o mesmo vale para gerenciar conteúdo, subir imagens, arquivos enfim, para um usuário comum com pouco conhecimento técnico, os gerenciadores de conteúdo tradicionais ainda são mais amigáveis. Por mais que existam algumas iniciativas de se criar CMS baseados em texto, e até mesmo editores que permitem escrever diretamente no Github, elas ainda estão longe de serem tão intuitivas como o WordPress para um usuário final comum. 
 3. **Interação com o usuário:** em sites estáticos, interações do usuário como buscas e preenchimento de formulários se tornam um desafio. Até hoje eu não encontrei um gerador que lide bem com buscas, a solução mais comum é deixar as buscar a cargo serviços de terceiros como o DuckDuckGo ou o Google Custom Search. Uma outra solução é usar indexadores de JSON/XML como o lunr.js para fazer uma gambiarra com o sitemap do blog, eu irei explicar melhor futuramente como fazer isto, mas já adiantando, esta gambiarra até que funciona bem, mas está longe das buscas complexas que se pode montar quando se tem uma base de dados à disposição.
 
Resumindo, o projeto é simples o suficiente para não precisar de conteúdo dinâmico? Quem vai alimentar o blog tem conhecimento técnico mínimo ou é flexível o suficiente para aprender a editar a lidar com um gerador estático? O projeto tem taxonomia bem definida e não precisa de algo muito complexo para gerenciar conteúdo? Se a resposta para estas perguntas for sim, então vale a pena dar uma olhada em algum gerador estático. 

Eu pretendo fazer uma serie de posts com alguns tutoriais rápidos de Hugo, explicando desde a instalação, estrutura de pastas/arquivos, configuração, comandos básicos, logica de query e templates e por fim como automatizar a tarefa de build e deploy com o  Travis-CI sempre que você der um push no repositório do site. Você pode conferir o código fonte deste blog [aqui](https://github.com/jhonnyrogerb/jhonny-roger-blog)!