---
title: JavaScript Funcional - Higher-order Functions, Funções de Primeira Classe e Funções Puras
author: Jhonny Roger
image: /img/js-w.png
type: post
date: 2017-08-09
excerpt: Alguns conceitos de programação funcional em JavaScript
categories:
  - JavaScript
  - Funcional
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

HIGHER-ORDER FUNCTIONS
----------------------

Como eu exemplifiquei no [post anterior](https://jhonnyroger.com/javascript-funcional-map-reduce-filter/), as funções map, reduce e filter do JavaScript utilizam alguns conceitos de programação funcional, um destes conceitos, é conhecido como *Higher-Order Functions*.

*Higher-order function* é uma função que atua sobre funções, seja recebendo outras como argumento e/ou retornando funções como resultado.

Isto só é possível porque o JavaScript trata as suas funções como *First Class Functions*, abrasileirando, *funções de primeira classe*. Este conceito é uma característica de linguagem, e só ocorre quando ela oferece a possibilidade de tratar funções como objetos comuns que podem ser passados como argumentos, manipulados, retornados, etc.

Já que o JavaScript trata as suas funções como *first class functions*, o trabalho de construir *higher-order functions* é mais natural, tão natural que com certeza você já utilizou estes conceitos sem perceber! Eles estão por todo lado no mundo JavaScript, desde o back-end até o front-end, toda vez que você escreve uma função que tem como argumento um callback você está utilizando estes conceitos.

Você com provavelmente fez algo deste tipo com JQuery:
	
	$("#btn-x").click(function(){
		...
	});	

Note que a função *click* tem como argumento uma outra função.

Estas funções ainda permitem realizar abstrações de dados e comportamentos, veja o exemplo abaixo:

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
	
A função *menorQue* criará e retornará uma nova função, sendo que a lógica de retorno da função criada, dependerá do valor do argumento recebido pela função *menorQue*.

Basicamente, o método *menorQue* retorna a seguinte função para a variável *menorQueCinco*:

    function(numero){
	   return numero < 5
	}

IMUTABILIDADE
-------------

Escrever código com mudanças de estado é errado? Definitivamente NÃO! Porém um código mutável exige mais cuidados justamente porque eles podem produzir estados inconsistentes e/ou efeitos colaterais por toda a sua aplicação. Veja este caso:

	const carro = {
	   name: "Deville/Eldorado 4.9",
	   marca: "CADILLAC",
	   price: 76789.00
	}

	const aplicaDesconto = (carro, desconto) => {
	   const novoCarro = carro; 
	   novoCarro.price = novoCarro.price - desconto;
	   return novoCarro;
	}


	const carroComDesconto = aplicaDesconto(carro, 16789)

Após a execução deste código qual será o preço do objeto carros, 76789.00 ou 60000.00? Se você respondeu 60000.00, você está correto! 

	console.log(carro)
	//{ name: 'Deville/Eldorado 4.9', marca: 'CADILLAC', price: 76789 }

	console.log(carroComDesconto)
	//{ name: 'Deville/Eldorado 4.9', marca: 'CADILLAC', price: 60000 }

Este é um exemplo de código mutável que causa efeitos colaterais possívelmente indesejados, perceba que a função *mudaPreco* modificou o estado do objeto *carros*, mesmo que dentro dela tenha sido criado um novo objeto e apenas este objeto tenha sido alterado. Isto acontece porque quando você atribui um objeto já existente como o valor de uma variável, você está apenas atribuindo uma referência de memória do objeto original e não necessariamente criando uma nova instância.

O conceito de imutabilidade serve para evitar problemas como este, sendo esta é uma das características mais importantes do paradigma funcional. Por definição, imutabilidade refere-se a algo que não muda a sua condição ou estado, traduzindo para o mundo da programação, um código imutável é um código onde os seus objetos uma vez criados não mudam de estado sob nenhuma hipótese. Uma operação que envolve atualização de valores por exemplo, nunca irá mudar os dados do objeto original, mas sim criar um novo objeto com todas as mudanças aplicadas.

Infelizmente, o JavaScript ainda não tem estruturas de dados 100% imutáveis. A key word *const* não permite que você designe novos valores para um objeto depois que ele é criado, porém ela permite que você altere o valor das propriedades desse objeto. 

Existe ainda o método *Object.freeze* que congela o estado de um objeto e não permite nenhuma alteração de suas propriedades, o grande problema desse método é que ele só congela as propriedades de alto nível, qualquer outra propriedade que esteja em um nível baixo ainda poderá ser alterada.

	const carro = {
	   name: "Deville/Eldorado 4.9",
	   marca: "CADILLAC",
	   price: 76789.00
	}

	carro = 2;
	//TypeError: Assignment to constant variable.

	carro.name = "Ford Ká";
	console.log(carro)
	//Valor da propriedade mutável
	/*{
	   name: "Ford Ká",
	   marca: "CADILLAC",
	   price: 76789.00
	}*/

	/*********************************************************************/
	const carro = Object.freeze({
	   name: "Deville/Eldorado 4.9",
	   marca: "CADILLAC",
	   price: 76789.00,
	   address: {
	   	zipCode: "14404298",
	   	city: "São Paulo",
	   	state: "Brazil"
	   }
	});

	carro.name = "Ford Ká"
	console.log(carro)
	//Valor da propriedade imutável
	/*{ name: 'Deville/Eldorado 4.9',
	  marca: 'CADILLAC',
	  price: 76789,
	  address: { zipCode: '14404298', city: 'São Paulo', state: 'Brazil' } 
	}*/

	carro.address.city = "Rio de Janeiro"
	console.log(carro)
	//Valor da propriedade é mutável
	/*{ name: 'Deville/Eldorado 4.9',
	  marca: 'CADILLAC',
	  price: 76789,
	  address: { zipCode: '14404298', city: 'Rio de Janeiro', state: 'Brazil' } 
	}*/

Existem algumas bibliotecas que buscam adicionar estruturas totalmente imutáveis no JavaScript, a que eu mais gosto é a *immutable.js*, mas também existem outras como o *mori*. 

É até possível escrever um código imutável em JavaScript sem recorrer a bibliotecas de estrutura de dados externas, porém para projetos grandes pode ser bem trabalhoso controlar os estados imutáveis e escalar a aplicação.

FUNÇÕES PURAS
------------

Uma consequência de se construir código imutável são as chamadas *funções puras*. Para uma função ser considerada "pura" ela deve preencher alguns requisitos:

1. Não alterar o estado de nenhum dado externo
2. Não produzir nenhum efeito colateral
3. Sempre retornar o mesmo valor de entrada para qualquer argumento passado
4. Sempre retornar algum valor (uma função *"void"* sempre será uma função impura)
5. Sempre ter suas entradas e saídas definidas
6. Sempre retornar o mesmo valor para uma determinada entrada

Como deu pra perceber, a função do exemplo anterior desrespeita várias destas regras. Se formos repensa-la como uma função pura ela ficará assim:

	const carro = {
	   name: "Deville/Eldorado 4.9",
	   marca: "CADILLAC",
	   price: 76789.00
	}

	const aplicaDesconto = (carro, desconto) => {
	   return Object.assign({}, carro, {price: carro.price - desconto}); 
	}

	const carroComDesconto = aplicaDesconto(carro, 16789)
	console.log(carro)
	//{ name: 'Deville/Eldorado 4.9', marca: 'CADILLAC', price: 76789 }

	console.log(carroComDesconto)
	//{ name: 'Deville/Eldorado 4.9', marca: 'CADILLAC', price: 60000 }

Aqui foi utilizado o método *Object.assign*, esse método copia e sobrescreve todas as propriedades inumeráveis de um objeto para um outro criando um valor totalmente novo. Seguindo a ordem, nós passamos como primeiro parâmetro um objeto vazio, os valores do objeto *carro* serão copiados para este objeto vazio e o resultado desta cópia será mesclada com os valores do terceiro parâmetro.

Com este método nós transformamos a função *aplicaDesconto* em uma função pura, pois, agora ela não altera e nem gera efeitos colaterais nos estados de nenhum valor externo, os seus inputs (carros e desconto) não são alterados e tem o mesmo valor no início e no final da execução, ela retorna um valor e este valor é totalmente novo, não tem nenhuma entrada e saída oculta e por fim ela sempre retornará o mesmo valor para um determinado input (um desconto de 16789 sobre 76789 sempre será 60000 independentemente de qualquer estado externo ou interno da função).

A vantagem de se produzir código imutável é a certeza de que as suas funções não quebrarão os estados dos objetos de sua aplicação. Isto diminui muito a preocupação com testes, afinal, porque você vai se preocupar em testar o estado do objeto *carros* se você sabe que ele nunca mudará? Não excluindo a melhora na legibilidade e manutenibilidade do código já que todo o comportamento de sua aplicação estará encapsulado em funções e não em estados.


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

*Claro que aqui eu estou desconsiderando vários fatores que estão implementados na função original da API, eu simplifiquei apenas para servir de exemplo.*

E aonde estão os conceitos de programação funcional? Bem, a função filter tem dois argumentos, um é o array que será filtrado e o outro é uma função que testará os elementos deste array, sendo assin, nós temos um exemplo de utilização de *higher-order functions* e *first-class functions* já que uma função está sendo passada como argumento para outra função.

O mesmo vale para as funções map e reduce que também abstraem a lógica de funcionamento, porém, estão realizando operações parecidas com estes exemplos:
    
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

Estas funções também podem ser consideradas puras pois elas não ferem nenhuma das regras já citadas. Veja o método Map por exemplo, ele recebe um array de carros como argumento, porem ela não altera o estado deste array. Sendo assim no final da execução do método o estado da coleção é exatamente o mesmo do início da execução, ao invés de alterar os dados da coleção carros, o método map retorna uma coleção totalmente nova com os dados mapeados.

Por enquanto é isso, no próximo post sobre JavaScript Funcional falaremos sobre o *immutable.js*, uma lib incrível para trabalhar com estruturas de dados 100% imutáveis em JavaScript. Até mais!
