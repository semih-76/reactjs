import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Composants critiques chargés immédiatement
import Layout from "./layout/Layout.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

// Contexts (toujours chargés immédiatement)
import { AuthProvider } from "./context/authContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { CheckoutProvider } from "./pages/CheckoutContext.jsx";

// Styles
import "./styles/style.css";
import "./styles/responsive.css";

// Lazy loading des pages (code splitting)
const Home = lazy(() => import("./pages/Home.jsx"));
const ProductDetails = lazy(() => import("./pages/ProductDetails.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const ProductList = lazy(() => import("./pages/ProductList.jsx"));
const Panier = lazy(() => import("./pages/Panier.jsx"));
const EspaceClient = lazy(() => import("./pages/EspaceClient.jsx"));
const NotreHistoire = lazy(() => import("./pages/NotreHistoire"));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const CGV = lazy(() => import("./pages/CGV"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const PlanduSite = lazy(() => import("./pages/PlanduSite.jsx"));
const CheckoutLivraison = lazy(() => import("./pages/CheckoutLivraison.jsx"));
const Checkoutpaiement = lazy(() => import("./pages/Checkoutpaiement.jsx"));
const Checkoutconfirmation = lazy(
  () => import("./pages/Checkoutconfirmation.jsx"),
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <CheckoutProvider>
            <Suspense
              fallback={<LoadingSpinner message="Chargement de la page..." />}
            >
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
                  <Route
                    path="mentions-legales"
                    element={<MentionsLegales />}
                  />
                  <Route path="cgv" element={<CGV />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="faq" element={<FAQ />} />
                  <Route path="plan" element={<PlanduSite />} />
                  <Route
                    path="checkout/livraison"
                    element={<CheckoutLivraison />}
                  />
                  <Route
                    path="checkout/paiement"
                    element={<Checkoutpaiement />}
                  />
                  <Route
                    path="checkout/confirmation"
                    element={<Checkoutconfirmation />}
                  />
                </Route>
              </Routes>
            </Suspense>
          </CheckoutProvider>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
