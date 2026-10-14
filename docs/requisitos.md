# Requisitos da TechStore

Última atualização: outubro de 2026

## Loja

* A página inicial lista todos os produtos do catálogo.
* O cliente pode filtrar os produtos por categoria.
* Cada produto é exibido em um card com imagem, nome, avaliação e preço.
* Clicar no card abre a página do produto.
* O menu principal e o rodapé dão acesso ao painel do lojista.

## Produtos esgotados

* Produtos sem unidades em estoque deixam de aparecer na vitrine da loja.
* O produto continua acessível por URL direta de detalhe, mantendo o catálogo interno preservado.
* O botão de compra fica desabilitado nos produtos esgotados.

## Produtos sem preço

* Produtos sem preço definido ou com valor inválido não podem ser vendidos.
* O cálculo do total do carrinho normaliza valores vindos em texto da API antes da operação final.

## Página do produto

* Exibe imagem, nome, avaliação, preço, descrição e unidades disponíveis.
* Exibe até 4 produtos relacionados da mesma categoria.
* Produtos esgotados continuam com a página de detalhe acessível, mas sem venda ativa.

## Carrinho

* Lista os produtos adicionados, com a quantidade de cada um.
* Permite remover unidades.
* Permite aplicar cupons de desconto.
* Exibe o total da compra.
* Emite alerta de confirmação ao adicionar um item e evita duplicação por clique rápido.

## Painel do lojista

* A rota `/painel-lojista` apresenta o valor do estoque, clientes na espera e lucro estimado por categoria.
* A visão do lojista oferece contexto operacional para acompanhamento do catálogo e da demanda.
