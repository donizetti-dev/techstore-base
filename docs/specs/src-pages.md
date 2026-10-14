# Especificação da pasta src/pages

## Caminho

- `src/pages/`

## Finalidade

A pasta `pages/` reúne as telas da aplicação e o comportamento específico de cada rota do sistema.

## Páginas

### Loja
- lista todos os produtos do catálogo;
- permite filtrar por categoria;
- renderiza os cards dos produtos;
- chama `onAdicionar` ao clicar em adicionar ao carrinho.

### PaginaProduto
- busca o produto pelo `id` da rota;
- exibe imagem, nome, avaliação, preço, descrição e estoque;
- mostra até 4 produtos relacionados da mesma categoria;
- permite adicionar o item ao carrinho;
- quando o produto não existe, mostra estado de erro com retorno para loja.

### Carrinho
- exibe itens agrupados por produto;
- permite remover uma unidade por vez;
- aplica cupom de desconto quando válido;
- calcula total final do pedido;
- sugere outros produtos que ainda não estão no carrinho.

### Estoque
- apresenta uma visão interna de quantidade de itens por produto;
- ordena por menor estoque;
- destaca produtos com estoque zero ou abaixo de 5 unidades.

## Regras

1. A loja deve listar todos os produtos disponíveis, mesmo que alguns tenham estoque zero, conforme regra atual.
2. Produtos sem categoria ou sem preço devem ser tratados com cautela e não devem ser vendidos.
3. A rota de produto deve funcionar somente para produtos existentes.
4. O carrinho deve funcionar com itens repetidos e calcular corretamente o total.
5. O cupom só pode ser aplicado se for válido para o cliente atual.
6. A página do estoque deve ser apenas informativa e não deve permitir venda direta.

## Invariantes

- a ordem de listagem da loja deve respeitar a categoria selecionada;
- a página de produto deve manter a relação com a categoria para sugerir produtos relacionados;
- o estado de carrinho não deve ser alterado por páginas que não sejam responsáveis por esse domínio.
