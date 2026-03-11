import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="nav-logo">
            <Link to="/">
              {/* SEO & PERF: Dimensions explicites + alt descriptif */}
              <img
                src="/images/Logo.webp"
                alt="CafThé - Maison de thé et café d'exception"
                width="135"
                height="135"
              />
            </Link>
          </div>
          <p className="brand-description">
            L'excellence du thé et du café, sélectionnés avec passion.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h3>Mon Espace</h3>
            <ul>
              {/* PERF: Utilisation de Link (React Router) au lieu de <a> */}
              <li>
                <Link to="/register">Créer un compte</Link>
              </li>
              <li>
                <Link to="/login">Connexion</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Boutique</h3>
            <ul>
              <li>
                <Link to="/produits?category=thes">Thés</Link>
              </li>
              <li>
                <Link to="/produits?category=cafes">Cafés</Link>
              </li>
              <li>
                <Link to="/produits?category=accessoires">Accessoires</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Informations</h3>
            <ul>
              <li>
                <Link to="/about">Notre Histoire</Link>
              </li>
              <li>
                <Link to="/cgv">CGV</Link>
              </li>
              <li>
                <Link to="/mentions-legales">Mentions légales</Link>
              </li>
              <li>
                <Link to="/plan">Plan du Site</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Aide</h3>
            <ul>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
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
