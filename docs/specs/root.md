# Especificação da pasta raiz

## Caminho

- `.`

## Finalidade

A pasta raiz contém os arquivos de configuração, documentação e pontos de entrada do projeto. Ela define o comportamento base da aplicação e os contratos de execução.

## Funcionalidades

- iniciar a aplicação com Vite;
- configurar o ambiente do projeto React;
- manter documentação de requisitos e regras de negócio;
- centralizar a configuração da API via variável de ambiente;
- registrar o histórico de mudanças do sistema.

## Arquivos relevantes

- `package.json`: define scripts, dependências e identidade do projeto.
- `vite.config.js`: configuração do bundler Vite.
- `README.md`: instruções de execução e organização do código.
- `ENUNCIADO.md`: requisitos e itens obrigatórios da avaliação.
- `CHANGELOG.md`: histórico e alterações da loja.
- `.env`: variáveis de ambiente; em especial `VITE_API_URL`.
- `index.html`: ponto de entrada HTML da aplicação.

## Regras

1. O projeto deve rodar com Vite e React.
2. A URL da API deve ser configurada por ambiente e não hardcoded no código principal.
3. A organização da aplicação deve seguir a estrutura: páginas, componentes, serviços e utilitários.
4. A documentação técnica deve ser mantida em `docs/` e seguir as regras de negócio definidas pelo cliente.
5. Mudanças funcionais devem ser refletidas no `CHANGELOG.md` quando houver entrega relevante.
6. O projeto deve continuar compatível com a estrutura de rotas da loja.

## Invariantes

- a base da aplicação nunca deve quebrar a renderização da loja;
- qualquer novo arquivo deve respeitar a arquitetura já estabelecida;
- configurações globais devem ser feitas no nível correto e não duplicadas em módulos específicos.
