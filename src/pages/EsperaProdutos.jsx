export default function EsperaProdutos({ produtos, esperaProdutos }) {
    const registros = produtos
        .map((produto) => ({
            produto,
            clientes: esperaProdutos.filter((registro) => registro.idProduto === produto.id),
        }))
        .filter(({ clientes }) => clientes.length > 0)
        .sort((a, b) => b.clientes.length - a.clientes.length)

    return (
        <section>
            <p className="sobretitulo">Área interna</p>
            <h1>Produtos em espera</h1>

            {registros.length === 0 && (
                <div className="estado-vazio">
                    <p>Nenhum cliente está esperando retorno de produtos esgotados.</p>
                </div>
            )}

            {registros.map(({ produto, clientes }) => (
                <div key={produto.id} className="painel-espera" style={{ marginBottom: '1.5rem' }}>
                    <h2>{produto.title}</h2>
                    <ul className="lista-espera">
                        {clientes.map((cliente) => (
                            <li key={`${produto.id}-${cliente.email}`} className="item-espera">
                                <strong>{cliente.nome}</strong>
                                <span>{cliente.email}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>
    )
}
