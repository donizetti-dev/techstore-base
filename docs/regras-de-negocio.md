# Regras de negócio

Última atualização: outubro de 2026

## Frete grátis

Produtos com preço acima de R$ 100 têm frete grátis e exibem o selo "Frete grátis".

## Cupons

| Cupom | Desconto | Quem pode usar |
|---|---|---|
| `PRIMEIRACOMPRA` | 10% sobre o total | Somente clientes sem pedidos anteriores |

O cupom não diferencia letras maiúsculas e minúsculas.

## Promoções

Produtos em promoção exibem o preço original riscado ao lado do preço atual.

## Carrinho

* O botão de adicionar ao carrinho emite um alerta de confirmação ao cliente antes de encerrar a ação.
* Cliques rápidos no mesmo item não devem duplicar o produto no carrinho; a atualização do estado precisa usar abordagem funcional.
* O total do carrinho deve considerar preços vindos em texto da API, normalizando o valor antes do cálculo.
* Itens sem valor válido são bloqueados e não entram no carrinho.

## Produtos esgotados

* Produtos sem unidades em estoque deixam de aparecer na vitrine da loja.
* O produto continua acessível por URL direta de detalhe, preservando o catálogo interno.
* A página de produto mantém os dados do item mesmo quando ele está esgotado.

## Painel do lojista

* A rota `/painel-lojista` reúne visão do valor do estoque, clientes na espera e lucro estimado por categoria.
* O acesso ao painel fica disponível no menu principal e no rodapé da loja.

## Validação de cliente

* O seletor de cliente de teste no rodapé permite validar regras de negócio que dependem do histórico do cliente.
* Regras como o cupom de primeira compra devem respeitar o estado de `pedidosAnteriores` do cliente selecionado.
