import React from 'react';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Section Logo et Description */}
                <div className="footer-brand">
                    <div className="nav-logo">
                        <Link to='/'>
                            <img src="/images/Logo.svg" alt="CafThé" />
                        </Link>
                    </div>
                    <p className="brand-description">
                        L'excellence du thé et du café,
                        sélectionnés avec passion.
                    </p>
                </div>

                {/* Colonnes de liens */}
                <div className="footer-links">
                    <div className="footer-column">
                        <h4>Mon Espace</h4>
                        <ul>
                            <li><a href="/register">Créer un compte</a></li>
                            <li><a href="/login">Connexion</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Boutique</h4>
                        <ul>
                            <li><a href="/category/thes">Thés</a></li>
                            <li><a href="/category/cafes">Cafés</a></li>
                            <li><a href="/category/accessoires">Accessoires</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Informations</h4>
                        <ul>
                            <li><a href="/about">À propos</a></li>
                            <li><a href="/cgv">CGV</a></li>
                            <li><a href="/mentions-legales">Mentions légales</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Aide</h4>
                        <ul>
                            <li><a href="/livraison">Livraison</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/faq">FAQ</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2026 CAFTHÉ. Tous droits réservés.</p>
            </div>
        </footer>
    );
};

export default Footer;