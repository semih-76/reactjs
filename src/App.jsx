import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails.jsx";
import Login from "./pages/Login.jsx";
import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import { AuthProvider } from "./context/authContext.jsx";
// --- AJOUT DE L'IMPORT ICI ---
import { CartProvider } from "./context/CartContext.jsx";
import './styles/style.css';
import Register from "./pages/Register.jsx";
import ProductList from "./pages/ProductList.jsx";
import Panier from "./pages/Panier.jsx";
import EspaceClient from "./pages/EspaceClient.jsx";


function App() {
    return (
        <AuthProvider>
            {/* --- AJOUT DU CARTPROVIDER ICI --- */}
            <CartProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="produit/:id" element={<ProductDetails />} />
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route path="produits" element={<ProductList />} />
                            <Route path="panier" element={<Panier />} />
                            <Route path="espace-client" element={<EspaceClient />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    )
}

export default App;