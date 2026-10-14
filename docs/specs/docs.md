# Especificação da pasta docs

## Caminho

- `docs/`

## Finalidade

A pasta `docs/` guarda a documentação formal do produto e do contrato da aplicação. Ela é a principal fonte de verdade para regras e requisitos.

## Funcionalidades

- registrar regras de negócio;
- descrever requisitos de funcionalidade da TechStore;
- documentar a API do sistema;
- servir de base para bots e agentes que precisam de contexto para atuar em spec-driven workflows.

## Documentos relevantes

- `api.md`: contrato da API.
- `regras-de-negocio.md`: regras gerais da loja.
- `requisitos.md`: requisitos funcionais esperados.

## Regras

1. Qualquer funcionalidade nova deve ser validada contra a documentação existente.
2. Regras de negócio do produto têm precedência sobre comportamento improvisado.
3. Alterações nos campos, endpoints ou contratos de dados devem ser refletidas em `api.md`.
4. Qualquer nova regra comercial deve ser adicionada em `regras-de-negocio.md`.
5. O doc de requisitos deve continuar alinhado com a experiência real da loja.

## Invariantes

- a documentação não deve contradizer o código;
- requisitos e regras devem ser interpretados como contratos de produto;
- qualquer mudança de regra comercial ou de API precisa ser formalizada antes da implementação.
