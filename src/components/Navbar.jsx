import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header>
            <nav className="h-[4rem] bg-[#E0E1DD] text-[#1B263B] flex justify-around items-center">
                <Link to="/">
                    <h1 className="text-3xl font-bold">
                        Feira Digital
                    </h1>
                </Link>
                <div>
                    <Link to="/">
                        <button className="btn-link">
                            Início
                        </button>
                    </Link>
                    <Link to="/favoritos">
                        <button className="btn-link">
                            Favoritos
                        </button>
                    </Link>
                    <Link to="/carrinho">
                        <button className="btn-link">
                            Carrinho
                        </button>
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar