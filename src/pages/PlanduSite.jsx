import React from 'react';
import { Link } from "react-router-dom";

const PlanduSite = () => {
    return (
        <main className="sitemap-wrapper">
            <div className="sitemap-container">
                <header className="sitemap-header">
                    <h1>Plan du Site</h1>
                    <p>Retrouvez toutes les pages de notre boutique CafThé en un coup d'œil.</p>
                </header>

                <section className="sitemap-grid">
                    {/* Colonne 1 : Navigation */}
                    <div className="sitemap-column">
                        <div className="sitemap-icon"></div>
                        <h3>Navigation</h3>
                        <ul>
                            <li><Link to="/">Accueil</Link></li>
                            <li><Link to="/catalogue">Catalogue</Link></li>
                            <li><Link to="/about">Notre Histoire</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Colonne 2 : Boutique */}
                    <div className="sitemap-column">
                        <div className="sitemap-icon"></div>
                        <h3>Boutique</h3>
                        <ul>
                            <li><Link to="/produits?category=thes">Thés</Link></li>
                            <li><Link to="/produits?category=cafes">Cafés</Link></li>
                            <li><Link to="/produits?category=accessoires">Accessoires</Link></li>
                            <li><Link to="/panier">Mon Panier</Link></li>
                        </ul>
                    </div>

                    {/* Colonne 3 : Mon Espace */}
                    <div className="sitemap-column">
                        <div className="sitemap-icon"></div>
                        <h3>Mon Espace</h3>
                        <ul>
                            <li><Link to="/login">Connexion</Link></li>
                            <li><Link to="/register">Créer un compte</Link></li>
                            <li><Link to="/espace-client">Mon espace</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Colonne 4 : Légal */}
                    <div className="sitemap-column">
                        <div className="sitemap-icon"></div>
                        <h3>Informations</h3>
                        <ul>
                            <li><Link to="/livraison">Suivi de livraison</Link></li>
                            <li><Link to="/cgv">Conditions Générales</Link></li>
                            <li><Link to="/mentions-legales">Mentions Légales</Link></li>
                            <li><Link to="/plan">Plan du Site</Link></li>
                        </ul>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default PlanduSite;