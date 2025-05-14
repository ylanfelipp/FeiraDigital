import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Feira from './pages/Feira'
import Favoritos from './pages/Favoritos'
import Produto from './pages/Produto'
import Home from './pages/Home'
import Navbar from './components/Navbar'

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/feiras/:id" element={<Feira />} />
                        <Route path="/favoritos" element={<Favoritos />} />
                        <Route path="/produtos/:id" element={<Produto />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    )
}

export default App