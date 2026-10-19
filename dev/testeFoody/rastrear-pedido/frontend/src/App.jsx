import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import './App.css'
import Pedidos from './pages/Pedidos'
import NovoPedido from './pages/NovoPedido'
import RotaProtegida from './components/RotaProtegida'


function Home() {
  const navigate = useNavigate()
  return (
    <div className="app">
      <header className="header">
        <h1>Foody</h1>
        <p>Seus pedidos, acompanhados em tempo real.</p>
      </header>

      <main className="container">
        <section className="welcome">
          <h2>Bem-vindo ao Foody!</h2>
          <p>Acompanhe seus pedidos e faça novos pedidos.</p>

          <button className="btn-primary" onClick={() => navigate('/novo-pedido')}>
            Novo pedido
          </button>
        </section>

        <section className="pedidos">
          <h2>Meus pedidos</h2>
          <p className="mensagem">
            Seus pedidos aparecerão aqui.
          </p>
        </section>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RotaProtegida><Home /></RotaProtegida>} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/pedidos" element={<RotaProtegida><Pedidos /></RotaProtegida>} />
        <Route path="/novo-pedido" element={<RotaProtegida><NovoPedido /></RotaProtegida>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
