import { useContext } from "react"
import FeiraContext from "../context/FeiraContext"
import ProdutoCarrinhoCard from "../components/ProdutoCarrinhoCard"

const Carrinho = () => {
    const { carrinho, setCarrinho, usuario } = useContext(FeiraContext)

    const handleDelete = async (produtoId) => {
        if (!usuario) {
            alert("Você precisa estar logado para remover do carrinho.")
            return
        }
        const novoCarrinho = carrinho.filter(produto => produto._id !== produtoId)
        setCarrinho(novoCarrinho)

        await fetch('http://localhost:4040/v1/api/carrinho', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                userId: usuario.id,
                produtos: novoCarrinho
            })
        })

        alert("Produto removido do carrinho")
    }

    return (
        <div className="flex flex-col items-center">
            {carrinho.map(produto => (
                <ProdutoCarrinhoCard
                    key={produto._id}
                    produto={produto}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    )
}

export default Carrinho