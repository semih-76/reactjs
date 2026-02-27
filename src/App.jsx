import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProductList from "./pages/ProductList.jsx";
import Panier from "./pages/Panier.jsx";
import EspaceClient from "./pages/EspaceClient.jsx";
import NotreHistoire from './pages/NotreHistoire';
import MentionsLegales from "./pages/MentionsLegales";
import CGV from "./pages/CGV";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import PlanduSite from "./pages/PlanduSite.jsx";

import CheckoutLivraison from "./pages/CheckoutLivraison.jsx";
import Checkoutpaiement from "./pages/Checkoutpaiement.jsx";
import Checkoutconfirmation from "./pages/Checkoutconfirmation.jsx";

import { AuthProvider } from "./context/authContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { CheckoutProvider } from "./pages/CheckoutContext.jsx";

import './styles/style.css';
import './styles/responsive.css';
import ScrollToTop from "./components/ScrollToTop.jsx";



function App() {
    return (
        <AuthProvider>
            <CartProvider>
                    <BrowserRouter>
                        <ScrollToTop />
                            <CheckoutProvider>
                            <Routes>
                                <Route path="/" element={<Layout />}>
                                    <Route index element={<Home />} />
                                    <Route path="produit/:id" element={<ProductDetails />} />
                                    <Route path="login" element={<Login />} />
                                    <Route path="register" element={<Register />} />
                                    <Route path="produits" element={<ProductList />} />
                                    <Route path="panier" element={<Panier />} />
                                    <Route path="espace-client" element={<EspaceClient />} />
                                    <Route path="about" element={<NotreHistoire />} />
                                    <Route path="mentions-legales" element={<MentionsLegales />} />
                                    <Route path="cgv" element={<CGV />} />
                                    <Route path="contact" element={<Contact />} />
                                    <Route path="faq" element={<FAQ />} />
                                    <Route path="plan" element={<PlanduSite />} />

                                    <Route path="checkout/livraison" element={<CheckoutLivraison />} />
                                    <Route path="checkout/paiement" element={<Checkoutpaiement />} />
                                    <Route path="checkout/confirmation" element={<Checkoutconfirmation />} />

                                </Route>
                            </Routes>
                        </CheckoutProvider>
                    </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;