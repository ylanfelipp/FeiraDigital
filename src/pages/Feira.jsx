import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProdutoCard from '../components/ProdutoCard'

const Feira = () => {
    const params = useParams()
    const [feira, setFeira] = useState({})
    const [produtos, setProdutos] = useState([])

    useEffect(() => {
        const getFeiraById = async () => {
            const resp = await fetch("http://localhost:4040/v1/api/feiras/" + params.id, {
                credentials: "include"
            })
            const feira = await resp.json()
            setFeira(feira)
        }
        const getProdutos = async () => {
            const resp = await fetch("http://localhost:4040/v1/api/produtos/feiras/" + params.id, {
                credentials: "include"
            })
            const produtosJSON = await resp.json()
            console.log(produtosJSON)
            setProdutos(Array.isArray(produtosJSON) ? produtosJSON : [])
        }
        getProdutos()
        getFeiraById()
    }, [params.id])

    return (
        <div className="m-4">
            <div className="my-4">
                <div className="text-[#1B263B]">
                    <h2 className="text-3xl font-semibold">
                        {feira.nome}
                    </h2>
                    <div>
                        <span className="opacity-70">
                            {feira.endereco}
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
                <div className="flex gap-2">
                    {produtos.map(produto => (
                        <ProdutoCard { ...produto } key={produto._id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Feira