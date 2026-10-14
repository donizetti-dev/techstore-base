# Especificação da pasta src

## Caminho

- `src/`

## Finalidade

A pasta `src/` contém a aplicação React principal, incluindo rotas, layout global e integração com as páginas, componentes, serviços e utilitários.

## Funcionalidades

- renderizar a aplicação dentro de `BrowserRouter`;
- manter estado global do carrinho e do cliente selecionado;
- carregar produtos e clientes na inicialização;
- orquestrar navegação entre loja, produto, carrinho e área interna;
- fornecer layout global com cabeçalho, rodapé e rolagem automática ao trocar rota.

## Arquivos relevantes

- `main.jsx`: bootstrap da aplicação.
- `App.jsx`: definição das rotas e estado global.

## Regras

1. A aplicação deve usar roteamento para as páginas principais do sistema.
2. O estado do carrinho deve ser compartilhado entre as páginas e atualizado ao longo da navegação.
3. A seleção do cliente atual deve ser persistida no momento de renderização e usada em regras de cupom e contexto.
4. A página deve mostrar loading e erro de carregamento enquanto os dados chegam.
5. A funcionalidade de adicionar ao carrinho deve ser feita por fluxo centralizado e reutilizável.

## Invariantes

- uma rota não pode modificar o estado de outra sem passar pela lógica central;
- produtos e clientes devem carregar antes de renderizar fluxos dependentes;
- a UI global deve continuar consistente entre páginas.
