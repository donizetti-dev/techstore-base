# Análise de correção: total do carrinho com preços inconsistentes

## Contexto

A regra de negócio e a especificação do projeto exigem que:

- o total do carrinho seja calculado com itens válidos e sem valores sem sentido;
- produtos sem preço definido não podem entrar como venda válida;
- a lógica de cálculo deve ficar em utilitários, conforme a organização do projeto em `src/utils/`.

As evidências estão em:

- `ENUNCIADO.md` (obrigatório 1: total do carrinho);
- `docs/specs/src-utils.md` (regra de cálculo do total do carrinho);
- `docs/api.md` (contrato da API: `price` deve ser `number`).

## Sintoma observado

Alguns itens específicos geram total inconsistente no carrinho, por exemplo:

- `Carregador Turbo` + `Copo Térmico`;
- `Camiseta Estampada` + `Tênis Casual`.

Esse comportamento só aparece em combinações específicas porque nem todos os produtos vêm com `price` no mesmo tipo na API.

## Evidência técnica

O problema está em `src/utils/carrinho.js`:

```js
export function calcularTotal(carrinho) {
  return carrinho.reduce((total, produto) => total + produto.price, 0)
}
```

A operação `total + produto.price` funciona como soma numérica apenas quando `produto.price` é `number`.

No dado real da API, alguns produtos chegam como `string`:

```json
[
  { "title": "Camiseta Estampada", "price": 49.9 },
  { "title": "Tênis Casual", "price": "189.90" },
  { "title": "Carregador Turbo", "price": "89" },
  { "title": "Copo Térmico", "price": "45" }
]
```

Quando o JavaScript encontra `+` com string, ele faz concatenação em vez de soma:

- `49.9 + "189.90"` resulta em uma string como `"49.9189.90"`;
- `"89" + "45"` resulta em `"8945"`;
- ao somar isso com `0`, o valor do total fica totalmente fora do esperado.

Esse é o motivo do bug aparecer somente para determinados produtos: o dado da API não é homogêneo.

## Causa raiz

A causa raiz não está apenas no cálculo do total, mas também no fluxo de ingestão de dados:

1. `App.jsx` recebe diretamente os produtos da API e os coloca no carrinho sem normalização;
2. `calcularTotal` assume que `produto.price` é sempre numérico;
3. a API entrega `price` como `number` para alguns produtos e como `string` para outros.

Isso viola o contrato documentado em `docs/api.md` e também a regra de negócio da especificação, que define que `price` deve ser numérico e que produtos sem preço não podem ser vendidos.

## Correção proposta

A correção deve ser feita em duas camadas:

### 1. Normalizar os dados da API ao carregar os produtos

Antes de salvar no estado, converter `price` para `Number` e descartar produtos inválidos (ou seja, sem preço ou com valor não numérico).

Exemplo de estratégia:

```js
const produtosNormalizados = dados
  .map((produto) => ({
    ...produto,
    price: Number(produto.price),
  }))
  .filter((produto) => Number.isFinite(produto.price) && produto.price > 0)
```

### 2. Tornar `calcularTotal` defensivo

Mesmo com a normalização, o utilitário deve validar cada item antes de somar:

```js
export function calcularTotal(carrinho) {
  return carrinho.reduce((total, produto) => {
    const preco = Number(produto.price)
    return Number.isFinite(preco) ? total + preco : total
  }, 0)
}
```

Esse ajuste garante que:

- itens sem preço não entrem como venda válida;
- sumas com string sejam convertidas corretamente;
- os valores no carrinho permaneçam consistentes com a regra de negócio.

## Critérios de validação

Após a correção, os testes manuais ou automáticos devem verificar:

- carrinho com `Carregador Turbo` + `Copo Térmico` calcula corretamente;
- carrinho com `Camiseta Estampada` + `Tênis Casual` calcula corretamente;
- item sem preço definido não entra no total;
- produtos com `price` em string continuam funcionando sem quebrar o fluxo.

## Observação

Este documento registra a análise sem alterar o código da aplicação. A correção deve ser implementada em uma etapa seguinte, mantendo a compatibilidade com a arquitetura atual do projeto.

## Regras de implementação
Adicione o minimo de complexidade possível
Siga somente com js e no padrão já criado
