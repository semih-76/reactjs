import React, { useContext } from 'react';
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
// N'oublie pas d'installer react-icons : npm install react-icons
import { FiSearch, FiUser, FiShoppingBag } from "react-icons/fi";

const Navbar = () => {
    const { user, isAuthenticated, logout } = useContext(AuthContext);

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
                <NavLink to="/catalogue">Catalogue</NavLink>
                <span className="separator">|</span>
                <NavLink to="/about">Notre Histoire</NavLink>
            </div>


            <div className="nav-group-icons">
                <FiSearch className="nav-icon" />

                {isAuthenticated ? (
                    <div className="user-logged" onClick={logout} title="Se déconnecter">
                        <span className="user-name">{user.prenom}</span>
                        <FiUser className="nav-icon-active" />
                    </div>
                ) : (
                    <Link to="/login"><FiUser className="nav-icon" /></Link>
                )}

                <Link to="/panier" className="cart-link">
                    <FiShoppingBag className="nav-icon" />
                    <span className="cart-count"></span>
                </Link>
            </div>
        </nav>
    );
};
export default Navbar;