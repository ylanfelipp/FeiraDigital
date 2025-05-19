import { useEffect, useState } from 'react'
import FeiraCard from '../components/FeiraCard'

const Home = () => {
    const [feiras, setFeiras] = useState([])

    useEffect(() => {
        const getAllFeiras = async () => {
            const resp = await fetch("http://localhost:4040/v1/api/feiras", {
                credentials: "include"
            })
            const feirasJSON = await resp.json()
            // Garante que feiras seja sempre um array
            setFeiras(Array.isArray(feirasJSON) ? feirasJSON : [])
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