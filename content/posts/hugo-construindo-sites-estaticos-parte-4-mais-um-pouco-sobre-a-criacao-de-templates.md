---
title: Hugo - Construindo Sites Estáticos Parte 4 - Criação de Templates
author: Jhonny Roger
image: /img/hugo-gradiente.png
type: post
date: 2017-08-13
excerpt: Falaremos um pouco mais sobre alguns conceitos básicos na construção de templates em Hugo
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

O HUGO utiliza como motor de template as próprias engines de Html e Texto da linguagem GO, elas são simples e poderosas o suficiente para praticamente qualquer tarefa envolvendo a criação de templates HTML, oferecendo funcionalidades como loops, condicionais, acesso a variáveis, partials, acesso a funções, etc. 

Para acessar essas funcionalidades você deve usar chaves duplas *{{ }}*, qualquer código fora destas chaves será interpretado como texto comum, veja um exemplo de como acessar o valor de uma variável: 

    <p>{{ foo }}</p>

Suponde que a variável *foo* tenha como valor a string *"Teste"*, o arquivo final renderizado ficaria da seguinte forma: 

    <p>Teste</p>

Para declarar uma variável:

    {{ $foo := "Teste" }}

A sintaxe básica para acessar funções é muito parecida, basta declarar a função primeiro e depois todos os seus argumentos seguidos de espaço, no exemplo abaixo a função *add* recebe seus dois parâmetros:

    <!-- Template -->
    <p>Valor de 1 + 2 = {{ add 1 2 }}</p>

    <!-- Resultado -->
    <p>Valor de 1 + 2 = 3</p>

CONDICIONAIS
------------

Agora vamos para um exemplo básico de condicionais:

    <!-- Template -->
    {{ if gt 2 1 }}
      <p>True</p>
    {{else}}
      <p>False</p>
    {{ end }}

    <!-- Resultado -->
    <p>True</p>

Neste exemplo foi utilizado a função *gt*, que apenas verifica se o primeiro parâmetro é maior que o segundo (o mesmo que *2 > 1*). Note que apenas a parte do código que satisfaz a condição foi renderizada, sendo que a template engine do GO considera como falso os valores *0*, *false* e qualquer *map, slice, array ou string* de tamanho 0.

Os operadores lógicos *&&* e *||* (e/ou), são representados pelas key-words *and* e *or* respectivamente, exemplo: 

    <!-- Template -->
    {{ if and((gt 2 1) or((gt 10 4) (gt 1 2))) }}
      <p>True</p>
    {{else}}
      <p>False</p>
    {{ end }}

    <!-- Resultado -->
    <p>True</p>

LOOPS
------

Para iterar um array, map ou slice se usa o range, veja um exemplo:

    <!-- Template -->
    <ul>
      {{ range events }}
        <li>{{ . }}</li>
      {{ end }}
    </ul>

    <!-- Resultado -->
    <ul>
      <li>evento 1</li>
      <li>evento 2</li>
      <li>evento 3</li>
      <li>evento 4</li>
      <li>evento 5</li>
      <li>evento 6</li>
      <li>evento ...100</li>
    </ul>

Como pode notar, a sintaxe também é bastante simples. Os valores de cada posição do array pode ser acessado através do contexto, representado pelo ponto *{{ . }}*, mas caso você queira dar um nome para este valor ou acessar o índice dele no array, você pode fazer da seguinte maneira:

    <!-- Template -->
    <ul>
      {{range $index, $event := events}}
        <li id="event-{{ $index }}">{{ $event }}</li>
      {{ end }}
    <ul>

    <!-- Resultado -->
    <ul>
      <li id="event-0">evento 1</li>
      <li id="event-1">evento 2</li>
      <li id="event-2">evento 3</li>
      <li id="event-3">evento 4</li>
      <li id="event-4">evento 5</li>
      <li id="event-5">evento 6</li>
      <li id="event-99">evento ...100</li>
    </ul>

PARTIALS
---------

Partials são pequenos fragmentos de template, ou componentes que podem ser reaproveitados e incluídos em outros templates com o intuito de evitar repetição de código desnecessário e manter os templates mais limpos e legíveis. Eles devem ser criados e armazenados no diretório *layouts/partials*, para acessar um partial em seus templates você deve seguir o seguinte padrão:

    {{ partial "<NOME DO PARTIAL>.html" . }}

Abaixo temos um exemplo da partial *header.html* que representa o cabeçalho do nosso site:

    <!-- Partial header.html -->
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="utf-8">
        <title>{{ .Title }}</title>
    </head>
    <body lang="en">
      <header>
        <ul class="menu">
          <li>Menu item 1</li>
          <li>Menu item 1</li>
          <li>Menu item 1</li>
        </ul>
      </header>

Aqui temos a partial *footer.html* que representa o rodapé do nosso site:

    <!-- Partial footer.html -->
    <footer>
      <div>
        <p>Rodapé</p>
      </div>
    </footer>
    </body>
    </html> 

O conteúdo de cada partial será injetado em nosso template automaticamente pelo HUGO quando a página for renderizada.

    <!-- Template single.html -->
    {{ partial "header.html" . }}
      <div class="content">
        <h1>Eventos</h1>
        <ul class="events">
          {{range $index, $event := events}}
            <li id="event-{{ $index }}">{{ $event }}</li>
          {{ end }}
        <ul>
      </div>
    {{ partial "footer.html" . }}

    <!-- Resultado -->
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="utf-8">
        <title>Meu site</title>
    </head>
    <body lang="en">
      <header>
        <ul class="menu">
          <li>Menu item 1</li>
          <li>Menu item 1</li>
          <li>Menu item 1</li>
        </ul>
      </header>
      <div class="content">
        <h1>Eventos</h1>
        <ul class="events">
          <li id="event-0">evento 1</li>
          <li id="event-1">evento 2</li>
          <li id="event-2">evento 3</li>
          <li id="event-3">evento 4</li>
          <li id="event-4">evento 5</li>
          <li id="event-5">evento 6</li>
          <li id="event-99">evento ...100</li>
        </ul>
      </div>
      <footer>
      <div>
        <p>Rodapé</p>
      </div>
    </footer>
    </body>
    </html> 


LIDANDO COM ESCOPO E CONTEXTO
-----------------------------

Cada linguagem, framework ou bibliotecas lida com escopo de formas diferentes, escopo é o que define a forma com que uma variável, objeto ou função estará visível para outros elementos de seu código. A template engine do GO é bastante restritiva com escopo de variáveis, uma variável declarada dentro de uma condicional, ou em um loop, só é visível dentro de seu contexto.

    <!-- Template -->
    {{ if true }}
      {{ $foo := "Teste" }}
    {{ end }}
    foo: {{ $foo }} 

    <!-- Resultado -->
    //Error: undefined variable "$foo"

No exemplo acima, a construção do template retornaria um erro, pois, a variável *$foo* não é acessível fora do contexto da condicional *if*.  
  
Uma outra situação é quando se tenta modificar o valor de uma variável fora de seu contexto, nesta situação, o valor da variável só será alterado a nível de contexto, fora dele o valor não será alterado:
    
    <!-- Template -->
    {{ $foo := "Valor inicial" }}
    {{ if true }}
      {{ $foo := "Valor modificado" }}
      Valor dentro do if: {{ $foo }}
    {{ end }}
    Valor fora do if: {{ $foo }}

    <!-- Resultado -->
    Valor dentro do if: valor modificado
    Valor fora do if: Valor inicial

Um outro exemplo das limitações de escopo, é a o acesso de variáveis definidas em um template por uma partial e vice-versa, este tipo de acesso não é possível no motor de template do HUGO. 

    <!-- Partial foo.html -->
    {{ $foo := "Teste" }}

    <!-- Template -->
    {{ partial "foo.html" . }}
    Valor de foo: {{ $foo }}

    <!-- Resultado -->
    //Error: undefined variable "$foo"

Para contornar estas limitações existe o *$.Scratch*, ele á acessível a nível de página e se expande também a nível de partials. Os métodos básicos do *$.Scratch* são:

  - Set ou Add: salva valores baseado em chave/valor.
  - Get: retorna o valor baseado em uma chave.
  - SetInMap: Salva valores em um Map baseado na chave deste map e em chave/valor
  - GetSortedMapValues: retorna o valor baseado em uma chave ordenados pela chave do Map.

Veja alguns exemplos:

    //soma
    {{ $.Scratch.Add "a1" 12 }}
    {{ $.Scratch.Get "a1" }} {{/* => 12 */}}
    {{ $.Scratch.Add "a1" 1 }}
    {{ $.Scratch.Get "a1" }} // {{/* => 13 */}}

    //concatenação
    {{ $.Scratch.Add "a2" "AB" }}
    {{ $.Scratch.Get "a2" }} {{/* => AB */}}
    {{ $.Scratch.Add "a2" "CD" }}
    {{ $.Scratch.Get "a2" }} {{/* => ABCD */}}

    //adiciona
    {{ $.Scratch.Add "l1" (slice "A" "B") }}
    {{ $.Scratch.Get "l1" }} {{/* => [A B]  */}}
    {{ $.Scratch.Add "l1" (slice "C" "D") }}
    {{ $.Scratch.Get "l1" }} {{/* => [A B C D] */}}

    //novo valor
    {{ $.Scratch.Set "v1" 123 }}
    {{ $.Scratch.Get "v1" }}  {{/* => 123 */}}
    {{ $.Scratch.Set "v1" 54321 }}
    {{ $.Scratch.Get "v1" }}  {{/* => 54321 */}}

    {{ $.Scratch.SetInMap "a3" "b" "XX" }}
    {{ $.Scratch.SetInMap "a3" "a" "AA" }}
    {{ $.Scratch.SetInMap "a3" "c" "CC" }}
    {{ $.Scratch.SetInMap "a3" "b" "BB" }}
    {{ $.Scratch.GetSortedMapValues "a3" }} {{/* => []interface {}{"AA", "BB", "CC"} */}}

Uma diferença básica entre o *Set* e o *Add*, é que o *Set* sempre vai criar um valor novo para uma determinada chave, já o *Add* sempre tentará somar, concatenar ou incluir o valor passado caso já exista um valor na chave. 

Para finalizar vamos voltar aos nossos exemplos anteriores e demonstrar como o *$.Scratch* resolve o problema de escopo.

    <!-- VARIÁVEIS DEFINIDAS DENTRO DO CONTEXTO DE IF -->
    <!-- Template -->
    {{ if true }}
      {{ $.Scratch.Add "foo" "Teste" }}
    {{ end }}
    <p>Valor de foo: {{ $.Scratch.Get "foo" }}</p>

    <!-- Resultado -->
    <p>Valor de foo: Teste</p>

    <!-- MUDANÇA DE VALOR FORA DE ESCOPO -->
    <!-- Template -->
    {{ $.Scratch.Set "foo" "Valor inicial" }}
    {{ if true }}
      {{ $.Scratch.Set "foo" "Valor modificado" }}
      <p>Valor dentro do if: {{ $.Scratch.Get "foo" }}</p>
    {{ end }}
    <p>Valor fora do if: {{ $.Scratch.Get "foo" }}</p>

    <!-- Resultado -->
    <p>Valor dentro do if: Valor modificado</p>
    <p>Valor fora do if: Valor modificado</p>

    <!-- PARTIALS -->
    <!-- Partial foo.html -->
    {{ $.Scratch.Set "foo" "Teste" }}

    <!-- Template -->
    {{ partial "foo.html" . }}
    <p>Valor de foo: {{ $.Scratch.Get "foo" }}</p>

    <!-- Resultado -->
    <p>Valor de foo: Teste</p>

Por hoje é isto, caso você queira se aprofundar mais sobre estes assuntos, dê uma olhada nestes links:

- https://gohugo.io/functions/scratch
- https://gohugo.io/templates/introduction/
- https://gohugo.io/variables/
- https://gohugo.io/functions/

  