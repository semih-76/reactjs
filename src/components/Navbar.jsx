import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../context/authContext.jsx";

const Navbar = () => {

    const { user, isAuthenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }

    return (
        <nav className='navbar'>
            <Link to='/' className="navbar-brand">
                CafThé
            </Link>

            <div className="navbar-right">
                {/* Affichage conditionnel : connecté ou non */}
                {isAuthenticated ? (
                    <>
                        <span className="navbar-user">
                            Bonjour {user.prenom} {user.nom}
                        </span>
                        <button className="navbar-logout-button"
                                onClick={handleLogout}
                        >
                            Se déconnecter
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="navbar-link">
                       Se connecter
                   </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;