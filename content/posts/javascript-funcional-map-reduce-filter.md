---
title: JavaScript funcional - map, reduce e filter
author: Jhonny Roger
image: /img/map-filter-reduce.png
type: post
date: 2017-08-08
excerpt: Neste post falaremos sobre os métodos map, reduce e filter em JavaScript e como eles podem ser poderosos aliados na hora de se trabalhar com arrays e coleções.
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


O JavaScript é uma linguagem muito poderosa, principalmente por ela ser multiparadigma! Você pode programar de forma procedural, orientada a objetos e até mesmo utilizar programação funcional. Mas como diria o melhor amigo da vizinhança, com grandes poderes vem grandes responsabilidades, então não vá confundir liberdade de escolha de paradigma com libertinagem em... JS não é bagunça.

Bem, voltando ao assunto, alguns métodos baseados em programação funcional já foram introduzidos há algum tempo na especificação do JavaScript, eles nem são mais tão hipsters assim, foram adicionados lá em 2011/2012 com o ES5, mas por algum motivo obscuro poucos devs conhecem e utilizam estas funções. Estes métodos são o *map*, o *reduce* e o *filter*.

Estas três funções tornam o trabalho de manipular arrays e coleções em uma tarefa mais simples se comparados aos *loops for* tradicionais quando o assunto são coleções e operações complexas.

As nomenclaturas delas são autoexplicativas, o *filter* serve para você remover dados indesejados do array, o *reduce* é utilizado para agrupar, reduzir, somar, concatenar informações e o *map* tem como função mapear cada posição da coleção, aplicar uma regra pré definida em cada elemento e devolver um novo array com todas as regras já aplicadas.

Eu explicarei cada uma delas de forma detalhada com casos de uso próximos da realidade, a coleção abaixo será utilizada em todos os exemplos:

    let carros = [  
	   {  
	      "name":"MOBI WAY on 1.0 Fire Flex 5p.",
	      "marca":"FIAT",
	      "price":38227.00
	   },
	   {  
	      "name":"Oggi",
	      "marca":"FIAT",
	      "price":3475.00
	   },
	   {  
	      "name":"Palio 1.0 Cel. ECON./ITALIA F.Flex 8V 4p",
	      "marca":"FIAT",
	      "price":26304.00
	   },
	   {  
	      "name":"Deville/Eldorado 4.9",
	      "marca":"CADILLAC",
	      "price":76789.00
	   },
	   {  
	      "name":"Seville 4.6",
	      "marca":"CADILLAC",
	      "price":68273.00
	   },
	   {  
	      "name":"AMAROK CD2.0 16V/S CD2.0 16V TDI 4x2 Die",
	      "marca":"VOLKSWAGEN",
	      "price":121860.00
	   },
	   {  
	      "name":"Fox 1.0 Mi Total Flex 8V 5p",
	      "marca":"VOLKSWAGEN",
	      "price":31468.00
	   },
	   {  
	      "name":"Gol (novo) 1.0 Mi Total Flex 8V 4p",
	      "marca":"VOLKSWAGEN",
	      "price":28843.00
	   },
	   {  
	      "name":"Gol (novo) 1.6 Mi Total Flex 8V 2p",
	      "marca":"VOLKSWAGEN",
	      "price":54798.00
	   },
	   {  
	      "name":"CAPTIVA SPORT FWD 2.4 16V 171/185cv",
	      "marca":"CHEVROLET",
	      "price":104447.00
	   },
	   {  
	      "name":"Celta Spirit 1.0 MPFI VHC 8V 5p",
	      "marca":"CHEVROLET",
	      "price":23552.00
	   },
	   {  
	      "name":"Corsa Sed Class.Spirit 1.0/1.0 FlexPower",
	      "marca":"CHEVROLET",
	      "price":15429.00
	   },
	   {  
	      "name":"Tucson GL 1.6 Turbo 16V Aut.",
	      "marca":"HYUNDAI",
	      "price":138283.00
	   },
	   {  
	      "name":"Fiesta 1.5 16V Flex Mec. 5p",
	      "marca":"FORD",
	      "price":47610.00
	   },
	   {  
	      "name":"KA 1.0 8V/1.0 8V ST Flex 3p",
	      "marca":"FORD",
	      "price":24515.00
	   }
	]
	
	

MAP
---
Como dito anteriormente, o map percorrerá todas os elementos da sua coleção, aplicará uma regra pré definida e te devolverá uma nova coleção com todas as regras aplicadas.

Imagine que você tenha que aplicar uma regra na coleção de exemplo, onde todos os carros sofrerão uma desvalorização de 5% sobre o valor do preço, com o map seria possível resolver isto com três linhas:

    let carrosDesvalorizados = carros.map(function(element, index, array){
		element.price = element.price - (element.price * 0.05)
		return element
	})

O Map percorrerá a coleção carros da esquerda para direita, disparando um callback para cada um dos seus elementos. Este callback terá três argumentos: o primeiro, que aqui eu chamei de *element* guardará o valor do elemento atual da iteração, o segundo argumento guardará o valor do índice (posição) desse elemento na coleção e o terceiro é uma representação do array original.  

Cada valor retornado no callback se torna um novo elemento em uma nova coleção, sendo adicionado na mesma posição em que o elemento estava na coleção original. Quando a iteração acabar o Map devolverá um novo array com todos os elementos com a sua regra já aplicada. 

Neste exemplo mesmo, nós pegamos o array original *carros*, aplicamos uma regra em cada um de seus elementos e geramos uma nova coleção com as desvalorizações já calculadas! A saída ficaria mais ou menos assim: 

    console.log(carrosDesvalorizados)
	/*[  
	   {  
	      name:'MOBI WAY on 1.0 Fire Flex 5p.',
	      marca:'FIAT',
	      price:36315.65
	   },
	   {  
	      name:'Oggi',
	      marca:'FIAT',
	      price:3301.25
	   },
	   {  
	      name:'Palio 1.0 Cel. ECON./ITALIA F.Flex 8V 4p',
	      marca:'FIAT',
	      price:24988.8
	   },
	   {  
	      name:'Deville/Eldorado 4.9',
	      marca:'CADILLAC',
	      price:72949.55
	   },
	   {  
	      name:'Seville 4.6',
	      marca:'CADILLAC',
	      price:64859.35
	   },
	   {  
	      name:'AMAROK CD2.0 16V/S CD2.0 16V TDI 4x2 Die',
	      marca:'VOLKSWAGEN',
	      price:115767
	   },
	   {  
	      name:'Fox 1.0 Mi Total Flex 8V 5p',
	      marca:'VOLKSWAGEN',
	      price:29894.6
	   },
	   {  
	      name:'Gol (novo) 1.0 Mi Total Flex 8V 4p',
	      marca:'VOLKSWAGEN',
	      price:27400.85
	   },
	   {  
	      name:'Gol (novo) 1.6 Mi Total Flex 8V 2p',
	      marca:'VOLKSWAGEN',
	      price:52058.1
	   },
	   {  
	      name:'CAPTIVA SPORT FWD 2.4 16V 171/185cv',
	      marca:'CHEVROLET',
	      price:99224.65
	   },
	   {  
	      name:'Celta Spirit 1.0 MPFI VHC 8V 5p',
	      marca:'CHEVROLET',
	      price:22374.4
	   },
	   {  
	      name:'Corsa Sed Class.Spirit 1.0/1.0 FlexPower',
	      marca:'CHEVROLET',
	      price:14657.55
	   },
	   {  
	      name:'Tucson GL 1.6 Turbo 16V Aut.',
	      marca:'HYUNDAI',
	      price:131368.85
	   },
	   {  
	      name:'Fiesta 1.5 16V Flex Mec. 5p',
	      marca:'FORD',
	      price:45229.5
	   },
	   {  
	      name:'KA 1.0 8V/1.0 8V ST Flex 3p',
	      marca:'FORD',
	      price:23289.25
   		}
	]*/
	

FILTER
------
Recapitulando, o filter serve remover valores indesejados de uma coleção, ele utiliza expressões booleanas para decidir se um elemento permanecerá ou não no array. Se o resultado da expressão for falso o item será excluído da coleção final, se a expressão for verdadeira o item será mantido. 

Os parâmetros do callback do método filter são praticamente os mesmos do callback do método map, veja um exemplo prático onde será removido da coleção final qualquer carro com valor inferior a R$ 50.000,00:

    let carrosAcimaCinquentaMil = carros.filter((element, index, array) => {
		return element.price > 50000
	})
	
	console.log(carrosAcimaCinquentaMil)
	/*[  
	   {  
	      name:'Deville/Eldorado 4.9',
	      marca:'CADILLAC',
	      price:72949.55
	   },
	   {  
	      name:'Seville 4.6',
	      marca:'CADILLAC',
	      price:64859.35
	   },
	   {  
	      name:'AMAROK CD2.0 16V/S CD2.0 16V TDI 4x2 Die',
	      marca:'VOLKSWAGEN',
	      price:115767
	   },
	   {  
	      name:'Gol (novo) 1.6 Mi Total Flex 8V 2p',
	      marca:'VOLKSWAGEN',
	      price:52058.1
	   },
	   {  
	      name:'CAPTIVA SPORT FWD 2.4 16V 171/185cv',
	      marca:'CHEVROLET',
	      price:99224.65
	   },
	   {  
	      name:'Tucson GL 1.6 Turbo 16V Aut.',
	      marca:'HYUNDAI',
	      price:131368.85
	   }
	]*/

REDUCE
------
Chegamos no meu método preferido dentre os três, o *reduce*, ela serve para agrupar, reduzir, somar, concatenar, subtrair, etc os valores de sua coleção. 

Assim como o *map* e o *filter*, o *reduce* percorrerá a coleção da esquerda para a direita e retornará um callback para cada elemento percorrido. A maior diferença entre ele e os outros dois métodos citados é que o *reduce* guarda um valor acumulativo que é incrementado a cada expressão de retorno do callback.

Quando o método percorrer todos os elementos do array, será retornado o resultado do valor acumulado. Na sintaxe da função, este valor é o primeiro argumento do callback, os outros argumentos seguem o mesmo padrão já citado, elemento atual, índice do elemento atual e representação da coleção original. Veja um exemplo simples: 

    let soma = [1,2,3,4,5,6].reduce((value, element, index, array) => {
		console.log(`acumulado: ${value}, operacao: ${value}+${element}`)
		
		value += element
		return value
	})
	
	//ordem de execução
	//acumulado: 1,   operacao: 1+2
	//acumulado: 3,   operacao: 3+3
	//acumulado: 6,   operacao: 6+4
	//acumulado: 10,  operacao: 10+5
	//acumulado: 15,  operacao: 15+6
	
	console.log(soma)
	//21

Como podemos ver na ordem de execução, o primeiro valor acumulado sempre é o primeiro índice do array, neste caso o valor *1* que está na posição *0*. Porém é possível passar um valor padrão de início caso você queira, é só passar um argumento depois do callback da função que ele será interpretado como valor inicial.

    let soma = [1,2,3,4,5,6].reduce((value, element, index, array) => {
		console.log(`acumulado: ${value}, operacao: ${value}+${element}`)
		
		value += element
		return value
	}, 0)
	
	//acumulado: 0,  operacao: 0+1
	//acumulado: 1,  operacao: 1+2
	//acumulado: 3,  operacao: 3+3
	//acumulado: 6,  operacao: 6+4
	//acumulado: 10, operacao: 10+5
	//acumulado: 15, operacao: 15+6

Vamos agora voltar para a coleção de exemplo e aplicar algumas regras mais avançadas com o reduce, imagine que você precise agrupar os carros por marca, com o reduce esta tarefa ficaria da seguinte forma: 

    let carrosPorMarca = carros.reduce((value, element, index, array) => {
		if(value[element.marca]){
			value[element.marca].push({"name": element.name, "price": element.price})
		}else{
			value[element.marca] = []
			value[element.marca].push({"name": element.name, "price": element.price})
		}
	
		return value
	}, {})


Como a coleção será agrupada por marca, o nome da marca será utilizado como "chave única" no valor acumulado.  

A primeira verificação é para certificar se já existe alguma chave no argumento *value* com o nome da marca do elemento atual como chave. Caso não exista, esta chave será criada e ela terá como valor um array com o valor do elemento atual da iteração.

Caso esta chave já exista, o valor do elemento atual apenas será adicionado no array correspondente à sua marca. A coleção final ficaria assim:
		   
    console.log(carrosPorMarca)
    /*{  
	   FIAT:[  
	      {  
	         name:'MOBI WAY on 1.0 Fire Flex 5p.',
	         price:38227
	      },
	      {  
	         name:'Oggi',
	         price:3475
	      },
	      {  
	         name:'Palio 1.0 Cel. ECON./ITALIA F.Flex 8V 4p',
	         price:26304
	      }
	   ],
	   CADILLAC:[  
	      {  
	         name:'Deville/Eldorado 4.9',
	         price:76789
	      },
	      {  
	         name:'Seville 4.6',
	         price:68273
	      }
	   ],
	   VOLKSWAGEN:[  
	      {  
	         name:'AMAROK CD2.0 16V/S CD2.0 16V TDI 4x2 Die',
	         price:121860
	      },
	      {  
	         name:'Fox 1.0 Mi Total Flex 8V 5p',
	         price:31468
	      },
	      {  
	         name:'Gol (novo) 1.0 Mi Total Flex 8V 4p',
	         price:28843
	      },
	      {  
	         name:'Gol (novo) 1.6 Mi Total Flex 8V 2p',
	         price:54798
	      }
	   ],
	   CHEVROLET:[  
	      {  
	         name:'CAPTIVA SPORT FWD 2.4 16V 171/185cv',
	         price:104447
	      },
	      {  
	         name:'Celta Spirit 1.0 MPFI VHC 8V 5p',
	         price:23552
	      },
	      {  
	         name:'Corsa Sed Class.Spirit 1.0/1.0 FlexPower',
	         price:15429
	      }
	   ],
	   HYUNDAI:[  
	      {  
	         name:'Tucson GL 1.6 Turbo 16V Aut.',
	         price:138283
	      }
	   ],
	   FORD:[  
	      {  
	         name:'Fiesta 1.5 16V Flex Mec. 5p',
	         price:47610
	      },
	      {  
	         name:'KA 1.0 8V/1.0 8V ST Flex 3p',
	         price:24515
	      }
	   ]
	}*/

Para finalizar, vamos para mais um exemplo, desta vez será necessário retornar a soma dos preços dos carros agrupados por marca, o código ficaria assim:

    let valorTotalPorMarca = carros.reduce((value, element, index, array) => {
		if(value[element.marca]){
			value[element.marca].sumPrice += element.price
		}else{
			value[element.marca] = {}
			value[element.marca].sumPrice = element.price
		}
	
		return value
	}, {})
	
	console.log(valorTotalPorMarca)
	/*
	{  
	   FIAT:{  
	      sumPrice:68006
	   },
	   CADILLAC:{  
	      sumPrice:145062
	   },
	   VOLKSWAGEN:{  
	      sumPrice:236969
	   },
	   CHEVROLET:{  
	      sumPrice:143428
	   },
	   HYUNDAI:{  
	      sumPrice:138283
	   },
	   FORD:{  
	      sumPrice:72125
	   }
	}
	*/

Deu para perceber que as possibilidades são imensas né? Você pode ainda criar verdadeiras pipelines utilizando estes métodos, filtrar, mapear e depois reduzir uma coleção em um único fluxo. Mas isto fica para outro post :).
Até a próxima!