# Contrato da API

Última atualização: outubro de 2026

A URL base fica na variável `VITE_API_URL`.

## Observações de compatibilidade

A aplicação faz normalização de preços antes de calcular o total do carrinho, pois alguns produtos podem vir da API com valores em texto. Itens sem valor válido devem ser bloqueados para evitar inconsistências na compra.

Produtos com estoque zerado continuam presentes no catálogo interno e podem ser acessados por URL de detalhe, mas a loja oculta esses itens na vitrine para o cliente.

## GET /products.json

Retorna a lista de produtos do catálogo.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string | Identificador do produto |
| `title` | string | Nome do produto |
| `price` | number | Preço atual. Em alguns casos pode chegar em texto e precisa ser normalizado no front-end. |
| `precoOriginal` | number | Preço antes da promoção. Presente só nos produtos em promoção |
| `category` | string | `roupas`, `eletronicos`, `acessorios` ou `casa` |
| `description` | string | Descrição do produto |
| `image` | string | URL da imagem |
| `rating` | object | `{ rate: number, count: number }` |
| `estoque` | number | Unidades disponíveis |

## GET /customers.json

Retorna os clientes cadastrados.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string | Identificador do cliente |
| `nome` | string | Nome completo |
| `email` | string | E-mail |
| `pedidosAnteriores` | number | Quantidade de pedidos já feitos na loja |
| `clienteTeste` | boolean | Indicador de cliente de teste para validação de regras e fluxos internos |
