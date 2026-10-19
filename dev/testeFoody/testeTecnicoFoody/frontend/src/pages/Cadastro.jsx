import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Cadastro() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [erro, setErro] = useState(false)
    const [carregando, setCarregando] = useState(false)

    const navigate = useNavigate()

    async function handleCadastro(event) {
        event.preventDefault()

        setMensagem('')
        setErro(false)
        setCarregando(true)

        try {
            const resposta = await fetch(
                'http://localhost:8080/api/users/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nome,
                        email,
                        senha,
                    }),
                }
            )

            const dados = await resposta.json().catch(() => null)

            if (!resposta.ok) {
                setErro(true)

                const mensagemErro =
                    dados?.erro ||
                    dados?.mensagem ||
                    dados?.message ||
                    'Não foi possível realizar o cadastro.'

                setMensagem(mensagemErro)
                return
            }

            setMensagem('Cadastro realizado com sucesso!')

            setTimeout(() => {
                navigate('/login')
            }, 1500)
        } catch (error) {
            setErro(true)
            setMensagem(
                'Não foi possível conectar ao servidor. Verifique se o backend está funcionando.'
            )
        } finally {
            setCarregando(false)
        }
    }

    return (
        <main className="auth-container">
            <form className="auth-card" onSubmit={handleCadastro}>
                <h1>Foody</h1>
                <h2>Criar uma conta</h2>

                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(event) => setNome(event.target.value)}
                        placeholder="Seu nome"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="seu@email.com"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="senha">Senha</label>
                    <input
                        type="password"
                        id="senha"
                        value={senha}
                        onChange={(event) => setSenha(event.target.value)}
                        placeholder="Crie uma senha"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn-primary"
                    disabled={carregando}
                >
                    {carregando ? 'Cadastrando...' : 'Cadastrar'}
                </button>

                {mensagem && (
                    <p
                        role="status"
                        style={{
                            color: erro ? '#c62828' : '#2e7d32',
                            marginTop: '16px',
                        }}
                    >
                        {mensagem}
                    </p>
                )}

                <p className="auth-link">
                    Já tem conta? <Link to="/login">Entrar</Link>
                </p>
            </form>
        </main>
    )
}

export default Cadastro
