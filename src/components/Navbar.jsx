import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { FiSearch, FiUser, FiShoppingBag, FiChevronDown, FiX } from "react-icons/fi";

const Navbar = () => {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const [showCatalogue, setShowCatalogue] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef(null);
    const navigate = useNavigate();

    // Focus automatique quand la barre s'ouvre
    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchOpen]);

    // Fermer avec Échap
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSearchOpen(false);
                setSearchQuery('');
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/produits?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchOpen(false);
            setSearchQuery('');
        }
    };

    const handleSearchClose = () => {
        setSearchOpen(false);
        setSearchQuery('');
    };

    return (
        <>
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
                    <button
                        className={`nav-icon nav-search-btn ${searchOpen ? 'active' : ''}`}
                        onClick={() => setSearchOpen(!searchOpen)}
                        aria-label="Rechercher"
                    >
                        <FiSearch />
                    </button>

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

            {/* ── BARRE DE RECHERCHE ── */}
            <div className={`search-overlay ${searchOpen ? 'search-overlay--open' : ''}`}>
                <form className="search-bar-form" onSubmit={handleSearchSubmit}>
                    <FiSearch className="search-bar-icon" />
                    <input
                        ref={searchInputRef}
                        type="text"
                        className="search-bar-input"
                        placeholder="Rechercher un thé, un café, un accessoire…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        type="button"
                        className="search-bar-close"
                        onClick={handleSearchClose}
                        aria-label="Fermer la recherche"
                    >
                        <FiX />
                    </button>
                </form>
            </div>

            {/* Backdrop pour fermer en cliquant dehors */}
            {searchOpen && (
                <div className="search-backdrop" onClick={handleSearchClose} />
            )}
        </>
    );
};

export default Navbar;