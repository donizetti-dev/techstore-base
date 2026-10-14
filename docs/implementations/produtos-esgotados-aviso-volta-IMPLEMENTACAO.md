# Implementação: espera por produtos esgotados

## Contexto

A regra de negócio do comercial e do time de estoque exige que:

- produtos com estoque zerado saiam da vitrine pública da loja;
- o cliente ainda consiga acessar a página do produto por link externo;
- o cliente possa se cadastrar para receber aviso quando o produto voltar;
- a área interna mostre, por produto, quem está na fila de espera, com nome e e-mail;
- a operação esteja integrada ao fluxo atual da aplicação sem quebrar a arquitetura existente.

As fontes de contexto do projeto são:

- [ENUNCIADO.md](../../ENUNCIADO.md)
- [CHANGELOG.md](../../CHANGELOG.md)
- [README.md](../../README.md)
- [docs/specs/src.md](../specs/src.md)
- [docs/specs/src-pages.md](../specs/src-pages.md)
- [docs/specs/src-services.md](../specs/src-services.md)

## Análise da arquitetura atual

A aplicação já usa roteamento centralizado e páginas por rota:

- [src/App.jsx](../../src/App.jsx): define as rotas e o estado global;
- [src/pages/Loja.jsx](../../src/pages/Loja.jsx): renderiza a vitrine pública;
- [src/pages/PaginaProduto.jsx](../../src/pages/PaginaProduto.jsx): detalha o item selecionado;
- [src/pages/Estoque.jsx](../../src/pages/Estoque.jsx): área interna do estoque;
- [src/components/Header.jsx](../../src/components/Header.jsx): menu principal;
- [src/components/Footer.jsx](../../src/components/Footer.jsx): links internos e cliente de teste.

A regra de esgotados já foi tratada parcialmente na listagem pública: a loja filtra itens com estoque zero em [src/pages/Loja.jsx](../../src/pages/Loja.jsx). Isso é o lugar correto para ocultar o produto da vitrine, mas a rota de detalhe precisa continuar funcionando.

## Ponto exato para a mudança

### 1) Estado global da aplicação

O ponto central para a fila de espera é [src/App.jsx](../../src/App.jsx), porque ele já coordena:

- catálogo de produtos;
- carrinho;
- cliente atual;
- navegação entre páginas.

A lógica de espera deve ser adicionada ali como estado global, por exemplo:

```js
const [esperaProdutos, setEsperaProdutos] = useState([])
```

Esse array deve guardar registros como:

```js
{
  idProduto: 'produto-id',
  nome: 'Maria',
  email: 'maria@email.com',
  data: '2026-10-13T10:20:00.000Z'
}
```

Com isso, a página interna pode listar, por produto, todos os clientes que ficaram esperando retorno.

### 2) Rota da nova página interna

Em [src/App.jsx](../../src/App.jsx), deve ser adicionada uma nova rota:

```jsx
<Route path="/espera-produtos" element={<EsperaProdutos produtos={produtos} esperaProdutos={esperaProdutos} />} />
```

A página deve ficar em:

- [src/pages/EsperaProdutos.jsx](../../src/pages/EsperaProdutos.jsx)

Essa rota será a página interna do time de marketing/estoque para acompanhar quem está esperando cada produto.

### 3) Página de detalhe do produto esgotado

Em [src/pages/PaginaProduto.jsx](../../src/pages/PaginaProduto.jsx), quando o produto tiver estoque zero, a UI deve exibir um bloco de inscrição para aviso.

O fluxo esperado é:

- se `produto.estoque === 0`, mostrar texto de produto indisponível;
- apresentar formulário com nome e e-mail;
- ao enviar, registrar a espera no estado global de `esperaProdutos`;
- manter o produto acessível pela URL, porque a página de detalhe deve continuar aberta para links de redes sociais.

A lógica de envio pode ficar no próprio componente, ou ser centralizada em um callback recebido por prop:

```jsx
onInscreverEspera({ idProduto, nome, email })
```

### 4) Menu e links internos

Para expor a nova funcionalidade, os pontos de navegação são:

- [src/components/Header.jsx](../../src/components/Header.jsx): adicionar link para a área interna do new page;
- [src/components/Footer.jsx](../../src/components/Footer.jsx): incluir acesso rápido para a página de espera.

A ideia é manter o padrão já usado para a área interna de estoque.

### 5) Estilo visual

Se a página tiver tabela, formulário e cards, o ajuste final deve ficar em:

- [src/index.css](../../src/index.css)

Adicionar classes para:

- painel de espera;
- tabela de produtos com fila;
- linhas de clientes;
- botão de inscrição;
- estado vazio quando não houver pessoas na fila.

## Fluxo funcional esperado

1. O cliente abre um link de produto esgotado vindo das redes sociais.
2. A rota [src/pages/PaginaProduto.jsx](../../src/pages/PaginaProduto.jsx) carrega o produto mesmo com estoque zero.
3. O componente exibe o aviso de produto esgotado e um formulário.
4. O cliente preenche nome e e-mail e envia.
5. A inscrição entra em `esperaProdutos` no estado global em [src/App.jsx](../../src/App.jsx).
6. A página interna [src/pages/EsperaProdutos.jsx](../../src/pages/EsperaProdutos.jsx) agrupa os registros por produto e mostra nome e e-mail de cada cliente.
7. Quando o estoque voltar, o time pode avisar os interessados e decidir a reposição prioritária.

## Estrutura sugerida da nova página

A página interna pode seguir o mesmo padrão de [src/pages/Estoque.jsx](../../src/pages/Estoque.jsx):

```jsx
export default function EsperaProdutos({ produtos, esperaProdutos }) {
  const registrosPorProduto = produtos
    .map((produto) => ({
      produto,
      clientes: esperaProdutos.filter((item) => item.idProduto === produto.id),
    }))
    .filter((item) => item.clientes.length > 0)

  return (
    <section>
      <p className="sobretitulo">Área interna</p>
      <h1>Produtos em espera</h1>
      {registrosPorProduto.map(({ produto, clientes }) => (
        <div key={produto.id} className="painel-espera">
          <h2>{produto.title}</h2>
          <ul>
            {clientes.map((cliente) => (
              <li key={`${produto.id}-${cliente.email}`}>
                {cliente.nome} — {cliente.email}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
```

## Observações importantes

- Não remover o produto do catálogo interno: ele precisa continuar sendo encontrado por URL e aparecer na área interna.
- O filtro de disponibilidade pertence à vitrine pública e não à lista completa de produtos do sistema.
- A página de espera não deve ficar no fluxo de compra, e sim como ferramenta interna do time.
- O nome da rota deve seguir o padrão do projeto, sendo uma rota pública ou administrativa com baixa complexidade.

## Histórico relevante

O [CHANGELOG.md](../../CHANGELOG.md) mostra que a loja passou por duas mudanças importantes relacionadas ao tema:

- 1.6.0: produtos com estoque zerado saem da vitrine, mas preservam acesso ao detalhe por URL;
- 1.2.0: página interna /estoque foi criada para o time de estoque.

Isso confirma a direção correta:

- esconder da loja pública é uma regra de visibilidade;
- a área interna continua sendo o lugar para consultas e controle operacional.

## Conclusão

A mudança correta para a demanda de “produtos esgotados + aviso de retorno” se encaixa no modelo atual do projeto em três pontos:

1. manter o catálogo completo em [src/App.jsx](../../src/App.jsx);
2. aplicar o filtro de visibilidade na vitrine em [src/pages/Loja.jsx](../../src/pages/Loja.jsx);
3. criar a nova rota interna de espera em [src/App.jsx](../../src/App.jsx) e a página [src/pages/EsperaProdutos.jsx](../../src/pages/EsperaProdutos.jsx), com inscrição no detalhe em [src/pages/PaginaProduto.jsx](../../src/pages/PaginaProduto.jsx).

Com essa estrutura, o cliente consegue saber quando o produto voltar e o time consegue acompanhar, por produto, quem está esperando, com nome e e-mail.
