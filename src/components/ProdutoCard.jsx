import { Link } from "react-router-dom"

const ProdutoCard = ({ _id, nome, imagem, preco, loja }) => {
    return (
        <div className="flex flex-col justify-center items-center mx-4 w-[20rem] h-[25rem] p-4 my-4 bg-[#E0E1DD] text-center">
            <div>
                <img src={imagem} alt="produto.jpg" className="h-[15rem] object-cover" />
            </div>
            <div>
                <p className="my-4">
                    <strong>{nome}</strong>
                </p>
                <p className="my-3">
                    R$ {preco.toString().replace('.', ',')}
                </p>
            </div>
            <div className="my-2">
                <Link to={`/${loja}/produtos/${_id}`}>
                    <button className="btn-details">
                        Detalhes
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default ProdutoCard