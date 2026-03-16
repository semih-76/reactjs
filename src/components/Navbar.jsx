import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { useCart } from "../context/CartContext";
import {
  FiSearch,
  FiUser,
  FiShoppingBag,
  FiChevronDown,
  FiX,
} from "react-icons/fi";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { items } = useCart();
  const [showCatalogue, setShowCatalogue] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const debouncedQuery = useDebounce(searchQuery, 350);

  // Total articles dans le panier
  const totalItems = items.reduce((acc, item) => acc + item.quantite, 0);

  // Scroll lock quand menu ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!debouncedQuery.trim() || debouncedQuery.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/articles?search=${encodeURIComponent(debouncedQuery.trim())}&limit=5`,
        );
        const data = await res.json();
        const results = Array.isArray(data.articles) ? data.articles : [];
        setSearchResults(results);
        setShowResults(true);
      } catch (err) {
        console.error("Erreur de recherche :", err);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleSearchClose();
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/produits?search=${encodeURIComponent(searchQuery.trim())}`);
      handleSearchClose();
    }
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  const handleResultClick = (article) => {
    navigate(`/produit/${article.ID_Article}`);
    handleSearchClose();
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="navbar-wrapper">
        <nav className="navbar">
          <div className="nav-logo">
            <Link to="/">
              <img src="/images/Logo.webp" alt="CafThé" />
            </Link>
          </div>

          {/* Liens desktop */}
          <div className="nav-group-links">
            <NavLink to="/">Accueil</NavLink>
            <span className="separator">|</span>

            <div
              className="nav-dropdown"
              onMouseEnter={() => setShowCatalogue(true)}
              onMouseLeave={() => setShowCatalogue(false)}
            >
              <NavLink
                to="produits"
                className="dropdown-trigger"
                aria-label="Catalogue"
              >
                Catalogue{" "}
                <FiChevronDown
                  style={{ fontSize: "0.8rem", marginLeft: "4px" }}
                />
              </NavLink>

              {showCatalogue && (
                <div
                  className="dropdown-menu"
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    zIndex: 10,
                    padding: "10px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  }}
                >
                  <Link
                    to="/produits?category=thes"
                    style={{ display: "block", padding: "5px 0" }}
                  >
                    Thés
                  </Link>
                  <Link
                    to="/produits?category=cafes"
                    style={{ display: "block", padding: "5px 0" }}
                  >
                    Cafés
                  </Link>
                  <Link
                    to="/produits?category=accessoires"
                    style={{ display: "block", padding: "5px 0" }}
                  >
                    Accessoires
                  </Link>
                </div>
              )}
            </div>

            <span className="separator">|</span>
            <NavLink to="/about">Notre Histoire</NavLink>
          </div>

          <div className="nav-group-icons">
            <button
              className="nav-icon"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Rechercher"
              style={{ background: "none", border: "none" }}
            >
              <FiSearch />
            </button>

            {isAuthenticated ? (
              <Link
                to="/espace-client"
                className="user-logged"
                title="Mon Espace Client"
              >
                <span className="user-name">{user?.prenom}</span>
                <FiUser className="nav-icon" />
              </Link>
            ) : (
              <Link to="/login" title="Connexion">
                <FiUser className="nav-icon" />
              </Link>
            )}

            {/* Icône panier avec badge compteur */}
            <Link to="/panier" className="cart-link" title="Mon Panier">
              <FiShoppingBag className="nav-icon" />
              {totalItems > 0 && (
                <span className="cart-badge" key={totalItems}>
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            {/* Bouton burger */}
            <button
              className={`nav-burger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>

        {/* Menu mobile */}
        <div className={`nav-mobile-menu ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" onClick={closeMenu}>
            Accueil
          </NavLink>
          <NavLink to="/produits" onClick={closeMenu}>
            Catalogue
          </NavLink>
          <NavLink
            to="/produits?category=thes"
            onClick={closeMenu}
            className="nav-mobile-sub"
          >
            — Thés
          </NavLink>
          <NavLink
            to="/produits?category=cafes"
            onClick={closeMenu}
            className="nav-mobile-sub"
          >
            — Cafés
          </NavLink>
          <NavLink
            to="/produits?category=accessoires"
            onClick={closeMenu}
            className="nav-mobile-sub"
          >
            — Accessoires
          </NavLink>
          <NavLink to="/about" onClick={closeMenu}>
            Notre Histoire
          </NavLink>
        </div>
      </div>

      {menuOpen && <div className="nav-mobile-backdrop" onClick={closeMenu} />}

      {/* Barre de recherche */}
      <div
        className={`search-overlay ${searchOpen ? "search-overlay--open" : ""}`}
      >
        <form className="search-bar-form" onSubmit={handleSearchSubmit}>
          <FiSearch className="search-bar-icon" />
          <input
            aria-label="Rechercher"
            ref={searchInputRef}
            type="text"
            className="search-bar-input"
            placeholder="Rechercher un thé, un café, un accessoire…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {isLoading && <span className="search-spinner" />}
          <button
            type="button"
            className="search-bar-close"
            onClick={handleSearchClose}
            aria-label="Fermer la recherche"
          >
            <FiX />
          </button>
        </form>

        {showResults && (
          <ul className="search-results-dropdown">
            {searchResults.length === 0 && !isLoading ? (
              <li className="search-result-empty">
                Aucun résultat pour « {debouncedQuery} »
              </li>
            ) : (
              searchResults.map((article) => (
                <li
                  key={article.ID_Article}
                  className="search-result-item"
                  onClick={() => handleResultClick(article)}
                >
                  {article.images ? (
                    <img
                      src={`/images/${article.images}`}
                      alt={article.nom_produit}
                      className="search-result-img"
                    />
                  ) : (
                    <div className="search-result-img-placeholder">☕</div>
                  )}
                  <div className="search-result-info">
                    {article.categorie && (
                      <span className="search-result-category">
                        {article.categorie}
                      </span>
                    )}
                    <span className="search-result-name">
                      {article.nom_produit}
                    </span>
                    <span className="search-result-price">
                      {article.prix_ttc
                        ? `${parseFloat(article.prix_ttc).toFixed(2)} €`
                        : ""}
                    </span>
                  </div>
                </li>
              ))
            )}
            {searchResults.length > 0 && (
              <li className="search-result-all">
                <button onClick={handleSearchSubmit}>
                  Voir tous les résultats pour « {debouncedQuery} »
                </button>
              </li>
            )}
          </ul>
        )}
      </div>

      {searchOpen && (
        <div className="search-backdrop" onClick={handleSearchClose} />
      )}
    </>
  );
};

export default Navbar;
