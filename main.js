const fs = require("fs");
const { DOMParser } = require("xmldom");
const R = require("ramda");

const { isValid, elementsToArray, getGitHubProject } = require("./xmlfilter");

// Efetua o processamento do xml e armazena a estrutura no objeto 'document'
const document = new DOMParser().parseFromString(
  fs.readFileSync("res/f-droid.xml", "utf-8")
);

const isAddedAfter2018AndUpdatedAfter2019 = isValid(R.__, 2018, 2019);

const addedApps = elementsToArray(document.getElementsByTagName("application"))
  .filter(isAddedAfter2018AndUpdatedAfter2019)
  .map(getGitHubProject);

console.log(addedApps.join("\n"));

// (Exercício 1) Identifique todas as declarações de funções neste projeto
// Adicione um comentário identificando-as

/*
    Na linha 5, do arquivo "main.js", há uma declaração de variável composta por 3 CHAMADAS de 
    Funções, que são DECLARADAS no arquivo "xmlfilter.js" nas linhas 3
    (
        const contentOfTag = R.curry(
            (xmlNode, tagName) => xmlNode.getElementsByTagName(tagName)[0].textContent
        );
    ), 11 
    (
        const getGitHubProject = (xmlNode) =>
        contentOfSource(xmlNode).replace("https://github.com/", "");
    ), 14
    (
        const elementsToArray = (nodes) => {
            const arr = [];
            for (let i = 0; i < nodes.length; i++) arr.push(nodes[i]);
            return arr;
        };
    ) e 20
    (
        const isValid = R.curry((app, addedAfterYear, updatedAfterYear) => {
            if (!contentOfSource(app).includes("github.com")) return false;
        
            const addedDate = new Date(contentOfAdded(app));
            if (addedDate.getFullYear() < addedAfterYear) return false;

            const lastUpdatedDate = new Date(contentOfUpdated(app));
            if (lastUpdatedDate.getFullYear() < updatedAfterYear) return false;

            return true;
        });
    ).
*/

// (Exercício 2) Identifique quais funções no projeto possuem efeitos colaterais (side-effects)
// Adicione um comentário identificando-as

/*
    No arquivo "xmlfilter.js", a função "getGitHubProject" altera o valor da variável "xmlNode"
    ao adicionar o complemento "https://github.com/" nos locais onde a String é vazia ("");
*/

// (Exercício 3) Identifique quais funções são curried
// Adicione um comentário identificando-as

/*
    As funções curried são:

    (
        const contentOfTag = R.curry(
            (xmlNode, tagName) => xmlNode.getElementsByTagName(tagName)[0].textContent
        );
    ) e
    (
        const isValid = R.curry((app, addedAfterYear, updatedAfterYear) => {
            if (!contentOfSource(app).includes("github.com")) return false;
        
            const addedDate = new Date(contentOfAdded(app));
            if (addedDate.getFullYear() < addedAfterYear) return false;

            const lastUpdatedDate = new Date(contentOfUpdated(app));
            if (lastUpdatedDate.getFullYear() < updatedAfterYear) return false;

            return true;
        });
    ).

*/

// (Exercício 4) Identifique quais funções são high-order
// Adicione um comentário identificando-as

/*
    As funções high-order são:

    R.curry
*/

// (Exercício 5) Crie um novo arquivo main2.js (baseado no main.js) que seleciona todos as apps adicionados
// depois do ano 2000 e atualizadas em 2020. Ao imprimir as apps, além do nome, imprima
// a data que foi adicionada e a data da última atualização.

/*
    "main2.js"
*/
