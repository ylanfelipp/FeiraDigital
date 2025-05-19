import { useContext } from 'react'
import { Link } from 'react-router-dom'
import FeiraContext from '../context/FeiraContext'

const FeiraCard = ({ _id, nome, cidade, horario }) => {
    const { favoritos, setFavoritos, usuario } = useContext(FeiraContext)

    const handleFavoritos = async () => {
        if (!usuario) {
            alert("Você precisa estar logado para favoritar uma feira.")
            return
        }

        if (favoritos.some(feira => feira._id === _id)) {
            alert("Feira já está nos favoritos.")
            return
        }

        const feiraFavorita = {_id, nome, cidade, horario, userId: usuario.id }
        console.log(feiraFavorita)

        await fetch('http://localhost:4040/v1/api/favoritos', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(feiraFavorita)
        })
            setFavoritos(feiras => [...feiras, feiraFavorita])
            alert("Feira adicionada aos favoritos")
    }

    return (
        <div className="bg-[#E0E1DD] flex justify-between items-center w-[30rem] my-4 p-4 rounded-xl">
            <Link to={`/feiras/${_id}`}>
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