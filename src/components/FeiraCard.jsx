import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FeiraContext } from '../context/ContextProvider'

const FeiraCard = ({ id, nome, cidade, horario }) => {
    const { favoritos, setFavoritos } = useContext(FeiraContext)
    
    const handleFavoritos = async () => {
        if (favoritos.some(feira => feira.nome === nome)) {
            return
        }

        const favoritosJSON = await fetch("https://6824f33d0f0188d7e72b84a7.mockapi.io/v1/api/favoritos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ id, nome, cidade, horario })
        })

        const content = await favoritosJSON.json()

        setFavoritos(feiras => [...feiras, content])
    }

    return (
        <div className="bg-[#E0E1DD] flex justify-between items-center w-[30rem] my-4 p-4 rounded-xl">
            <Link to={`/feiras/${id}`}>
                <div className="flex flex-col">
                    <strong>{nome}</strong>
                    <span className="opacity-90">
                        {cidade}
                    </span>
                    <span className="opacity-60 text-green-600">
                        {horario}
                    </span>
                </div>
            </Link>
            <div>
                <button 
                    className="bg-[#1B263B] text-white font-semibold p-2 cursor-pointer rounded"
                    onClick={handleFavoritos}
                >
                    Favoritar
                </button>
            </div>
        </div>
    )
}

export default FeiraCard