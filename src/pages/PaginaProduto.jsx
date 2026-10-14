import { useState } from 'react'
import { Link, useParams } from 'react-router'

export default function PaginaProduto({ produtos, onAdicionar, onRegistrarEspera }) {
  const { id } = useParams()
  const produto = produtos.find((item) => item.id === id)
  const [formulario, setFormulario] = useState({ nome: '', email: '' })
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  if (!produto) {
    return (
      <div className="estado-vazio">
        <p>Produto não encontrado.</p>
        <Link to="/" className="botao botao-secundario">
          Voltar para a loja
        </Link>
      </div>
    )
  }

  const relacionados = produtos
    .filter((item) => item.category === produto.category && item.id !== produto.id)
    .slice(0, 4)

  function handleSubmit(evento) {
    evento.preventDefault()

    const nome = formulario.nome.trim()
    const email = formulario.email.trim()

    if (!nome || !email) {
      setErro('Preencha nome e e-mail para receber o aviso.')
      setMensagem('')
      return
    }

    const cadastrado = onRegistrarEspera({ idProduto: produto.id, nome, email })

    if (!cadastrado) {
      setErro('Você já está na lista de espera para este produto.')
      setMensagem('')
      return
    }

    setErro('')
    setMensagem('Você foi adicionado à lista de espera.')
    setFormulario({ nome: '', email: '' })
  }

  return (
    <section>
      <nav className="trilha" aria-label="Você está em">
        <Link to="/">Loja</Link>
        <span aria-hidden="true">/</span>
        <span>{produto.title}</span>
      </nav>

      <div className="detalhe">
        <div className="detalhe-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="detalhe-imagem" />
        </div>

        <div className="detalhe-info">
          <h1>{produto.title}</h1>
          <p className="card-avaliacao">
            ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
          </p>
          <p className="detalhe-preco">R$ {produto.price.toFixed(2).replace('.', ',')}</p>
          <p className="detalhe-descricao">{produto.description}</p>
          <p className="detalhe-estoque">{produto.estoque} unidades disponíveis</p>

          <button
            className="botao botao-grande"
            onClick={() => onAdicionar(produto)}
            disabled={produto.estoque === 0}
          >
            Adicionar ao carrinho
          </button>

          {produto.estoque === 0 && (
            <div className="painel-espera-produto">
              <p className="sobretitulo">Produto esgotado</p>
              <h2>Receba um aviso quando voltar</h2>
              <p>Deixe seu nome e e-mail e avisaremos assim que ele estiver disponível.</p>

              <form className="formulario-espera" onSubmit={handleSubmit}>
                <div className="campo-espera">
                  <label htmlFor="nome-espera">Nome</label>
                  <input
                    id="nome-espera"
                    type="text"
                    value={formulario.nome}
                    onChange={(evento) =>
                      setFormulario((atual) => ({ ...atual, nome: evento.target.value }))
                    }
                    placeholder="Seu nome"
                  />
                </div>

                <div className="campo-espera">
                  <label htmlFor="email-espera">E-mail</label>
                  <input
                    id="email-espera"
                    type="email"
                    value={formulario.email}
                    onChange={(evento) =>
                      setFormulario((atual) => ({ ...atual, email: evento.target.value }))
                    }
                    placeholder="seu@email.com"
                  />
                </div>

                {erro && <p className="mensagem-form mensagem-erro">{erro}</p>}
                {mensagem && <p className="mensagem-form mensagem-sucesso">{mensagem}</p>}

                <button type="submit" className="botao botao-grande">
                  Quero ser avisado
                </button>
              </form>
            </div>
          )}

          <ul className="detalhe-garantias">
            <li>Troca grátis em até 30 dias</li>
            <li>Parcele em até 10x sem juros</li>
          </ul>
        </div>
      </div>

      <h2>Produtos relacionados</h2>
      <div className="grade">
        {relacionados.map((item) => (
          <article key={item.id} className="card">
            <Link to={`/produto/${item.id}`} className="card-link">
              <div className="card-imagem-moldura">
                <img src={item.image} alt={item.title} className="card-imagem" />
              </div>
              <h3 className="card-titulo">{item.title}</h3>
            </Link>
            <p className="preco">R$ {Number(item.price).toFixed(2).replace('.', ',')}</p>
            <button className="botao" onClick={() => onAdicionar(item)}>
              Adicionar ao carrinho
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
