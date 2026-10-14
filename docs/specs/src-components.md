# Especificação da pasta src/components

## Caminho

- `src/components/`

## Finalidade

A pasta de componentes reúne blocos reutilizáveis da interface, com foco em consistência visual e regras de apresentação compartilhadas.

## Componentes

### Header
- exibe faixa promocional;
- mostra logo e navegação principal;
- apresenta saudação com o nome do cliente atual;
- linka para o carrinho.

### Footer
- contém marca, atendimento e área interna;
- oferece seletor de cliente de teste para simular navegadores diferentes.

### ProdutoCard
- renderiza imagem, título, avaliação e preço;
- mostra selo de frete grátis quando o valor do produto for acima de R$ 100;
- mostra selo de esgotado quando `estoque === 0`;
- desabilita o botão de compra quando o produto está esgotado;
- leva para a página do produto ao clicar no card.

### SugestaoItem
- renderiza item sugerido no carrinho;
- exibe imagem, nome, preço e botão de compra.

### RolarParaTopo
- roda ao mudar a rota para voltar ao topo da página.

## Regras

1. Componentes devem ser reutilizáveis e não acoplados a regras de outra área da aplicação.
2. O card do produto deve manter aparência consistente em listagens e páginas relacionadas.
3. O botão de compra deve refletir o estado real do produto: se esgotado, deve ficar desabilitado.
4. Todo selo deve ser exibido somente quando a condição correspondente for verdadeira.
5. A navegação deve respeitar as rotas definidas no router principal.

## Invariantes

- qualquer card de produto deve informar preço, avaliação e categoria do produto corretamente;
- a presença de um selo nunca deve substituir a regra principal de venda;
- ações de compra devem sempre acontecer via evento do componente e não por lógica duplicada.
