import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FeiraContext } from '../context/ContextProvider'

const FeiraFavoritoCard = ({ id, nome, cidade, horario }) => {
    const { favoritos, setFavoritos } = useContext(FeiraContext)

    const handleDelete = async () => {
        const responseJSON = await fetch("https://6824f33d0f0188d7e72b84a7.mockapi.io/v1/api/favoritos/" + id, {
            method: "DELETE"
        })

        const content = await responseJSON.json()
        setFavoritos(feiras => feiras.filter(feira => feira.id !== content.id))
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
                    className="bg-red-500 text-white font-semibold p-2 cursor-pointer rounded"
                    onClick={handleDelete}
                >
                    Excluir
                </button>
            </div>
        </div>
    )
}

export default FeiraFavoritoCard