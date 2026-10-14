const categorias = {
    roupas: 'Roupas',
    eletronicos: 'Eletrônicos',
    acessorios: 'Acessórios',
    casa: 'Casa',
}

const formatarMoeda = (valor) =>
    new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(valor)

export default function PainelLojista({ produtos, esperaProdutos }) {
    const resumoPorCategoria = Object.entries(categorias).map(([chave, nome]) => {
        const itens = produtos.filter((produto) => produto.category === chave)
        const valorEstoque = itens.reduce((total, produto) => total + produto.estoque * produto.price, 0)
        const lucroEstimado = itens.reduce(
            (total, produto) => total + produto.estoque * produto.price * 0.28,
            0
        )
        const clientesEsperando = esperaProdutos.filter((registro) =>
            itens.some((produto) => produto.id === registro.idProduto)
        ).length

        return {
            chave,
            nome,
            itens,
            valorEstoque,
            lucroEstimado,
            clientesEsperando,
        }
    })

    const valorTotalEmEstoque = resumoPorCategoria.reduce(
        (total, categoria) => total + categoria.valorEstoque,
        0
    )
    const lucroTotalEstimado = resumoPorCategoria.reduce(
        (total, categoria) => total + categoria.lucroEstimado,
        0
    )
    const clientesNaEspera = new Set(
        esperaProdutos.map((registro) => `${registro.idProduto}:${registro.email}`)
    ).size

    return (
        <section>
            <p className="sobretitulo">Área interna</p>
            <h1>Painel do lojista</h1>

            <div className="dashboard-grid">
                <article className="card-metrica">
                    <span className="card-metrica-titulo">Valor em estoque</span>
                    <strong>{formatarMoeda(valorTotalEmEstoque)}</strong>
                    <small>Disponível para venda hoje</small>
                </article>

                <article className="card-metrica">
                    <span className="card-metrica-titulo">Clientes na espera</span>
                    <strong>{clientesNaEspera}</strong>
                    <small>Pessoas aguardando retorno</small>
                </article>

                <article className="card-metrica">
                    <span className="card-metrica-titulo">Lucro estimado</span>
                    <strong>{formatarMoeda(lucroTotalEstimado)}</strong>
                    <small>Com base na margem estimada</small>
                </article>
            </div>

            <div className="painel-dashboard">
                <h2>Resumo por categoria</h2>

                <div className="tabela-moldura">
                    <table className="tabela">
                        <thead>
                            <tr>
                                <th>Categoria</th>
                                <th>Valor em estoque</th>
                                <th>Lucro estimado</th>
                                <th>Clientes na espera</th>
                                <th>Itens em estoque</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resumoPorCategoria.map((categoria) => (
                                <tr key={categoria.chave}>
                                    <td>{categoria.nome}</td>
                                    <td>{formatarMoeda(categoria.valorEstoque)}</td>
                                    <td>{formatarMoeda(categoria.lucroEstimado)}</td>
                                    <td>{categoria.clientesEsperando}</td>
                                    <td>{categoria.itens.length}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
