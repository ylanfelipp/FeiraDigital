import React, { useEffect, useState } from 'react'
import FeiraCard from '../components/FeiraCard'

const Home = () => {

    const [feiras, setFeiras] = useState([])
    useEffect(() => {
        const getAllFeiras = async () => {
            const feiras = await fetch("https://6824f33d0f0188d7e72b84a7.mockapi.io/v1/api/feiras")
            const feirasJSON = await feiras.json()
            setFeiras(feirasJSON)
        }
        getAllFeiras()
    }, [])

    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl text-[#1B263B] font-bold my-4">
                Feiras da Cidade
            </h2>
            <div className="text-[#1B263B]">
                {feiras.map(feira => (
                    <FeiraCard {...feira} key={feira.nome} />
                ))}
            </div>
        </div>
    )
}

export default Home