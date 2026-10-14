# Especificação da pasta src/utils

## Caminho

- `src/utils/`

## Finalidade

A pasta `utils/` guarda regras de cálculo e lógica de domínio que são reutilizadas por vários módulos da aplicação.

## Módulos

### carrinho.js
- `calcularTotal(carrinho)`: soma o valor total do carrinho;
- `agruparItens(carrinho)`: junta itens repetidos em uma única linha de pedido.

### cupons.js
- `validarCupom(codigo, cliente)`: verifica se o cupom existe e se pode ser usado pelo cliente.
- regra de negócio: `PRIMEIRACOMPRA` vale para qualquer cliente sem pedidos anteriores;
- se o cliente já realizou pedidos, o cupom deve ser rejeitado.

### formatarPreco.js
- converte um número em valor monetário com `Intl` e moeda BRL.

## Regras

1. O cálculo do total deve considerar somente itens com preço válido.
2. Produtos sem preço definido não podem entrar no total como venda válida.
3. A regra do cupom deve ser case insensitive e tratar espaços extras no código.
4. A lógica de formatação deve respeitar o padrão brasileiro de moeda.
5. Funções utilitárias não devem depender diretamente de estado visual ou de componentes React.

## Invariantes

- o total do carrinho não pode conter valores sem sentido ou contagens inconsistentes;
- a lógica de desconto deve ser centralizada e idempotente;
- qualquer regra de negócio reutilizável deve ficar em utilitário, não duplicada em páginas.
