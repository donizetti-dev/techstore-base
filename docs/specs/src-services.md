# Especificação da pasta src/services

## Caminho

- `src/services/`

## Finalidade

Os serviços são responsáveis por buscar dados externos e encapsular a comunicação com a API.

## Módulos

### api.js
- centraliza a comunicação com o backend via `fetch`;
- usa a variável `VITE_API_URL` como base da API;
- valida status HTTP antes de devolver os dados;
- lança erro em caso de falha de requisição.

### produtos.js
- expõe a função `buscarProdutos()`;
- consulta `GET /products.json`;
- retorna o catálogo completo de produtos.

### clientes.js
- expõe a função `buscarClientes()`;
- consulta `GET /customers.json`;
- retorna os clientes cadastrados para simulação e regras de cupom.

## Regras

1. Toda requisição externa deve passar pelos serviços e não direto do componente.
2. Falhas na API devem ser tratadas no nível de aplicação e exibidas ao usuário.
3. A camada de serviço deve devolver dados no formato esperado pelo contrato da API.
4. Novos dados externos devem seguir a estrutura documentada em `docs/api.md`.

## Invariantes

- o serviço não deve manipular UI;
- o serviço deve manter a resposta em formato bruto para processamento posterior;
- qualquer nova API deve seguir o mesmo padrão de `get(caminho)` e tratamento de status HTTP.
