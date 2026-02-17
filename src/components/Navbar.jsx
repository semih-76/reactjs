import React, { useContext, useState } from 'react'; // Ajout de useState ici
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { FiSearch, FiUser, FiShoppingBag, FiChevronDown } from "react-icons/fi";

const Navbar = () => {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    // AJOUTER CETTE LIGNE :
    const [showCatalogue, setShowCatalogue] = useState(false);

    return (
        <nav className='navbar'>
            <div className="nav-logo">
                <Link to='/'>
                    <img src="/images/Logo.svg" alt="CafThé" />
                </Link>
            </div>

            <div className="nav-group-links">
                <NavLink to="/">Accueil</NavLink>
                <span className="separator">|</span>

                <div
                    className="nav-dropdown"
                    onMouseEnter={() => setShowCatalogue(true)}
                    onMouseLeave={() => setShowCatalogue(false)}
                >
                    <NavLink to="/catalogue" className="dropdown-trigger">
                        Catalogue <FiChevronDown style={{ fontSize: '0.8rem', marginLeft: '4px' }} />
                    </NavLink>

                    {showCatalogue && (
                        <div className="dropdown-menu" style={{ position: 'absolute', backgroundColor: 'white', zIndex: 10, padding: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                            <Link to="/produits?category=thes" style={{ display: 'block', padding: '5px 0' }}>Thés</Link>
                            <Link to="/produits?category=cafes" style={{ display: 'block', padding: '5px 0' }}>Cafés</Link>
                            <Link to="/produits?category=accessoires" style={{ display: 'block', padding: '5px 0' }}>Accessoires</Link>
                        </div>
                    )}
                </div>

                <span className="separator">|</span>
                <NavLink to="/about">Notre Histoire</NavLink>
            </div>

            <div className="nav-group-icons">
                <FiSearch className="nav-icon" />

                {isAuthenticated ? (
                    <Link to="/espace-client" className="user-logged" title="Mon Espace Client">
                        <span className="user-name">{user?.prenom}</span>
                        <FiUser className="nav-icon-active" />
                    </Link>
                ) : (
                    <Link to="/login" title="Connexion">
                        <FiUser className="nav-icon" />
                    </Link>
                )}

                <Link to="/panier" className="cart-link" title="Mon Panier">
                    <FiShoppingBag className="nav-icon" />
                </Link>
            </div>
        </nav>
    );
};
export default Navbar;