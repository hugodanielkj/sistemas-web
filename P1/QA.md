## Parte 1 - Introducão

> **Q**: Cite a diferenca entre Internet e Web.
> **R**:

> **Q**: Como a internet consegue ser tolerante a falhas?
> **R**:

> **Q**: De exemplos de aplicacao que usam a internet, mas não são a Web.
> **R**:

> **Q**: Quais os três pilares da Web?
> **R**:

> **Q**: Quais os principais códigos de resposta do HTTP e o que eles significam?
> **R**:

> **Q**: O que significa um método HTTP ser idempotente? Quais são idempotentes?
> **R**:

> **Q**: O que é armazenado no header de uma requisicão HTTP?
> **R**:

> **Q**: HTTP é stateless? Explique.
> **R**:

> **Q**: Como HTTPS garante seguranca?
> **R**:

> **Q**: O que é "host" no cabecalho de uma requisicão HTTP? Para que serve?
> **R**:

## Parte 2 - HTML

> **Q**: O que significa HyperText?  
> **R**:

> **Q**: Quais informacões são armazenadas no head do HTML?
> **R**:

> **Q**: Para que serve a tag !DOCTYPE html?
> **R**:

> **Q**: Por que indicar lang="pt-BR"?
> **R**:

> **Q**: Para que serve a tag link e onde ela fica?
> **R**:

> **Q**: Para que serve a tag label?
> **R**:

> **Q**: Por que colocar method="x" em form se isso seria responsabilidade do javascript?
> **R**:

> **Q**: Quais as diferencas entre radio button, checkbox e select?
> **R**:

> **Q**: Como são usados div e span na prática?
> **R**:

> **Q**: Qual a diferenca dos atributos id e class de umas tag?
> **R**:

## Parte 3 - CSS (Incompleto - Media Queries)

> **Q**: O que é um seletor?
> **R**:

> **Q**: Como usar CSS inline (direto no HTML)?
> **R**:

> **Q**: Quando usar CSS interno faz sentido?
> **R**:

> **Q**: Como referenciar um id e uma class no CSS?
> **R**:

> **Q**: Cite o formato da Box Model do HTML.
> **R**:

> **Q**: Explique o funcionamento de display e todas as propriedades.
> **R**:

Consulta de propriedades do CSS:
- text-align: alinhamento horizontal do conteúdo, não linha a box
- box-sizing: "content-box" é o padrão, define width e height baseado apenas no content-box, enquanto "border-box" define width e height baseado na caixa inteira.
- display: block, inline, inline-block, none, grid, flexbox
- button:hover: cursor sobre o alinhamento, da para mudar background-color, por exemplo

## Parte 4 - JavaScript

> **Q**: Em quais ambientes JavaScript pode ser executado? Como ele é executado nesses ambientes?
> **R**:

> **Q**: Onde o JavaScript deve ser linkado no HTML para ser otimizado?
> **R**:

> **Q**: Como usar um código JavaScript para HTML e outro para CSS?
> **R**:

> **Q**: Como alterar os atributos de uma tag do HTML? E como criar atributos?
> **R**:

> **Q**: Como funciona addEventListener()? Qual a pegadinha para escrever seus parametros?
> **R**:

> **Q**: Por que não usar onclick no HTML?
> **R**:

> **Q**: Qual a diferenca de fazer addEventListener(submit, function(){}) e addEventListener(submit, function(event){})
> **R**:

> **Q**: Para que serve event?
> **R**:

> **Q**: Como criar novos elementos HTML na página via JavaScript?
> **R**:

> **Q**: Faca o passo de passo de uma aplicacao dado um espaco de input, a cada clique em uma botao o valor do input aparece escrito na tela com uma formatacao especifica (ex:cor de fundo verde)
> **R**:

> **Q**:
> **R**:

> **Q**:
> **R**:

> **Q**:
> **R**:

Glossário:
- querySelector
- addEventListener
- event()
- event.preventDefault()
- alert()
- textContent = 
- innerHTML = 
- classList.add() : adiciona uma classe a algum objeto que a chama
    exemplo: document.querySelector("h1").classList.add("titulo");
    no css, haveria: .titulo {color=red;font-size=20px;}
- classList possui funcoes .add() .toggle() .remove() .contains(), .toggle() se tiver o parametro remove, se nao tiver adiciona
- createElement()
- append()