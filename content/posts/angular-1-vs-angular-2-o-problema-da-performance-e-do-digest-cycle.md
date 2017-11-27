---
title: "Angular 1 vs Angular 2: O problema da Performance e do Digest Cycle"
author: Jhonny Roger
image: /img/upgrading-to-angular2-with-ng-upgrade.jpg
type: post
date: 2017-11-11
excerpt: Neste post falaremos sobre alguns dos problemas que fizeram com que a Google promovesse uma enorme mudança do AngularJS para o Angular 2, 4+
categories:
  - JavaScript
  - Angular
tags:
  - JavaScript
  - anglar
  - algularjs
  - angular1
  - angular-1
  - angular 2
  - angular-2
  - angular2
  - tyopescript
  - angular 4
  - angular-4
  - angular4
---

As mudanças do Angular 1 para o Angular 2+ ainda geram muita confusão na comunidade. Geralmente a primeira das dúvidas é referente ao o nome, sempre que se referir a versão 1.x do framework o correto é AngularJS, para as versões 2+ é apenas Angular. 

Apesar de compartilharem o mesmo time e até ter nomes "parecidos", os dois frameworks são completamente diferentes! Por esse motivo não é tão correto assim chamar o Angular de uma "nova versão" do AngularJS. Não foi só a sintaxe que mudou, a filosofia, o funcionamento básico, as ferramentas para se trabalhar tudo foi refeito do zero e praticamente não existe compatibilidade entre os dois. 

Enquanto o foco do AngularJS era construir SPA's com two-way data binding focando no uso extensivo de controllers, $scopes, etc, com o Angular o ecossistema é voltado para construção de web components e diretivas com uma abordagem mais unidirecional.

Mas afinal de contas, qual é o motivo de toda esta mudança de foco? Bem essa é uma outra dúvida que muita gente tem, e a resposta mais curta é que o AngularJS tinha muitos problemas. Eles vão desde algumas péssimas decisões de design de API até alguns contratempos com a sintaxe, mas sem dúvida nenhuma o principal dos problemas era a performance.

Neste artigo, esclarecerei algumas das causas destes problemas de performance e o porquê este provavelmente foi um dos principais motivos para o time da Google ter mudado completamente a direção do seu Framework.


O PROBLEMA COM O TWO-WAY DATA BINDING
------------------------------------

O *two-way data binding* era sem dúvidas o maior “selling point” do AngularJS, todo mundo ficava impressionado ao ver todas as alterações na camada de modelo refletindo automaticamente na view e vice-versa. 
 
O problema é que toda esta mágica tinha seu preço, e neste caso, o preço a se pagar era a performance. Mas para entender melhor porque a implementação de two-way data binding do AngularJS era tão problemática, nós temos que conhecer primeiro o mecanismo por trás dele, o *Digest Process*. 

Vamos tomar este exemplo como base para a nossa explicação:

	<-- index.html -->
	<!DOCTYPE html>
	<html>
	<head>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.12/angular.min.js"></script>
		<script type="text/javascript" src="app.js"></script>
	</head>
	<body>
	    <div ng-app="myApp">
	        <div class="container" ng-controller="Controller1">
	            <h1>Controller 1</h1>
	            Nome: <input type="text" name="nome" ng-model="name">
	            <p>Nome: {{name}}</p>
	        </div>

	        <hr>

	        <div class="container" ng-controller="Controller2">
	            <h1>Controller 2</h1>
	            Nome: <input type="text" name="nome" ng-model="name">
	            <p>Nome: {{name}}</p>
	        </div>
	    </div>
	</body>
	</html>

	<!-- app.js -->
	angular.module('myApp', [])
	.controller("Controller1", ["$scope", function($scope) {
		$scope.name = "Jhonny"
	}])

	.controller("Controller2", ["$scope", function($scope) {
	  
	}])

Resultado:

![exemplo parte 1](/img/g1-a1xa2.gif)

## ENTENDENDO O DIGEST PROCESS

A menor parte do processo de *digest* são os *watchers*, eles são funções que tem como responsabilidade verificar se o valor de um componente foi modificado ou não, comparando o seu estado atual com o seu estado anterior. Caso ocorra alguma mudança, este componente é marcado como *dirty* ou "sujo" traduzindo ao pé da letra, este mecanismo é chamado de *dirty checking*. 

Existem algumas situações onde um *watcher* é criado, o primeiro deles acontece toda vez que uma variável de escopo for declarada em seus templates, um segundo caso é quando a função *$watch* é utilizada.

Gatilhos para a criação de *watchers*:

- $scope.$watch
- {{ }} bindings
- Maioria das diretivas (ng-show, ng-model, ng-if)
- Variaveis de escopo $scope.foo = "bar"
- Filters {{ value | myFilter }}
- ng-repeat

Voltando no nosso exemplo base, o AngularJS designaria dois *watchers* no *Controller1*:

		
		Nome: <input type="text" name="nome" ng-model="name"> <!-- (ng-model="name")-> Primeiro watcher -->
	    <p>Nome: {{name}}</p> // <!-- ({{name}}) Segundo watcher -->

Caso existisse alguma chamada do método *$watch* em nosso *controller*, um novo *watcher* também seria criado.

	    <!-- app.js -->
		angular.module('myApp', [])
		.controller("Controller1", ["$scope", function($scope) {
			$scope.name = "Jhonny";

			$scope.age = 10; //Não cria um novo watcher

			$scope.$watch('gender', function(oldValue, newValue){
    			//...do something
  			}) //Cria um novo watcher

		}])

*Note que os watchers são criados apenas nas situações já citadas. Variáveis de escopo que não realizam binding ou que não estão sendo observadas pelo método $watch não criarão novos watchers.*

Todos os *watchers* ficam atrelados aos seus respectivos escopos por meio de uma lista, a *watch list*. Cada *$scope* (incluindo o *$rootScope*) tem sua própria *watch list*, o esquema dos nossos exemplos até agora ficaria da seguinte forma:

![exemplo watch lists](/img/watchlists.png)

Sempre que o AngularJS, dentro de seu contexto, detectar alguma ação de input, chamada manual dos métodos $apply/$digest ou algum outro tipo de evento que potencialmente poderá alterar os valores dos componentes ele irá disparar o *digest process/cycle*.

Gatilhos para iniciar *Disgest cycle*:

- Açoes do usuarios (ng-click etc)
- ng-change
- ng-model
- Chamadas $http
- Prommisses $q 
- $timeout
- $interval
- Chamadas manuais dos métodos $scope.apply e $scope.digest

O *digest process* basicamente percorrerá uma *watch list* e executará cada um dos seus *watchers* procurando por modificações. Uma vez que todas as alterações de estados foram detectadas elas finalmente serão notificadas para que o AngularJS aplique as modificações na View/DOM.

![exemplo watch lists](/img/watchlist-loop.png)

Acontece que o Angular não considera cada ciclo como um ciclo puro, pois um *digest cycle* pode causar efeitos colaterais em outras variáveis de escopo (Para entender melhor o que é uma função pura, dê uma olhada na minha série de posts sobre programação funcional).  

Por este motivo o *digest process* será executado no **mínimo 2 vezes**, e no **máximo de 10 vezes** em uma *watch list*, se por um acaso ainda existirem mudanças após a décima verificação, o AngularJS encerrará o processo e irá disparar um erro, pois ele assumirá que seu código entrou em algum tipo de loop infinito. 

Para exemplificar melhor esta situação, veja o exemplo abaixo:

	    <!-- app.js -->
		angular.module('myApp', [])
		.controller("Controller1", ["$scope", function($scope) {
			$scope.a = 5;
			$scope.b = 4;

			$scope.$watch('a', function(oldValue, newValue)	{
    			if(oldValue !== newValue){
    				$scope.b = $scope.a + 7
    			}
  			})
		}])

![exemplo watch lists](/img/watchlist-loop-2.png)

*Quando o valor de $scope.a for alterado, ao final do primeiro ciclo de verificação o valor de $scope.b também terá sido alterado por causa da função $watch. Por esta falta de "pureza" o digest process tem que realizar múltiplas checagens antes de confirmar todas as alterações para que AngularJS atualize corretamente a View/DOM*. 
 
Esta falta de pureza também afeta a árvore de *$scopes*, veja este exemplo: 

	    <!-- app.js -->
		angular.module('myApp', [])
		.controller("Controller1", ["$scope" "$rootScope", function($scope, $rootScope) {
			$scope.a = 5;
			$scope.b = 4;

			$scope.$watch('a', function(oldValue, newValue)	{
    			if(oldValue !== newValue){
    				$rootScope.c = $scope.b + 9;
    			}
  			})
		}])

Neste exemplo, qualquer alteração na variável *$scope.a* também afetará o valor da variável "$rootScope.c", ou seja, uma alteração no escopo filho está criando efeitos colaterais no escopo pai. 

Para resolver este problema, o AngularJS faz com a execução do *digest process* percorra toda a arvore de *$scopes*, começando pelo *$rootScope* e passando pelos seus filhos, netos, etc. Para cada um desses escopos, todo o processo que nós discutimos até agora será executado novamente.

Sendo assim, a view só será atualizada quando o *Digest Process* verificar as *watch lists* de cada *$scope* de uma single page no mínimo duas vezes até confirmar todas alterações. Acho que já deu pra começar a imaginar de onde vem os problemas de performances não é...

## PROBLEMAS E LIMITAÇÕES

Agora que nós já sabemos o funcionamento básico do mecanismo que move a implementação de two-way data binding do AngularJS, nós já podemos discutir o porquê dele ter limitações e problemas com performance.

O primeiro problema eu acho que ficou muito claro, a quantidade de verificações que o *digest cycle* realiza a cada execução. Em aplicações menores o impacto não é tão grande (apesar de ainda poder existir), mas em  seu auge, o AngularJS quase sempre era usado em grandes aplicações e que tinham como um dos principais pontos chave a escalabilidade.

Uma app complexa poderia ter páginas com centenas ou milhares de *watchers*, sendo que todas as ações simples, como por exemplo, o preenchimento de um campo de um formulário, poderia disparar uma cascata gigantesca e imprevisível de eventos que usariam muitos recursos do browser de forma "desnecessária".

Apenas imagine uma página com 1.500 *watchers*, o simples ato do usuário digitar o seu nome em uma caixa de texto iria disparar no mínimo 3.000 eventos, e no pior dos casos, 15.000 eventos para cada caractere válido digitado!

Quanto às limitações, a documentação do AngularJS não recomenda mais que 2000 *watchers* por single page para garantir a performance. Porém este número vai depender mais da complexidade dos elementos que você está "observando" do que da quantidade de *watchers* em si... Dois Arrays/Objetos muito grandes e/ou complexos, com toda certeza terão mais impacto na performance do que cinquenta strings simples.

Tem aqueles que dizem que a culpa não era do AngularJS mas sim dos desenvolvedores que não sabiam utilizar ele corretamente, mas nesse caso eu tendo a discordar, pois o framework era e ainda é muito permissivo a este tipo de falhas. Até desenvolvedores experientes poderiam cair facilmente em armadilhas que acabariam gerando um grande número de *watchers*. 
 
 
Existem tweaks, truques, gambiarras para escalar melhor uma aplicação AngularJS? Sim existe, inclusive com uma simples busca no google pelo termo “AngularJS performance issues” você encontrará milhares de threads do StackOverflow com pessoas que já tiveram dor de cabeça com problemas de performance no AngularJS, e o que elas fizeram para tentar solucionar o problema. 
 
 
## MAS E O TAL DO ANGULAR SEM O "JS"
 
 
Atualmente o Angular está na versão 4, minha intenção não era trazer muito dele neste post porque o importante era explicar porque os problemas de performance do AngularJS provavelmente influenciaram muito na decisão de mudança completa de foco para o Angular 2+.  
 
 
Também não caberia muito comparações porquê... não tem como comparar um com o outro diretamente, são realmente universos bem distintos. Eu estarei explicando melhor o que é o Angular 2+, onde ele vive, do que ele se alimenta em um próximo post. 
 
 
Até a Próxima! 


