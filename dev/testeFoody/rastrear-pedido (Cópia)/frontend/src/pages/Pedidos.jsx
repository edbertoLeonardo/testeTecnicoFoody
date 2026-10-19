import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Pedidos() {
    const navigate = useNavigate()
    const [pedidos, setPedidos] = useState([])
    const [pedidosDefault, setPedidosDefault] = useState([])
    const [textoBusca, setTextoBusca] = useState('');


    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')

    async function handleLogout() {
        try {
            await fetch('http://localhost:8080/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            })
        } catch (error) {
            console.error('Erro ao encerrar sessão:', error)
        } finally {
            navigate('/login', { replace: true })
        }
    }

    const carregarPedidos = useCallback(async () => {
        setCarregando(true)
        setErro('')

        try {
            const resposta = await fetch(
                'http://localhost:8080/api/pedidos',
                {
                    method: 'GET',
                    credentials: 'include',
                }
            )

            if (resposta.status === 401 || resposta.status === 403) {
                throw new Error(
                    'Sua sessão não está autenticada. Faça login novamente.'
                )
            }

            if (!resposta.ok) {
                throw new Error('Não foi possível carregar os pedidos.')
            }

            const dados = await resposta.json();

            setPedidos(dados);
            setPedidosDefault(dados);
        } catch (error) {
            setErro(error.message || 'Erro ao comunicar com o servidor.')
        } finally {
            setCarregando(false)
        }
    }, [])


    async function atualizarStatus(pedidoId, novoStatus) {
        try {
            const resposta = await fetch(
                `http://localhost:8080/api/pedidos/${pedidoId}/status?novoStatus=${novoStatus}`,
                {
                    method: 'PATCH',
                    credentials: 'include',
                }
            )

            if (!resposta.ok) {
                throw new Error('Não foi possível atualizar o status do pedido.')
            }

            await carregarPedidos()
        } catch (error) {
            setErro(error.message || 'Erro ao atualizar o status.')
        }
    }

    async function buscar(event) {
        const id = event.target.value;
        if (id == "") { limparBusca(); return; }
        setTextoBusca(id);
        setPedidos(pedidosDefault.filter(p => p.id == id));

    }

    async function limparBusca() {
        setPedidos(pedidosDefault);
        setTextoBusca("")
    }

    useEffect(() => {
        carregarPedidos()
    }, [carregarPedidos])

    return (
        <main className="pedidos-container">
            <header>
                <h1>Foody</h1>
                <h2>Os meus pedidos</h2>
                <p>Acompanhe o andamento dos seus pedidos.</p>
                <button className="btn-primary" onClick={handleLogout}>
                    Sair da conta
                </button>
                <button
                    className="btn-primary"
                    onClick={carregarPedidos}
                    disabled={carregando}
                >
                    {carregando ? 'A carregar...' : 'Atualizar pedidos'}
                </button>
                <button
                    className="btn-primary"
                    onClick={() => navigate('/novo-pedido')}
                >
                    + Novo pedido
                </button>
                <div className='container'>
                    <div className='form-group'>
                        <input className='form-group-input' placeholder="ID do Pedido" value={textoBusca} onChange={buscar}></input>
                    </div>
                </div>
            </header>

            {erro && (
                <p role="alert" className="erro-pedidos">
                    {erro}
                </p>
            )}

            {!erro && !carregando && pedidos.length === 0 && (
                <p>Ainda não tens pedidos registados.</p>
            )}



            {pedidos.length > 0 && (
                <section className="pedidos-lista">
                    {pedidos.map((pedido) => (
                        <article className="pedido-card" key={pedido.id}>
                            <h3>Pedido #{pedido.id}</h3>


                            <div>
                                <p className="pedido-status">
                                    <strong>Estado:</strong>{' '}

                                    <span
                                        className={`status-badge status-${pedido.status.toLowerCase()}`}
                                    >
                                        {pedido.status.replaceAll('_', ' ')}
                                    </span>
                                </p>

                                <label htmlFor={`status-${pedido.id}`}>
                                    Alterar status:
                                </label>

                                <select
                                    id={`status-${pedido.id}`}
                                    value={pedido.status}
                                    onChange={(event) =>
                                        atualizarStatus(pedido.id, event.target.value)
                                    }
                                >
                                    <option value="RECEBIDO">Recebido</option>
                                    <option value="EM_PREPARO">Em preparo</option>
                                    <option value="SAIU_PARA_ENTREGA">Saiu para entrega</option>
                                    <option value="ENTREGUE">Entregue</option>
                                    <option value="CANCELADO">Cancelado</option>
                                </select>
                            </div>


                            <p>
                                <strong>Endereço de entrega:</strong>{' '}
                                {pedido.enderecoEntrega}
                            </p>

                            <h4>Itens do pedido</h4>

                            <ul>
                                {pedido.itens.map((item) => (
                                    <li key={item.id}>
                                        {item.nomeProduto} — Quantidade:{' '}
                                        {item.quantidade}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </section>
            )}
        </main>
    )
}

export default Pedidos