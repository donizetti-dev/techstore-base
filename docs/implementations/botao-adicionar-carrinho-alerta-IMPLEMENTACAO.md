# Implementação: alerta ao adicionar ao carrinho

## Contexto

A tarefa A do Grupo 1 do ENUNCIADO.md relata que o botão de adicionar ao carrinho não dá retorno claro ao cliente. Em vários casos, o usuário clica mais de uma vez porque não há confirmação visual ou de navegador após o clique, e a loja acaba com múltiplas unidades do mesmo item no carrinho.

## Causa raiz

A ação principal de compra estava sendo executada em `src/App.jsx` com a atualização de estado baseada no valor antigo do carrinho:

```js
setCarrinho(carrinho.concat(produto))
```

Esse padrão usa uma variável fechada pelo escopo da renderização atual. Quando o cliente clica rapidamente repetidas vezes antes da próxima renderização, o React pode processar todas as ações com o mesmo estado anterior e adicionar o produto várias vezes.

Além disso, não havia nenhum alerta de confirmação, então o cliente não tinha garantia de que o clique foi registrado pela interface.

## Correção

1. A atualização do carrinho passou a usar a forma funcional do estado:

```js
setCarrinho((atual) => atual.concat(produto))
```

2. A mesma abordagem foi aplicada à remoção de uma unidade, para manter consistência com a mesma regra de estado em re-renderizações rápidas.

3. Foi adicionado um alerta de confirmação no navegador:

```js
if (typeof window !== 'undefined' && produto?.title) {
  window.alert(`${produto.title} adicionado ao carrinho.`)
}
```

## Resultado esperado

- o clique no botão registra a compra corretamente;
- o cliente recebe confirmação imediata;
- cliques repetidos em sequência não geram duplicação por estado obsoleto;
- a solução continua compatível com as outras telas que usam a mesma ação central de carrinho.

## Regras de implementação

- manter a lógica no componente principal do app, conforme a organização do projeto;
- evitar alteração de comportamento fora do fluxo de adição ao carrinho;
- usar JavaScript e React no padrão já adotado pela aplicação.
