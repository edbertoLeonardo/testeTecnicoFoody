import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NovoPedido() {
    const [enderecoEntrega, setEnderecoEntrega] = useState('')
    const [itens, setItens] = useState([
        { nomeProduto: '', quantidade: 1 }
    ])

    const [mensagem, setMensagem] = useState('')
    const [erro, setErro] = useState(false)
    const [carregando, setCarregando] = useState(false)

    const navigate = useNavigate()

    async function handleCriarPedido(event) {
        event.preventDefault()

        setMensagem('')
        setErro(false)

        const itensValidos = itens.every(
            (item) =>
                item.nomeProduto.trim() !== '' &&
                Number.isInteger(Number(item.quantidade)) &&
                Number(item.quantidade) > 0
        )

        if (!itensValidos) {
            setErro(true)
            setMensagem(
                'Preencha o nome e a quantidade válida de todos os produtos.'
            )
            return
        }

        setCarregando(true)

        try {
            const resposta = await fetch(
                'http://localhost:8080/api/pedidos',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        enderecoEntrega: enderecoEntrega.trim(),
                        itens: itens.map((item) => ({
                            nomeProduto: item.nomeProduto.trim(),
                            quantidade: Number(item.quantidade),
                        })),
                    }),
                }
            )

            const dados = await resposta.json().catch(() => null)

            if (resposta.status === 401 || resposta.status === 403) {
                setErro(true)
                setMensagem('Sua sessão expirou. Faça login novamente.')
                return
            }

            if (!resposta.ok) {
                setErro(true)
                setMensagem(
                    dados?.mensagem ||
                    dados?.message ||
                    dados?.erro ||
                    'Não foi possível criar o pedido.'
                )
                return
            }

            setMensagem('Pedido criado com sucesso!')

            setTimeout(() => {
                navigate('/pedidos')
            }, 1000)
        } catch {
            setErro(true)
            setMensagem(
                'Não foi possível conectar ao servidor. Verifique se o backend está funcionando.'
            )
        } finally {
            setCarregando(false)
        }
    }

    return (
        <main className="novo-pedido-container">
            <header>
                <h1>Foody</h1>
                <h2>Novo pedido</h2>
                <p>Preencha os dados para realizar seu pedido.</p>
            </header>

            <form className="novo-pedido-form" onSubmit={handleCriarPedido}>                <div className="form-group">
                <label htmlFor="enderecoEntrega">
                    Endereço de entrega
                </label>

                <input
                    type="text"
                    id="enderecoEntrega"
                    value={enderecoEntrega}
                    onChange={(event) =>
                        setEnderecoEntrega(event.target.value)
                    }
                    placeholder="Rua, número, bairro..."
                    required
                />
            </div>

                <h3>Itens do pedido</h3>

                {itens.map((item, index) => (
                    <div className="item-pedido" key={index}>
                        <div className="form-group">
                            <label htmlFor={`produto-${index}`}>
                                Nome do produto
                            </label>

                            <input
                                type="text"
                                id={`produto-${index}`}
                                value={item.nomeProduto}
                                onChange={(event) => {
                                    const novosItens = [...itens]

                                    novosItens[index].nomeProduto =
                                        event.target.value

                                    setItens(novosItens)
                                }}
                                placeholder="Ex.: Pizza de calabresa"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor={`quantidade-${index}`}>
                                Quantidade
                            </label>

                            <input
                                type="number"
                                id={`quantidade-${index}`}
                                min="1"
                                value={item.quantidade}
                                onChange={(event) => {
                                    const novosItens = [...itens]

                                    novosItens[index].quantidade =
                                        Number(event.target.value)

                                    setItens(novosItens)
                                }}
                                required
                            />
                        </div>

                        {itens.length > 1 && (
                            <button
                                type="button"
                                onClick={() => {
                                    setItens(itens.filter((_, i) => i !== index))
                                }}
                            >
                                Remover item
                            </button>
                        )} </div>
                ))}

                <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                        setItens([
                            ...itens,
                            { nomeProduto: '', quantidade: 1 }
                        ])
                    }}
                >
                    + Adicionar outro item
                </button>

                {mensagem && (
                    <p
                        role="status"
                        style={{
                            color: erro ? '#c62828' : '#2e7d32'
                        }}
                    >
                        {mensagem}
                    </p>
                )}
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={carregando}
                >
                    {carregando ? 'Criando pedido...' : 'Criar pedido'}
                </button>
                <button
                    type="button"
                    className="btn-primary"
                    onClick={() => navigate('/pedidos')}
                >
                    Voltar aos pedidos
                </button>
            </form>
        </main>
    )
}

export default NovoPedido