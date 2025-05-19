import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const Login = ({ onLogin }) => {
    const [form, setForm] = useState({ email: "", senha: "" })
    const [mensagem, setMensagem] = useState("")
    const navigate = useNavigate()

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const resp = await onLogin(form.email, form.senha)
        if (resp.sucesso) {
            navigate("/")
        } else {
            setMensagem(resp.mensagem)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#E0E1DD]">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-md flex flex-col gap-4 w-[22rem] border border-[#1B263B]"
            >
                <h2 className="text-2xl font-bold text-[#1B263B] mb-2">Login</h2>
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
                    Entrar
                </button>
                <div className="text-center mt-2">
                    Não tem uma conta?{" "}
                    <Link to="/cadastro" className="text-[#415A77] underline hover:text-[#1B263B]">
                        Cadastre-se
                    </Link>
                </div>
                {mensagem && (
                    <div className="text-center text-[#1B263B] mt-2">{mensagem}</div>
                )}
            </form>
        </div>
    )
}

export default Login