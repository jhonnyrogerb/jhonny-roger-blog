---
title: Construindo um site estático com Hugo Parte 1 - Instalação
author: Jhonny Roger
image: /img/hugologo.png
type: post
date: 2017-08-04
excerpt: Primeira parte da série de tutorias sobre o gerador de sites estáticos Hugo, abordando o processo de instação da ferramenta.
categories:
  - Geradores estáticos
  - Hugo
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

Como prometido, vou dar início a uma série de posts explicando como construir um site estático com o Hugo, começando pelo processo de instalação da ferramenta.
 
O Hugo é um gerador estático construído em Go, ou seja, ele é multiplataforma. Existem várias maneiras de se instalar o Hugo dependendo do sistema operacional,

INSTALANDO NO MODO FÁCIL
------------------------
 A maneira mais simples é baixar o arquivo compactado com os binários de acordo com a sua plataforma, extrair, adicionar o executável no PATH do sistema operacional (opcional) e pronto! 

Isso mesmo! Os binários do Hugo não tem dependências externas e não precisam necessariamente de instalação para serem utilizados, basta executar o arquivo hugo (ou hugo.exe).

Para encontrar estes binários basta ir na [página de releases](https://github.com/gohugoio/hugo/releases) do Hugo, lá você encontrará todas as versões do Hugo para todas as plataformas oficialmente suportadas. 
 
INSTALANDO COM GERENCIADORES DE PACOTES
---------------------------------------
Um outro método é instalar o Hugo através gerenciadores de pacotes, este método pode ser mais fácil ou mais complicado de acordo com a plataforma, principalmente para aquelas que não suportam gerenciadores de pacotes nativamente, mas se você já estiver acostumado com alguns destes gerenciadores vá em frente.

No MAC OS X, basta utilizar o *brew*: 

    brew install hugo

 
Já no Ubuntu-Debian basta utilizar o *apt-get* para instalar o gerador, lembrando que este método pode baixar versões desatualizadas do Hugo: 

    sudo apt-get install hugo

 
No Windows você pode baixar com o *chocolatey*:

    choco install hugo -confirm


UTILIZANDO COMANDOS DA LINGUAGEM GO
-------------------

Você ainda pode instalar o Hugo utilizando a própria linguagem go com o comando *go get*, este comando irá baixar o código fonte direto do Github, lidar com as dependências, compilar e gerar o arquivo executável no workspace do GO (*$GOPATH/bin*) de forma automática.

    go get -v github.com/gohugoio/hugo

Caso você já tenha o Go instalado e configurado em sua máquina esta pode ser uma ótima opção! 

INSTALANDO NO MODO HARD
-------------------------------------------------------

O modo raiz de se instalar o Hugo é baixar o código fonte e compilar ele você mesmo! Ok, esta não é uma tarefa muito difícil pra quem tem conhecimentos mínimos em Go mas é definitivamente a mentira mais complicada de configurar a ferramenta. Ah falando em Go, neste método ele é obrigatório, então tenha o Go instalado e configurado em sua máquina. 
 
Se você preferir compilar a versão mais atualizada o possível do Hugo, basta clonar o repositório no Github que lá já vai ter todo o código necessário, lembrando que através deste método existe o risco de você baixar versões instáveis e com bugs inesperados. Se uma versão mais estável é o que você procura, é só ir na [página de releases](https://github.com/gohugoio/hugo/releases) do Hugo é baixar a versão do código fonte que mais te agrada. 
 
Com o código baixado basta entrar na pasta raiz do código fonte,  onde se encontrar o arquivo *main.go* e digitar o seguinte comando:

    go build -o hugo main.go

 Este comando irá compilar o código fonte e gerar o executável do Hugo na mesma pasta onde o comando foi executado, agora é so adicionar o executável no $PATH do sistema e pronto! 

Por enquanto é isso, o próximo post será sobre a estrutura básica de pastas e arquivos do Hugo, além de já introduzir alguns comandos básicos e outras funcionalidades!

