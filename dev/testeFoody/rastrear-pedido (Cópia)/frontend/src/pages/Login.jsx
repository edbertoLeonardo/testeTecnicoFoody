import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [erro, setErro] = useState(false)
    const [carregando, setCarregando] = useState(false)

    const navigate = useNavigate()

    async function handleLogin(event) {
        event.preventDefault()

        setMensagem('')
        setErro(false)
        setCarregando(true)

        try {
            const resposta = await fetch('http://localhost:8080/api/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        email, senha,
                    }),
                }
            )

            const dados = await resposta.json()

            if (!resposta.ok) {
                setErro(true)
                setMensagem(
                    dados.erro || dados.mensagem || 'E-mail ou senha inválidos.'
                )
                return
            }

            setMensagem('Login realizado com sucesso!')

            setTimeout(() => {
                navigate('/pedidos')
            }, 1000)

        } catch (error) {
            setErro(true)
            setMensagem('Não foi possível conectar ao servidor.')
        } finally {
            setCarregando(false)
        }
    }

    return (
        <main className="auth-container">
            <form className="auth-card" onSubmit={handleLogin}>
                <h1>Foody</h1>
                <h2>Entrar na sua conta</h2>

                <div className="form-group">
                    <label htmlFor="email">E-mail</label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="senha">Senha</label>

                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(event) => setSenha(event.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn-primary"
                    disabled={carregando}
                >
                    {carregando ? 'A entrar...' : 'Entrar'}
                </button>

                {mensagem && (
                    <p
                        role="status"
                        style={{
                            color: erro ? 'red' : 'green',
                            marginTop: '15px',
                        }}
                    >
                        {mensagem}
                    </p>
                )}

                <p className="auth-link">
                    Ainda não tem conta?{' '}
                    <Link to="/cadastro">Cadastre-se</Link>
                </p>
            </form>
        </main>
    )
}

export default Login
