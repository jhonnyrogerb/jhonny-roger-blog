---
title: Template literals, uma nova forma de se trabalhar com strings em JavaScript
author: Jhonny Roger
image: /img/template-literal.png
type: post
date: 2017-08-05
excerpt: Vamos dar uma olhada nesta feature introduzida no ES6 que pode facilitar muito o processo de manipulação de strings em javascript.
categories:
  - JavaScript
  - ES6
  - Tutorial
  - HTML
tags:
  - javascript
  - ecma
  - ecmascript
  - es6
  - template
  - template literals
  - strings
  - template strings
---

O ES6 trouxe várias novidades para a especificação do JavaScript, algumas delas já foram largamente adotadas pela comunidade e outras nem tanto.

Uma destas features novas são os template literals ou template strings, que trazem várias funcionalidades que facilitam o trabalho de criação e manipulação de strings com JavaScript, eu ja utilizo bastante esta funcionalidade em projetos back-end pois elas economizam muito código e ajudam a deixar o projeto mais limpo e legivel.

Para declarar um template literal, ao invés de usar o padrão do JavaScript que são aspas duplas *( " )* ou aspas simples *( ' )*, basta usar crases *( ` )*, veja um exemplo básico:

    let meuNome = `Meu nome é Julia`

MULTILINHAS
-----------

Strings multilinhas sempre foram um desejo da comunidade JavaScript, por padrão strings literais não podem ser declaradas em mais de uma linha e para adicionar quebras de linha é necessário trabalhar com caracteres especias e/ou concatenação.

Uma das vantagens das template strings é que ela é multilinha, ou seja, você não irá precisar adicionar mais o carácter *\n* para quebrar linha, alem de poder declarar a string em mais de uma linha sem ter que concatenar nada! Com template literal, a string produzida irá respeitar todas as quebras de linha declaradas no código.

    //String padrão
    let minhaString = 'Meu
	    Nome
		é
		Julia';
		
	console.log(minhaString);

Esta declaração irá retornar um erro, provavelmente um ' Invalid or unexpected token' porque por padrão as strings JavaScript não suportam declarações multinhas, para quebrar linha no modo comum você poderia fazer o seguinte:

    let minhaString = 'Meu\nNome\né\nJulia';
	
	console.log(minhaString);
	//Meu
	//Nome
	//é
	//Julia

Com template literals a tarefa de construir strings multilinha é bem simples, é só você quebrar linhas no código que o valor retornado irá respeitar o formato declarado, veja um exemplo:

    let minhaString = `Meu
    Nome
    é
    Julia`;
	
	console.log(minhaString)
	//Meu
	//Nome
	//é
	//Julia

  
CONCATENAÇÃO E EXPRESSÕES
------------

Concatenar valores também é uma tarefa fácil com template literals, pois com esta nova especificação foi introduzido as expressions. Estas expressões seguem uma lógica e sintaxe parecida com as expressões de template engines famosas como Ejs, Handlebars, Pug, Mustache, e são declaradas da seguinte forma ( *${expressão}* ).
Veja alguns exemplos:

Usando strings literais padrão do JavaScript

    //String padrão
    let nome = 'Julia';
    let idade = 19;
    let apresentacao = 'Meu nome é ' + nome + ' e eu tenho ' + idade + ' anos.';
	
	Console.log(apresentacao);
	//Meu nome é Julia e eu tenho 19 anos.
    
Usando expressões com template literals:

    let nome = 'Julia';
    let idade = 19;
    let apresentacao = `Meu nome é ${nome} e eu tenho ${idade} anos.`;
    
    console.log(apresentacao);
    //Meu nome é Julia e eu tenho 19 anos.

Estas expressões não só permitem que você passe variáveis com outras strings, mas também qualquer outro tipo de valor ou expressões.

    let nome = 'Julia';
    let anoNascimento = 1998;
    let anoAtual = 2017 ;
    let apresentacao = `Meu nome é ${nome} e eu tenho ${anoAtual - anoNascimento} anos.`;
	
	console.log(apresentacao);
	//Meu nome é Julia e eu tenho 19 anos.

Você pode usar com objetos e funções também! As expressões são capazes de acessar as propriedades de um objeto bem como os seus métodos.

    let pessoa = {
	    nome: `Julia`,
	    idade: `19`,
	    apresentacao() {
	        return `Meu nome é ${this.nome} e eu tenho ${this.idade} anos.`
	    }
	};
	
	console.log(pessoa.apresentacao())
	//Meu nome é Julia e eu tenho 19 anos.

Você ainda pode fazer algo desse tipo:

    let pessoa = {
	    nome: `Julia`,
	    idade: `19`,
	    apresentacao() {
	        return `Meu nome é ${this.nome} e eu tenho ${this.idade} anos.`
	    }
	};
	
	console.log(pessoa.apresentacao());
	//Meu nome é Julia e eu tenho 19 anos.

	console.log(`A ${pessoa.nome} disse: ${pessoa.apresentacao()}`);
	//A Julia disse: Meu nome é Julia e eu tenho 19 anos.


MULTILINHAS + EXPRESSÕES
------------------------

Estas duas features aliadas são ótimas para momentos em que você precisa montar pequenos fragmentos de templates HTML com strings, veja um exemplo com strings comuns:

    let nome = 'Julia';
    let idade = 19;
    var apresentacao = '<div class="person">' +
					'<h3>' + nome + '</h3>' +
					'<p> Idade: ' + idade + ' anos</p>' +
					'</div>';

    console.log(apresentacao);
    //<div class="person"><h3>Julia</h3><p> Idade: 19 anos</p></div>

Com template literals o mesmo código ficaria da seguinte forma:

    let nome = 'Julia';
    let idade = 19;
    var apresentacao = `<div class="person">
    					<h3>${nome}</h3>
    					<p> Idade: ${idade} anos</p>
    				 </div>`;

    console.log(apresentacao);
	//<div class="person">
    	<h3>Julia</h3>
    	<p> Idade: 19 anos</p>
      </div>
      
Bem legal não? Quem ai nunca ficou perdido quando pegou um código cheio de concatenação de strings? Com template literals o código fica bem mais curto e legível, alem de respeitar as quebras de linha. 

ANINHANDO TEMPLATES, LOOPS E CONDICIONAIS
-----------------------
Uma feature que ajuda as template strings ficarem ainda mais incríveis para a construção de micro templates HTML é a possibilidade de aninhar um template dentro do outro. 

Imagine um caso onde você tenha um array e queira criar uma lista HTML com cada índice deste array? Você poderia fazer algo parecido com este exemplo: 

    const person = {
		name: 'Julia',
		idade: 19,
		telefones: [
			{ddd: '16', numero: '9999-9991'},
			{ddd: '19', numero: '9999-9992'},
			{ddd: '11', numero: '9999-9993'}
		]
	}

	function templatePerson(person){
		return `
		<div class="person">
			<h3>${person.name}</h3>
			<p>Idade: ${person.idade} anos</p>
			<p>Telefones</p>
			<ul>
			${person.telefones.map(telefone => `
				<li>(${telefone.ddd}) ${telefone.numero}</li>
				`).join('')}
			</ul>
		</div>`
	};

	console.log(templatePerson(person))
	/*<div class="person">
	<h3>Julia</h3>
		<p>Idade: 19 anos</p>
		<p>Telefones</>
		<ul>
			<li>(16) 9999-9991</li>
			<li>(19) 9999-9992</li>
			<li>(11) 9999-9993</li>
		</ul>
	</div>
	*/

Eu estarei explicando melhor a função map em outro post, mas neste caso ela retornara um array com todos os itens da lista em HTML *&lt;li&gt;*, a função join está ali para evitar que as virgulas do array apareçam no HTML gerado pelo template.

E as condicionais? Bem a melhor forma de se trabalhar com template strings e condicionais é com condições ternarias, sim aquelas expressões inline com aquela sintaxe "condição ? true : false", ou seja, se a condição for verdadeira o valor assumido será o que esta antes dos dois pontos se a condição for falsa o resultado será o que esta depois dos dois pontos. Veja um exemplo:

    const person = {
		name: 'Julia',
		idade: 19,
	}

	function templatePerson(person){
		return `
		<div class="person">
			<h3>${person.name}</h3>
			<p>Idade: ${person.idade} anos</p>
			<p>Esta pessoa é: ${person.idade > 18 ? `maior de idade`: `menor de idade`}</p>
		</div>`
	};
	
	console.log(templatePerson(person))
	/*<div class="person">
		<h3>Julia</h3>
		<p>Idade: 19 anos</p>
		<p>Esta pessoa é: maior de idade</p>
	</div>
	*/

Uma pratica mais legal seria reutilizar templates, voltando um pouco nos exemplos anteriores você poderia pegar a lista de telefones e transformar ela em um template independente ao invés de aninhar no template de pessoas. 

Isto criaria a possibilidade de você reutilizar este template de listas em várias outras partes de sua aplicação.

    const person = {
		name: 'Julia',
		idade: 19,
		telefones: [
			{ddd: '16', numero: '9999-9991'},
			{ddd: '19', numero: '9999-9992'},
			{ddd: '11', numero: '9999-9993'}
		]
	}

	function templatePhoneList(telefones){
		return `<ul class="phones">
		${telefones.map(telefone => `
			<li>(${telefone.ddd}) ${telefone.numero}</li>
			`).join('')}
		</ul>`
	}

	function templatePerson(person){
		return `
		<div class="person">
			<h3>${person.name}</h3>
			<p>Idade: ${person.idade} anos</p>
			<p>Telefones</p>
			${templatePhoneList(person.telefones)}
		</div>`
	};

	console.log(templatePerson(person))
	/*<div class="person">
	<h3>Julia</h3>
		<p>Idade: 19 anos</p>
		<p>Telefones</>
		<ul class="phones">
			<li>(16) 9999-9991</li>
			<li>(19) 9999-9992</li>
			<li>(11) 9999-9993</li>
		</ul>
	</div>
	*/

 

USOS AVANÇADOS
--------------

A forma avançada de se usar template literals é utilizando as *Tagged Template Literals* que são basicamente funções que permitem manipular e controlar melhor a saída de um template. 
A sintaxe basica é a seguinte:

    function alteraTemplate(strings, ...values) {
	    ...
	    ...
	    return ...
 	};
	
	let apresentação = alteraTemplate`Meu nome é ${nome} e eu tenho ${idade} anos.`;

Estas funções recebem dois parâmetros, o primeiro deles é o *strings*  que corresponde a um array com todas as strings literais de um template, as posições desse array serão definidos por seguimentos de strings separados pelas expressões do template literal, ficou um pouco confuso? Veja este exemplo:

    let nome = 'Julia';
	let idade = 19;

    `Meu nome é ${nome} e eu tenho ${idade} anos.`
    //exemplo do array correspondente ao parâmetro strings 
    [ 'Meu nome é ', ' e eu tenho ', ' anos.' ]

O segundo parâmetro é o *...values*, que é um array contendo os valores de todas as expressões passadas no template, exemplo:

    let nome = 'Julia';
	let idade = 19;

    `Meu nome é ${nome} e eu tenho ${idade} anos.`
    //exemplo do array correspondente ao parâmetro ...values 
    [ 'Julia', 19 ]

Agora vamos a alguns exemplos práticos, imagine que você queira criar uma regra para adicionar as tags &lt;b&gt; ou &lt;i&gt; para destacar cada expressão passada em um determinado template, você poderia fazer o seguinte: 

	let nome = 'Julia';
	let idade = 19;

	function bold(strings, ...values) {
		let temp = strings.slice();

		values.forEach((string, i) => {
			temp[i] = `${temp[i]}<b>${values[i]}</b>`;
		})
		
		return temp.join('');
	};

	function italic(strings, ...values) {
		let temp = strings.slice();
		
		values.forEach((string, i) => {
			temp[i] = `${temp[i]}<i>${values[i]}</i>`;
		})

		return temp.join('');
	};

	let apresentacaoBold = bold`Meu nome é ${nome} e eu tenho ${idade} anos.`;
	let apresentacaoItalic = italic`Meu nome é ${nome} e eu tenho ${idade} anos.`;

	console.log(apresentacaoBolder);
	//Meu nome é <b>Julia</b> e eu tenho <b>19</b> anos.

	console.log(apresentacaoItalic);
	//Meu nome é <i>Julia</i> e eu tenho <i>19</i> anos.

Estes exemplos são bem simples e não arranham nem a superfície das inúmeras possibilidades que os tagged template literals oferecem, esta é uma funcionalidade muito poderosa para criar templates dinâmicos com JavaScript.