import React, { useContext } from 'react'
import { FeiraContext } from '../context/ContextProvider'
import FeiraFavoritoCard from '../components/FeiraFavoritoCard'

const Favoritos = () => {
    const { favoritos } = useContext(FeiraContext)
    return (
        <div className="flex flex-col justify-center items-center">
            <div>
                <h2 className="text-2xl text-[#1B263B] font-bold my-4">
                    Favoritos
                </h2>
            </div>
            <div className="text-[#1B263B]">
                {favoritos.map(feira => (
                    <FeiraFavoritoCard {...feira} key={feira.id} />
                ))}
            </div>
        </div>
    )
}

export default Favoritos