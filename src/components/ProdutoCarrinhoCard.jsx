import React from "react"

const ProdutoCarrinhoCard = ({ produto, onDelete }) => {
    return (
        <div className="flex items-center justify-between bg-[#E0E1DD] rounded-lg shadow-md my-4 p-4 mb-4 w-full max-w-2xl">
            <div className="flex items-center gap-4">
                <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-20 h-20 object-cover rounded-md border border-[#1B263B]"
                />
                <div className="text-[#1B263B]">
                    <h3 className="font-bold text-lg">{produto.nome}</h3>
                    <p className="text-sm">Preço: <span className="font-semibold">R$ {produto.preco}</span></p>
                    <p className="text-sm">Quantidade: {produto.quantidadeCompra}</p>
                    <p className="text-sm">Estoque: {produto.quantidade}</p>
                    <p className="text-xs text-[#415A77]">ID: {produto._id}</p>
                </div>
            </div>
            <button
                onClick={() => onDelete(produto._id)}
                className="btn-details"
            >
                Remover
            </button>
        </div>
    )
}

export default ProdutoCarrinhoCard