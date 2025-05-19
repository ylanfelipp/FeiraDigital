import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Feira from './pages/Feira'
import Favoritos from './pages/Favoritos'
import Produto from './pages/Produto'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Carrinho from './pages/Carrinho'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'

const App = () => {
    const [logado, setLogado] = useState(false)

    // Checa se está autenticado ao carregar o app
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const resp = await fetch("http://localhost:4040/v1/api/usuarios/check", {
                    method: "GET",
                    credentials: "include"
                })
                setLogado(resp.ok)
            } catch {
                setLogado(false)
            }
        }
        checkAuth()
    }, [])

    // Login: conecta ao backend, backend retorna cookie
    const handleLogin = async (email, senha) => {
        try {
            const resp = await fetch("http://localhost:4040/v1/api/usuarios/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, senha })
            })
            if (resp.ok) {
                setLogado(true)
                return { sucesso: true }
            } else {
                const erro = await resp.json()
                return { sucesso: false, mensagem: erro.mensagem || "E-mail ou senha inválidos." }
            }
        } catch {
            return { sucesso: false, mensagem: "Erro ao conectar com o servidor." }
        }
    }

    // Logout: limpa o cookie no backend
    const handleLogout = async () => {
        await fetch("http://localhost:4040/v1/api/auth/logout", {
            method: "POST",
            credentials: "include"
        })
        setLogado(false)
    }

    return (
        <BrowserRouter>
            {logado && <Navbar onLogout={handleLogout} />}
            <main>
                <Routes>
                    {!logado ? (
                        <>
                            <Route path="/login" element={<Login onLogin={handleLogin} />} />
                            <Route path="/cadastro" element={<Cadastro />} />
                            <Route path="*" element={<Navigate to="/login" replace />} />
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/feiras/:id" element={<Feira />} />
                            <Route path="/favoritos" element={<Favoritos />} />
                            <Route path="/:feiraId/produtos/:produtoId" element={<Produto />} />
                            <Route path="/carrinho" element={<Carrinho />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </>
                    )}
                </Routes>
            </main>
        </BrowserRouter>
    )
}

export default App