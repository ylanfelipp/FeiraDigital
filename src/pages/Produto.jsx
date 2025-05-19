import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import FeiraContext from "../context/FeiraContext"

const Produto = () => {
    const { carrinho, setCarrinho, usuario } = useContext(FeiraContext)
    const { produtoId } = useParams()
    const [quantidadeCompra, setQuantidadeCompra] = useState(1)
    const [produto, setProduto] = useState({})

    useEffect(() => {
        const getProdutoById = async () => {
            const resp = await fetch("http://localhost:4040/v1/api/produtos/" + produtoId, {
                credentials: "include"
            })
            const produto = await resp.json()
            setProduto(produto)
        }
        getProdutoById()
    }, [produtoId])

    const handleCarrinho = async () => {
        if (!usuario) {
            alert("Você precisa estar logado para adicionar ao carrinho.")
            return
        }
        const novoCarrinho = [...carrinho, { ...produto, quantidadeCompra }]
        setCarrinho(novoCarrinho)
        await fetch('http://localhost:4040/v1/api/carrinho', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ userId: usuario.id, produtos: novoCarrinho })
        })
        alert("Produto adicionado ao carrinho")
    }

    const addQuantidadeCompra = () => {
        setQuantidadeCompra(quantidadeCompra => {
            if ((quantidadeCompra + 1) >= produto.quantidade) {
                return produto.quantidade
            }
            return quantidadeCompra + 1
        })
    }

    const subQuantidadeCompra = () => {
        setQuantidadeCompra(quantidadeCompra => {
            if ((quantidadeCompra - 1) <= 0) {
                return 0
            }
            return quantidadeCompra - 1
        })
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-[#E0E1DD] flex justify-around items-center w-[50rem] h-[30rem]">
                <div>
                    <img src={produto.imagem} alt="produto.png" className="w-[15rem]" />
                </div>
                <div>
                    <div className="text-[#1B263B]">
                        <h2 className="text-2xl font-bold">
                            {produto.nome}
                        </h2>
                        <strong className="text-3xl font-semibold">
                            R$ {produto.preco}
                        </strong>
                        <p>Estoque: {produto.quantidade}</p>
                    </div>
                    <div>
                        <button onClick={subQuantidadeCompra} className="bg-[#1B263B] h-[2rem] w-[2rem] text-white m-4 rounded-2xl cursor-pointer">
                            <span>-</span>
                        </button>
                        {quantidadeCompra}
                        <button onClick={addQuantidadeCompra} className="bg-[#1B263B] h-[2rem] w-[2rem] text-white m-4 rounded-2xl cursor-pointer">
                            <span>+</span>
                        </button>
                    </div>
                    <div className="my-4">
                        <button className="btn-details" onClick={handleCarrinho}>
                            Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Produto