---
title: Estruturas de Dados Imutáveis com o Immutable.js
author: Jhonny Roger
image: /img/immutable.png
type: post
date: 2017-10-07
excerpt: Vamos falar sobre o immutable.js, uma biblioteca fenomenal para se trabalhar com estruturas de dados 100% imutáveis em JavaScript
categories:
  - JavaScript
  - Funcional
  - Immutable.js
tags:
  - JavaScript
  - map
  - filter
  - colecoes
  - array
---


Uma das grandes dificuldades de se trabalhar com o paradigma funcional em JavaScript é a falta de estruturas de dados 100% imutáveis. Existem algumas saídas para se contornar este problema usando apenas recursos da linguagem, porém em determinados cenários, estes recursos não são o suficiente podendo gerar problemas de escalabilidade ou qualidade de código.

Pensando nisto, o time do Facebook criou o immutable.js, uma biblioteca que traz estruturas de dados 100% imutáveis para o JavaScript. Ela trabalha com algumas estruturas de dados já conhecidas como List, Map, OrderedMap, Set, OrderedSet, Stack e Record, com a diferença de que todas estas estruturas são implementadas seguindo os conceitos de imutabilidade, 

Caso ainda esteja um pouco perdido sobre o que é imutabilidade, recomendo que você dê uma olhada nos meus posts anteriores sobre o assunto antes de prosseguir com a leitura. 

- https://jhonnyroger.com/javascript-funcional-map-reduce-filter/
- https://jhonnyroger.com/javascript-funcional-higer-order-function-funcoes-primeira-classe-funcoes-puras/


INSTALAÇÃO
----------

Existem várias formas de se instalar e utilizar o immutable.js, ele pode ser utilizado tanto no back-end com node quanto no browser com algum bundler tipo o browserify ou webpack. Como o nosso exemplo será via node, nós utilizaremos o  npm. 

	npm install immutable

Após este comando já será possível importar o immutable.js em seu código

	const { Map } = require('immutable')

LIST
----

List é uma estrutura de dados com índices numerados, muito semelhante ao que seriam os Arrays em JavaScript puro. Devido as semelhanças, elas geralmente são utilizadas em situações onde seria necessário fazer o uso de Arrays comuns. Veja alguns exemplos: 

	const { List } = require('immutable')

	const lista1 = List() //List []

	const lista2 = lista1.set(0, 0) //List [0]
	const lista3 = lista2.set(1, 1) //List [0, 1]

	const lista4 = lista3.push(2) //List [0, 1, 2]
	const lista5 = lista4.pop() //List [0, 1]

	const lista6 = lista5.unshift(3) //List [3, 0, 1]
	const lista7 = lista6.shift() //List [0, 1]

	lista4.get(0) // => 0
	const lista8 = lista4.set(0, 5) //List [5, 1, 2]
	lista4.get(0) // => 0
	lista8.get(0) // => 5
	

*Lists são estruturas imutáveis, sendo assim, qualquer método que realize algum tipo de alteração não afetará a lista original, mas sim, retornará uma coleção completamente nova com as mudanças realizadas. Este é o motivo pelo qual sempre foi declarado uma nova lista a cada alteração neste exemplo.*

Como deu para perceber, existem vários métodos que são análogos entre os Arrays puros e Lists, o *push* por exemplo tem a mesma função em ambos os casos, adicionar um valor no final de uma lista, o mesmo vale para métodos como *pop*, *unshift* e *shift*. O método set adiciona um valor na posição da lista passada como parâmetro, já o get retorna o valor baseado na posição do índice passado por parâmetro.

Você ainda pode criar uma List passando um Array como parâmetro "construtor". O contrário também pode ser feito, com a função *.toArray()* é possível retornar uma representação em Array de uma List. Veja ambos os exemplos abaixo;


	const { List } = require('immutable')

	let arrayComum1 = [ 1, 2, 3, 4 ]
	const lista1 = List(arrayComum1) //List [1, 2, 3, 4]

	let arraycomum2 = lista1.toArray() //[1, 2, 3, 4]


MAP
---

o Map é uma estrutura imutável não ordenada baseada em chave-valor. Se no Immutable.js a List é o que corresponde a um Array, o Ḿap é a representação do que seria um objeto literal do JavaScript. 

Uma das grandes diferenças entre os dois, é que no caso do Map qualquer tipo valor pode ser usado como *chave* (literalmente qualquer tipo de valor, incluindo *undefined*, *false*, *null*, *true*, entre outros), já com objetos JavaScript apenas Strings são permitidas. Veja alguns exemplos:


	const { Map } = require('immutable')
	const { List } = require('immutable')

	const map1 = Map() //Map {}
	const map2 = map1.set('nome', 'Robert Smith') //Map { "nome": "Robert Smith" }
	const map3 = map2.set('nome', 'Sarah Idan') //Map { "key": "Sarah Idan" }

	map2.get('nome') //=> Robert Smith
	map3.get('nome') //=> Sarah Idan

	//Passando um objeto literal como construtor
	const map4 = Map({ nome: 'John Connor', email: 'john@connor.net' }); //Map { nome: 'John Connor', email: 'john@connor.net' }

	//Utilizando uma "List" como chave (qualquer valor pode ser utilizado)
	const map5 = map4.set(List([1, 2, 3]), "4-5-6") //Map { "nome": "John Connor", "email": "john@connor.net", [1,2,3]: "4-5-6" }

	
ORDEREDMAP
-----------

Esta é uma estrutura de dados muito semelhante a um Map, com a diferença que ela é ordenada. A ordenação padrão é definida pela ordem de inclusão dos itens, porém existem métodos como o *.sort()* e o *.sortBy()* que podem reordenar os valores.

Por ter algumas funções a mais, o OrderedMap acaba consumindo mais memória e recursos que um Map comum, portanto, ele só deve ser usado quando necessário. Veja alguns exemplos:

	const { OrderedMap } = require('immutable')

	const orderedMap1 = OrderedMap().set('Robert Smith', 43)
		.set('Sarah Idan', 22)
		.set('John Connor', 61) 
	//OrderedMap { "Robert Smith": 43, "Sarah Idan": 22, "John Connor": 61 }

	//Ordenando um OrderedMap
	const orderedMap2 = orderedMap1.sortBy((value, key) => value); 
	//OrderedMap { "Sarah Idan": 22, "Robert Smith": 43, "John Connor": 61 }


SET e ORDEREDSET
-----------------

O Set e o OrderedSet são estruturas muito semelhantes a uma List, porém em ambos os casos, não são aceitos valores duplicados, sendo que o OrderedSet é uma versão ordenada de um Set. 

Caso se tente inserir um valor já existente em um Set ou OrderedSet este valor será ignorado. 

	const { Set } = require('immutable')
	const { OrderedSet } = require('immutable')

	//Adicionando valores em um Set
	const set1 = Set([5, 4, 3]) //Set { 5, 4, 3 }
	const set2 = set1.add(5) //Set { 5, 4, 3 }
	const set3 = set1.add(6) //Set { 5, 4, 3, 6 }

	//Ordenando um OrderedSet
	const orderSet1 = OrderedSet([5, 4, 3, 9]) //OrderedSet { 5, 4, 3, 9 }
	const orderSet2 = orderSet1.sort() //OrderedSet { 3, 4, 5, 9 }


STACK
-----

Stack é uma estrutura baseada em pilhas FILO (first in last out), esse tipo de estrutura é extremamente rápida, mas dependendo do caso, pode ter como desvantagem a sua simplicidade. 

Basicamente ela funciona como o uma List trabalhando de forma mais limitada, sendo que todas as operações de inclusão e exclusão ocorrerão apenas no topo da pilha. Os métodos básicos são o *shift* e o *unshift*, o *push* e o *pop* neste caso servem apenas como alias tendo o mesmo efeito do *shift/unshift*. Veja alguns exemplos: 

	const { Stack } = require('immutable')

	const stack1 = Stack([0, 1, 2, 3]) //Stack [ 0, 1, 2, 3 ]

	const stack2 = stack1.push(4) //Stack [ 4, 0, 1, 2, 3 ]
	const stack3 = stack2.pop() //Stack [ 0, 1, 2, 3 ]

	const stack4 = stack3.unshift(5) //Stack [ 5, 0, 1, 2, 3 ]
	const stack5 = stack4.shift() //Stack [ 0, 1, 2, 3 ]


RECORD
------

O Record é uma estrutura para criar esquemas, ou classes com valores padrão que podem ser instanciadas. Com ele é possível definir um valor para um determinado atributo do Record caso ele não seja passado no método construtor. 

Caso um atributo não esteja no Record e for passado via construtor, este atributo será ignorado.

	const { Record } = require('immutable')
	const RecordEsquema = Record({ a: 1, b: 2 })

	//Apenas o valor de 'b' foi passado no construtor
	//O valor de 'a' será preenchido com o valor padrão
	const myRecord1 = new RecordEsquema({ b: 3 }) //Record { "a": 1, "b": 3 }

	//Neste caso ambos atributos foram preenchidos
	//Ambos serão sobreescrevidos
	const myRecord2 = new RecordEsquema({ a: 5, b: 3 })  //Record { "a": 5, "b": 3 }

	//Atributo 'x' não foi declarado no Record será ignorado
	const myRecord3 = new RecordEsquema({ x: 3 }) //Record { "a": 1, "b": 2 }

Por enquanto é isso, o immutable.js é uma ferramenta que pode acrescentar muito em projetos JavaScript que buscam embarcar no paradigma funcional, assegurando que de fato todas as estruturas de dados serão imutáveis. 

Deixarei uma lista com a documentação da API de cada uma destas estruturas, com vários exemplos, métodos e recursos mais detalhados sobre o assunto. Até a próxima!

- https://facebook.github.io/immutable-js/docs/#/List
- https://facebook.github.io/immutable-js/docs/#/Map
- https://facebook.github.io/immutable-js/docs/#/OrderedMap
- https://facebook.github.io/immutable-js/docs/#/Set
- https://facebook.github.io/immutable-js/docs/#/OrderedSet
- https://facebook.github.io/immutable-js/docs/#/Stack
- https://facebook.github.io/immutable-js/docs/#/Record
