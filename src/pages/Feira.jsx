import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Feira = ({ }) => {
    const params = useParams()
    const [feira, setFeira] = useState({})
    useEffect(() => {
        const getFeiraById = async () => {
            const resp = await fetch("https://6824f33d0f0188d7e72b84a7.mockapi.io/v1/api/feiras/" + params.id)
            const feira = await resp.json()
            setFeira(feira)
        }
        getFeiraById()
    }, [])
    return (
        <div className="m-4">
            <div className="my-4">
                <div className="text-[#1B263B]">
                    <h2 className="text-3xl font-semibold">
                        {feira.nome}
                    </h2>
                    <div>
                        <span className="opacity-70">
                            {feira.cidade}
                        </span>
                        <br />
                        <span className="text-green-600 opacity-70">
                            {feira.horario}
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <h2 className="text-3xl font-semibold">
                        Produtos
                    </h2>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Feira