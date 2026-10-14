# Especificação do projeto TechStore

Este diretório reúne as especificações por pasta do projeto, com foco em regras de negócio, responsabilidades de cada módulo e invariantes que devem ser preservados por qualquer alteração.

## Índice

- [root.md](./root.md)
- [src.md](./src.md)
- [src-components.md](./src-components.md)
- [src-pages.md](./src-pages.md)
- [src-services.md](./src-services.md)
- [src-utils.md](./src-utils.md)
- [docs.md](./docs.md)

## Objetivo do spec

- documentar funcionalidade de cada área do código;
- deixar explícitas as regras de negócio;
- servir como base para revisão, testes e manutenção;
- padronizar a linguagem entre humanos e bots em um fluxo spec-driven.

## Regras gerais do projeto

1. A loja deve continuar funcionando sem quebrar experiências já existentes.
2. O código deve respeitar a organização proposta pelo projeto: páginas, componentes, serviços e utilitários.
3. Produtos sem preço não podem ser vendidos.
4. Produtos esgotados devem ser bloqueados de compra, mas podem continuar exibidos em alguma página interna ou fluxo de avisos.
5. Cupons e descontos precisam obedecer às regras de cliente e estoque.
6. Qualquer novo recurso deve manter compatibilidade com a estrutura atual de rotas e renderização.
