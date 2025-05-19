import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const Cadastro = () => {
    const [form, setForm] = useState({ nome: "", email: "", senha: "" })
    const [mensagem, setMensagem] = useState("")
    const navigate = useNavigate()

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const resp = await fetch("http://localhost:4040/v1/api/usuarios/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            if (resp.ok) {
                setMensagem("Cadastro realizado com sucesso! Redirecionando para login...")
                setTimeout(() => navigate("/login"), 1500)
            } else {
                const erro = await resp.json()
                setMensagem(erro.mensagem || "Erro ao cadastrar. Tente novamente.")
            }
        } catch {
            setMensagem("Erro ao conectar com o servidor.")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#E0E1DD]">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-md flex flex-col gap-4 w-[22rem] border border-[#1B263B]"
            >
                <h2 className="text-2xl font-bold text-[#1B263B] mb-2">Cadastro</h2>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={form.nome}
                    onChange={handleChange}
                    className="p-2 rounded border border-[#415A77] focus:outline-none"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={form.email}
                    onChange={handleChange}
                    className="p-2 rounded border border-[#415A77] focus:outline-none"
                    required
                />
                <input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    value={form.senha}
                    onChange={handleChange}
                    className="p-2 rounded border border-[#415A77] focus:outline-none"
                    required
                />
                <button
                    type="submit"
                    className="bg-[#1B263B] text-white rounded py-2 font-semibold hover:bg-[#415A77] transition"
                >
                    Cadastrar
                </button>
                <div className="text-center mt-2">
                    Já tem uma conta?{" "}
                    <Link to="/login" className="text-[#415A77] underline hover:text-[#1B263B]">
                        Faça login
                    </Link>
                </div>
                {mensagem && (
                    <div className="text-center text-[#1B263B] mt-2">{mensagem}</div>
                )}
            </form>
        </div>
    )
}

export default Cadastro