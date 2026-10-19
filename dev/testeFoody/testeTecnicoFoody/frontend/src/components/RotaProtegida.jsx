import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

function RotaProtegida({ children }) {
    const [autenticado, setAutenticado] = useState(null)

    useEffect(() => {
        async function verificarAutenticacao() {
            try {
                const resposta = await fetch(
                    'http://localhost:8080/api/auth/me',
                    {
                        method: 'GET',
                        credentials: 'include',
                    }
                )

                setAutenticado(resposta.ok)
            } catch {
                setAutenticado(false)
            }
        }

        verificarAutenticacao()
    }, [])

    if (autenticado === null) {
        return <p>Verificando autenticação...</p>
    }

    if (!autenticado) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default RotaProtegida