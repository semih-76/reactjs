import React from "react";
import ProductList from "./ProductList.jsx";
import { Link } from "react-router-dom";

const Home = () => {

    return (
        <div className="home-container">

            <section className="hero">
                <div className="hero-content">
                    <h1>L'art du thé et du café</h1>
                    <p>Découvrez notre collection premium de thés et cafés d'exception, sélectionnées avec soin.</p>
                </div>
            </section>


            <section className="products">
                <h2>Produits Phares</h2>
                <p className="subtitle">Nos sélections coup de cœur pour découvrir l'excellence</p>

                {/* On passe une prop "limit" si tu veux gérer le slice dans ProductList */}
                <ProductList limit={3} />

                <div className="all-products">
                    <Link to="/catalogue" className="btn-outline">
                        Voir tous les produits →
                    </Link>
                </div>
            </section>


            <section className="engagements">
                <h2>Nos Engagements</h2>
                <p className="subtitle">Une démarche responsable pour un avenir durable</p>
                <div className="engagement-cards">
                    <div className="card">
                        <div className="icon">🍃</div>
                        <h3>100% Bio & Équitable</h3>
                        <p>Tous nos produits sont issus de l'agriculture biologique.</p>
                    </div>
                    <div className="card">
                        <div className="icon">♻️</div>
                        <h3>Emballages Recyclables</h3>
                        <p>Packaging écoresponsable pour préserver notre planète.</p>
                    </div>
                    <div className="card">
                        <div className="icon">🏅</div>
                        <h3>Qualité Premium</h3>
                        <p>Sélection rigoureuse des meilleurs terroirs.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;