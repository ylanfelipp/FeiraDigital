import { createContext, useEffect, useState } from "react";

export const FeiraContext = createContext(null)

const ContextProvider = ({ children }) => {
    const [favoritos, setFavoritos] = useState([])
    useEffect(() => {
        const getAllFavoritos = async () => {
            const feirasFavoritos = await fetch("https://6824f33d0f0188d7e72b84a7.mockapi.io/v1/api/favoritos")
            const feirasFavoritosJSON = await feirasFavoritos.json()
            setFavoritos(feirasFavoritosJSON)
        }
        getAllFavoritos()
    }, [])
    return (
        <FeiraContext.Provider value={{ favoritos, setFavoritos }}>
            {children}
        </FeiraContext.Provider>
    )
}

export default ContextProvider