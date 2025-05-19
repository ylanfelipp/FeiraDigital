import { useEffect, useState } from "react"
import FeiraContext from "./FeiraContext"

const ContextProvider = ({ children }) => {
    const [favoritos, setFavoritos] = useState([])
    const [carrinho, setCarrinho] = useState([])
    const [usuario, setUsuario] = useState(null)

    useEffect(() => {
        const getUsuario = async () => {
            const resp = await fetch("http://localhost:4040/v1/api/usuarios/check", {
                credentials: "include"
            })
            if (resp.ok) {
                const data = await resp.json()
                setUsuario(data.usuario)
            } else {
                setUsuario(null)
                setCarrinho([])
                setFavoritos([])
            }
        }
        getUsuario()
    }, [])

    useEffect(() => {
        if (!usuario) return

        const getCarrinho = async () => {
            const resp = await fetch(`http://localhost:4040/v1/api/carrinho/${usuario.id}`, {
                credentials: "include"
            })
            const carrinho = await resp.json()
            setCarrinho(Array.isArray(carrinho.produtos) ? carrinho.produtos : [])
        }

        const getFavoritos = async () => {
            const resp = await fetch(`http://localhost:4040/v1/api/favoritos/${usuario.id}`, {
                credentials: "include"
            })
            const favoritos = await resp.json()
            setFavoritos(Array.isArray(favoritos) ? favoritos : [])
        }

        getCarrinho()
        getFavoritos()
    }, [usuario])

    return (
        <FeiraContext.Provider value={{ favoritos, setFavoritos, carrinho, setCarrinho, usuario }}>
            {children}
        </FeiraContext.Provider>
    )
}

export default ContextProvider