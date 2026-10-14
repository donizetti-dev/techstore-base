import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import RolarParaTopo from './components/RolarParaTopo'
import Loja from './pages/Loja'
import PaginaProduto from './pages/PaginaProduto'
import Carrinho from './pages/Carrinho'
import Estoque from './pages/Estoque'
import EsperaProdutos from './pages/EsperaProdutos'
import PainelLojista from './pages/PainelLojista'
import { buscarProdutos } from './services/produtos'
import { buscarClientes } from './services/clientes'

export default function App() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [carrinho, setCarrinho] = useState([])
  const [clientes, setClientes] = useState([])
  const [clienteAtualId, setClienteAtualId] = useState(null)
  const [esperaProdutos, setEsperaProdutos] = useState([])

  useEffect(() => {
    buscarProdutos()
      .then((dados) => {
        const produtosNormalizados = dados
          .map((produto) => ({
            ...produto,
            price: Number(produto.price),
          }))
          .filter((produto) => Number.isFinite(produto.price) && produto.price > 0)

        setProdutos(produtosNormalizados)
      })
      .catch(() => setErro('Não foi possível carregar os produtos.'))
      .finally(() => setCarregando(false))

    buscarClientes().then((dados) => {
      setClientes(dados)
      if (dados.length > 0) setClienteAtualId(dados[0].id)
    })
  }, [])

  function adicionarAoCarrinho(produto) {
    setCarrinho((atual) => atual.concat(produto))

    if (typeof window !== 'undefined' && produto?.title) {
      window.alert(`${produto.title} adicionado ao carrinho.`)
    }
  }

  function removerUmaUnidade(produtoId) {
    // Remove só a primeira unidade encontrada do produto
    let removido = false
    setCarrinho((atual) =>
      atual.filter((produto) => {
        if (!removido && produto.id === produtoId) {
          removido = true
          return false
        }
        return true
      })
    )
  }

  function registrarEspera({ idProduto, nome, email }) {
    const nomeLimpo = nome.trim()
    const emailLimpo = email.trim().toLowerCase()

    if (!idProduto || !nomeLimpo || !emailLimpo) {
      return false
    }

    const jaCadastrado = esperaProdutos.some(
      (registro) =>
        registro.idProduto === idProduto && registro.email.toLowerCase() === emailLimpo
    )

    if (jaCadastrado) {
      return false
    }

    setEsperaProdutos((atual) =>
      atual.concat({
        idProduto,
        nome: nomeLimpo,
        email: emailLimpo,
        data: new Date().toISOString(),
      })
    )

    return true
  }

  const clienteAtual = clientes.find((cliente) => cliente.id === clienteAtualId)

  return (
    <div className="app">
      <RolarParaTopo />
      <Header carrinho={carrinho} clienteAtual={clienteAtual} />

      <main className="conteudo">
        {carregando && <p className="aviso">Carregando produtos...</p>}
        {erro && <p className="aviso aviso-erro">{erro}</p>}

        {!carregando && !erro && (
          <Routes>
            <Route
              path="/"
              element={<Loja produtos={produtos} onAdicionar={adicionarAoCarrinho} />}
            />
            <Route
              path="/produto/:id"
              element={
                <PaginaProduto
                  produtos={produtos}
                  onAdicionar={adicionarAoCarrinho}
                  onRegistrarEspera={registrarEspera}
                />
              }
            />
            <Route
              path="/carrinho"
              element={
                <Carrinho
                  carrinho={carrinho}
                  produtos={produtos}
                  clienteAtual={clienteAtual}
                  onAdicionar={adicionarAoCarrinho}
                  onRemover={removerUmaUnidade}
                />
              }
            />
            <Route path="/estoque" element={<Estoque produtos={produtos} />} />
            <Route
              path="/espera-produtos"
              element={<EsperaProdutos produtos={produtos} esperaProdutos={esperaProdutos} />}
            />
            <Route
              path="/painel-lojista"
              element={<PainelLojista produtos={produtos} esperaProdutos={esperaProdutos} />}
            />
          </Routes>
        )}
      </main>

      <Footer
        clientes={clientes}
        clienteAtualId={clienteAtualId}
        onTrocarCliente={setClienteAtualId}
      />
    </div>
  )
}
