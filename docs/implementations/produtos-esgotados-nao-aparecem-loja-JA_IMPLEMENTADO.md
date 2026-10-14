# Implementação: produtos esgotados não aparecem na loja

## Contexto

A regra de negócio solicitada determina que produtos com `estoque === 0` não devem ser exibidos no catálogo principal da loja.

As evidências do projeto apontam para a listagem pública da vitrine em `src/pages/Loja.jsx`, enquanto a área interna de estoque em `src/pages/Estoque.jsx` continua responsável por mostrar o estado real de cada item, incluindo esgotados.

## Causa raiz

A listagem da loja era montada apenas com filtro de categoria, sem considerar `estoque`:

```js
useEffect(() => {
  if (categoria === 'todas') {
    setProdutosVisiveis(produtos)
  } else {
    setProdutosVisiveis(produtos.filter((produto) => produto.category === categoria))
  }
}, [categoria, produtos])
```

Esse trecho incluía todos os produtos do catálogo, mesmo aqueles sem unidades disponíveis.

## Ajuste implementado

A correção foi aplicada no ponto mais simples e compatível com a arquitetura atual: a listagem da vitrine agora aplica o filtro de disponibilidade antes da renderização.

```js
useEffect(() => {
  const produtosDisponiveis = produtos.filter((produto) => produto.estoque > 0)

  if (categoria === 'todas') {
    setProdutosVisiveis(produtosDisponiveis)
  } else {
    setProdutosVisiveis(produtosDisponiveis.filter((produto) => produto.category === categoria))
  }
}, [categoria, produtos])
```

## Por que esse ponto?

- a regra é específica da loja pública;
- a área de estoque precisa continuar mostrando todos os itens para controle interno;
- a solução reaproveita a lógica existente de categoria e de renderização.

## Critérios de validação

- produtos com `estoque === 0` não aparecem na vitrine;
- categorias continuam funcionando normalmente;
- produtos com estoque positivo continuam visíveis;
- nenhuma dependência foi adicionada;
- a mudança segue o padrão de simplicidade do projeto.

## Observação

A alteração foi mantida mínima para respeitar o padrão do código atual e evitar complexidade desnecessária.

## Regressão detectada: rota de produto esgotado

O ponto crítico da regra não é a renderização da loja em si, mas o comportamento da rota de detalhe do produto.

### Sintoma

Quando a visibilidade de produtos esgotados é tratada no ponto errado, a rota `/produto/:id` deixa de encontrar o item mesmo que ele exista no backend e ainda esteja registrado no catálogo interno.

### Local do problema

O problema aparece quando a regra de "não exibir" é aplicada no dado base usado por toda a aplicação, em vez de ser aplicada somente na listagem pública.

Os pontos relevantes são:

- `src/pages/Loja.jsx`: lista pública da loja, lugar correto para filtrar itens indisponíveis;
- `src/pages/PaginaProduto.jsx`: busca pelo produto pela URL; deve continuar funcionando mesmo quando o item estiver esgotado;
- `src/App.jsx`: centraliza o carregamento dos produtos e deve manter o catálogo completo para lookup por rota.

### Causa raiz

O erro acontece quando o filtro de `estoque === 0` é aplicado antes da leitura da URL, por exemplo no estado global de produtos ou em um `filter` que sobrescreve a fonte de dados completa.

Nesse caso, o código de detalhe passa a receber uma lista incompleta e o `find` da rota não encontra o produto:

```js
const produto = produtos.find((item) => item.id === id)
```

Se `produtos` já foi filtrado para remover esgotados, o detalhe não abre mais, mesmo que o produto exista e o cliente tenha chegado por URL direta.

### Regra correta

A exclusão de produtos esgotados deve ocorrer apenas na visibilidade da loja, sem afetar:

- o endpoint de busca por produto;
- a rota de detalhe via URL;
- a manutenção do catálogo interno para controle de estoque e avisos de reposição.

Em outras palavras: esconder da loja não significa remover o produto do sistema.

### Correção planejada

A próxima correção deve manter o conjunto completo de produtos em `App.jsx` (ou na fonte de dados) e aplicar o filtro somente na renderização da página de loja. A página de produto deve continuar acessível por URL, mostrando o item esgotado como estado especial, sem quebrar o fluxo do cliente.
