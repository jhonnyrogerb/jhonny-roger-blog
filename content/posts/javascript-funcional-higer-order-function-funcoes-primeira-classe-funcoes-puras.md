---
title: JavaScript funcional - higher-order functions, funções de primeira classe e funções puras
author: Jhonny Roger
image: /img/jsf.jpg
type: post
date: 2017-08-09
excerpt: Alguns conceitos de programação funcional em JavaScript
categories:
  - JavaScript
  - Funcional
  - Tutorial
tags:
  - javascript
  - ecma
  - ecmascript
  - es5
  - reduce
  - map
  - filter
  - colecoes
  - array
---


Como eu exemplifiquei no [post anterior](https://jhonnyroger.com/javascript-funcional-map-reduce-filter/), as funções map, reduce e filter do JavaScript utilizam alguns conceitos de programação funcional, um destes conceitos é conhecido como *Higher-Order Functions*. Uma *higher-order function* é uma função que pode receber outra função como argumento ou retornar uma função como resultado. 

Isto só é possível porque o JavaScript trata as suas funções como *First Class Functions*, abrasileirando, *funções de primeira classe*. Este conceito é uma característica de linguagem, e só ocorre quando ela oferece a possibilidade de tratar funções como objetos comuns que podem ser passados como argumentos, manipulados, retornados, etc.

Por o JavaScript tratar as suas funções como *first class functions* o trabalho de construir *higher-order functions* é mais natural, tão natural que com certeza você já utilizou estes conceitos sem perceber! Toda vez que você escreve uma função que tem como callback uma outra função, você está utilizando o conceito de *first class function*.

    let a = function(){
	   console.log("Eu sou a função a!")
	}
	
	let b = function(fn){
	   return fn
	}
	
	let c = b(a)
	
	c()
	//Eu sou a função a!
	
	a()
	//Eu sou a função a!
	
Este exemplo demonstra o conceito de *first class functions*, e de como é possível tratar funções como variáveis e objetos comuns em JavaScript.

 1. A variável *a* recebe como valor, uma função que irá apenas printar a frase "Eu sou a função a!";
 2. A variável *b* recebe como valor uma função que receberá outra função como argumento. A função passada por argumento será o retorno da função *b*;
 3. Quando a função *b* é executada tendo a função *a* como argumento, o valor retornado será a função *a*;
 3. A variável *c* receberá o retorno da execução da função *b*, ou seja, agora variável *c* tem o mesmo valor da função *a* que foi retornada pela função *b*;
 4. Quando for chamada, a função *c* executará a mesma logica da função *a* já que as duas tem o mesmo valor;

Agora vamos para um exemplo com higher-order functions:


    let menorQue = function(argumento){
	   return function(numero){
	      return numero < argumento
	   }
	}
	
	let menorQueCinco = menorQue(5)
	
	console.log(menorQueCinco(3))
	//true
	console.log(menorQueCinco(4))
	//true
	console.log(menorQueCinco(4.99))
	//true
	console.log(menorQueCinco(10))
	//false
	console.log(menorQueCinco(19))
	//false
	
Neste exemplo a função *menorQue* criará e retornará uma nova função, sendo que a lógica de retorno da função criada, dependerá do valor do argumento recebido pela função *menorQue*.

Basicamente, o método *menorQue* retorna a seguinte função para a variável *menorQueCinco*:

    function(numero){
	   return numero < 5
	}


COMO AS FUNÇÕES MAP, REDUCE E FILTER UTILIZAM ESTES CONCEITOS?
--------------------------------------------------------------

As funções map, reduce e filter são apenas abstrações, ou seja, por baixo dos panos ainda existe todo uma lógica baseada em loops e comparação que é "ocultada" em prol de um código mais legível e direcionado para a resolução do problema.

Voltando nos exemplos do [post anterior](https://jhonnyroger.com/javascript-funcional-map-reduce-filter/), vamos utilizar a função filter:

    let carrosAcimaCinquentaMil = carros.filter((element, index, array) => {
	    return element.price > 50000
	})


Por baixo dos panos esta função está na verdade fazendo algo deste tipo:

    const filter = function(array, test) {
	   var novoArray = [];
	
	   for(var index = 0; index < array.length; index++){
	      if (test(array[index], index, array)){
	         novoArray.push(array[index]);
	      }
	   }
	
	   return novoArray;
	};
	
	let carrosAcimaCinquentaMil = filter(carros, function(element, index, array){
	   return element.price > 50000
	})

E aonde estão os conceitos de programação funcional? Bem, a função filter tem dois argumentos, um é o array que será filtrado e o outro é uma função que testará os elementos deste array.

Desta forma, nós temos um exemplo de utilização de *higher-order functions* e *first-class functions* já que uma função está sendo passada como argumento para outra função.

O mesmo vale para as funções map e reduce:
    
	cosnt map = function(array, translate) {
	   var novoArray = [];

	   for(var index = 0; index < array.length; index++){
	      novoArray.push(translate(array[index], index, array));
	   }
	
	   return novoArray;
	};
	
	let carrosDesvalorizados = map(carros, function(element, index, array){
	   element.price = element.price - (element.price * 0.05)
	   return element
	})


    const reduce = function(array, group, start) {
	   var current = start
	
	   for(var index = 0; index < array.length; index++){
	      current = group(current, array[index], index, array);
	   }
	
	   return current;
	};
	
	let carrosPorMarca = reduce(carros, function(value, element, index, array){
	   if(value[element.marca]){
	        value[element.marca].push({"name": element.name, "price": element.price})
	    }else{
	        value[element.marca] = []
	        value[element.marca].push({"name": element.name, "price": element.price})
	    }
	
	    return value
	}, {})
	
IMUTABILIDADE E FUNÇÕES PURAS
-------------

Uma outra técnica importante de programação funcional empregada por estes métodos são as funções puras. 

Funções puras seguem o conceito de imutabilidade, sendo assim, elas não podem alterar o estado de nenhum dado externo, não podem produzir nenhum efeito colateral, devem sempre retornar algum valor e devem retornar o mesmo valor para qualquer argumento passado.

Pegando a função map como exemplo, ela recebe o array carros como argumento, porem ela não altera o estado deste array. Sendo assim no final da execução do método o estado da coleção é exatamente o mesmo do início da execução, ao invés de alterar os dados da coleção carros, o método map retorna uma coleção totalmente nova com os dados mapeados.

A vantagem de se produzir código imutável é a certeza de que as suas funções não quebrarão os estados dos objetos de sua aplicação, pois, elas sempre retornarão dados completamente novos sem alterar nenhum estado. Isto diminui muito a preocupação com testes, afinal, porque você vai se preocupar em testar o estado da coleção *carros* se você sabe que ele nunca mudará.

Aliar alguns conceitos de programação funcional no seu código JavaScript pode facilitar muito a sua vida de programador, mas lembre-se tenha bom senso, busque utilizar estas técnicas no momento correto! Futuramente discutiremos outras técnicas de programação funcional como closures.