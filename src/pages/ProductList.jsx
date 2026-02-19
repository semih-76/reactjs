import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";
import { useCart } from '../context/CartContext';

// Fonction utilitaire : supprime les accents et met en minuscule
const normalize = (str) =>
    str?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";

const ProductList = ({ limit }) => {
    const { addToCart } = useCart();
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category') || 'all';

    const [produits, setProduits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(category);
    const [selectedPrice, setSelectedPrice] = useState('all');
    const [sortBy, setSortBy] = useState('');

    // ✅ Synchronise le filtre quand l'URL change (clic navbar)
    useEffect(() => {
        setSelectedCategory(category);
    }, [category]);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/articles`,
                );

                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }

                const data = await response.json();
                setProduits(data.articles || []);
            } catch (err) {
                console.error("Erreur lors du chargement des produits :", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        void fetchProduits();
    }, []);

    // Fonction de filtrage
    const getFilteredProducts = () => {
        let filtered = [...produits];

        // Mode Home : on retourne directement les N premiers
        if (limit) {
            return filtered.slice(0, limit);
        }

        // ✅ Filtre catégorie insensible aux accents et au "s" final
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(p => {
                const cat = normalize(p.categorie);
                const selected = normalize(selectedCategory);

                // Gère : "café" = "cafes", "thé" = "thes", "accessoire" = "accessoires"
                return cat.startsWith(selected.replace(/s$/, ''));
            });
        }

        if (selectedPrice === 'less20') {
            filtered = filtered.filter(p => parseFloat(p.prix_ttc) < 20);
        } else if (selectedPrice === '20-40') {
            filtered = filtered.filter(p => parseFloat(p.prix_ttc) >= 20 && parseFloat(p.prix_ttc) <= 40);
        } else if (selectedPrice === 'more40') {
            filtered = filtered.filter(p => parseFloat(p.prix_ttc) > 40);
        }

        if (sortBy === 'price-asc') {
            filtered.sort((a, b) => parseFloat(a.prix_ttc) - parseFloat(b.prix_ttc));
        } else if (sortBy === 'price-desc') {
            filtered.sort((a, b) => parseFloat(b.prix_ttc) - parseFloat(a.prix_ttc));
        } else if (sortBy === 'name-asc') {
            filtered.sort((a, b) => a.nom_produit.localeCompare(b.nom_produit));
        } else if (sortBy === 'name-desc') {
            filtered.sort((a, b) => b.nom_produit.localeCompare(a.nom_produit));
        }

        return filtered;
    };

    const filteredProducts = getFilteredProducts();

    const getPageTitle = () => {
        if (selectedCategory === 'cafes') return 'Cafés';
        if (selectedCategory === 'thes') return 'Thés';
        if (selectedCategory === 'accessoires') return 'Accessoires';
        return 'Tous les produits';
    };

    // Mode simplifié pour la Home (sans sidebar)
    if (limit) {
        if (isLoading) {
            return (
                <div className="products-grid-home">
                    {Array.from({ length: limit }).map((_, i) => (
                        <div key={i}>
                            <Skeleton height={300} />
                            <div style={{ padding: '20px' }}>
                                <Skeleton height={15} width="40%" />
                                <Skeleton height={20} width="80%" style={{ marginTop: '10px' }} />
                                <Skeleton height={20} width="30%" style={{ marginTop: '10px' }} />
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        if (error) {
            return <div className="no-products">Erreur de chargement</div>;
        }

        return (
            <div className="products-grid-home">
                {filteredProducts.map((product) => {
                    const imageUrl = product.images
                        ? `${import.meta.env.VITE_API_URL}/images/${product.images}`
                        : 'https://placehold.co/400x400?text=Produit';

                    const hasDiscount = product.prix_barre && parseFloat(product.prix_barre) > parseFloat(product.prix_ttc);
                    const discountPercent = hasDiscount
                        ? Math.round(((parseFloat(product.prix_barre) - parseFloat(product.prix_ttc)) / parseFloat(product.prix_barre)) * 100)
                        : 0;

                    return (
                        <Link
                            key={product.id_articles}
                            to={`/produit/${product.id_articles}`}
                            className="catalog-product-card"
                        >
                            {hasDiscount && (
                                <span className="discount-badge">-{discountPercent}%</span>
                            )}

                            <div className="catalog-product-image">
                                <img src={imageUrl} alt={product.nom_produit} />
                            </div>

                            <div className="catalog-product-info">
    <span className="catalog-product-category">
        {product.categorie?.toUpperCase() || 'PRODUIT'}
    </span>
                                <h3 className="catalog-product-name">{product.nom_produit}</h3>

                                {/* ✅ Prix et bouton sur la même ligne */}
                                <div className="catalog-product-footer">
                                    <div className="catalog-product-prices">
                                        {hasDiscount && (
                                            <span className="price-original">{parseFloat(product.prix_barre).toFixed(2)} €</span>
                                        )}
                                        <span className={`price-current ${hasDiscount ? 'price-discounted' : ''}`}>
                {parseFloat(product.prix_ttc).toFixed(2)} €
            </span>
                                    </div>

                                    <button
                                        className="add-to-cart-btn"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToCart({
                                                id: product.id_articles,
                                                nom: product.nom_produit,
                                                prixUnitaire: parseFloat(product.prix_ttc),
                                                categorie: product.categorie,
                                                images: product.images
                                            });
                                        }}
                                    >
                                        Ajouter
                                    </button>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        );
    }

    // Mode complet pour le Catalogue (avec sidebar et filtres)
    if (isLoading) {
        return (
            <main className="catalog-wrapper">
                <div className="catalog-container">
                    <div className="catalog-header">
                        <Skeleton width={200} height={40} />
                        <Skeleton width={100} height={20} style={{ marginTop: '10px' }} />
                    </div>
                    <div className="catalog-layout">
                        <aside className="catalog-sidebar">
                            <Skeleton height={300} />
                        </aside>
                        <div className="products-grid">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="catalog-product-card">
                                    <Skeleton height={300} />
                                    <div style={{ padding: '20px' }}>
                                        <Skeleton height={15} width="40%" />
                                        <Skeleton height={20} width="80%" style={{ marginTop: '10px' }} />
                                        <Skeleton height={20} width="30%" style={{ marginTop: '10px' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="catalog-wrapper">
                <div className="catalog-container">
                    <div className="product-list-error">
                        <div className="error-container">
                            <h3>Une erreur est survenue</h3>
                            <p>{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="retry-button"
                            >
                                Réessayer
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="catalog-wrapper">
            <div className="catalog-container">
                <div className="catalog-header">
                    <h1 className="catalog-title">{getPageTitle()}</h1>
                    <p className="catalog-count">{filteredProducts.length} produits</p>
                </div>

                <div className="catalog-layout">
                    <aside className="catalog-sidebar">
                        <div className="filter-section">
                            <h3 className="filter-title">Catégorie</h3>
                            <div className="filter-options">
                                <label className="filter-option">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={selectedCategory === 'all'}
                                        onChange={() => setSelectedCategory('all')}
                                    />
                                    <span>Tous les produits</span>
                                </label>
                                <label className="filter-option">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={selectedCategory === 'thes'}
                                        onChange={() => setSelectedCategory('thes')}
                                    />
                                    <span>Thés</span>
                                </label>
                                <label className="filter-option">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={selectedCategory === 'cafes'}
                                        onChange={() => setSelectedCategory('cafes')}
                                    />
                                    <span>Cafés</span>
                                </label>
                                <label className="filter-option">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={selectedCategory === 'accessoires'}
                                        onChange={() => setSelectedCategory('accessoires')}
                                    />
                                    <span>Accessoires</span>
                                </label>
                            </div>
                        </div>

                        <div className="filter-section">
                            <h3 className="filter-title">Prix</h3>
                            <div className="filter-options">
                                <label className="filter-option">
                                    <input
                                        type="radio"
                                        name="price"
                                        checked={selectedPrice === 'all'}
                                        onChange={() => setSelectedPrice('all')}
                                    />
                                    <span>Tous les prix</span>
                                </label>
                                <label className="filter-option">
                                    <input
                                        type="radio"
                                        name="price"
                                        checked={selectedPrice === 'less20'}
                                        onChange={() => setSelectedPrice('less20')}
                                    />
                                    <span>Moins de 20€</span>
                                </label>
                                <label className="filter-option">
                                    <input
                                        type="radio"
                                        name="price"
                                        checked={selectedPrice === '20-40'}
                                        onChange={() => setSelectedPrice('20-40')}
                                    />
                                    <span>20€ - 40€</span>
                                </label>
                                <label className="filter-option">
                                    <input
                                        type="radio"
                                        name="price"
                                        checked={selectedPrice === 'more40'}
                                        onChange={() => setSelectedPrice('more40')}
                                    />
                                    <span>Plus de 40€</span>
                                </label>
                            </div>
                        </div>

                        <div className="filter-section">
                            <h3 className="filter-title">Trier par</h3>
                            <select
                                className="sort-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="">Par défaut</option>
                                <option value="price-asc">Prix croissant</option>
                                <option value="price-desc">Prix décroissant</option>
                                <option value="name-asc">Nom A-Z</option>
                                <option value="name-desc">Nom Z-A</option>
                            </select>
                        </div>
                    </aside>

                    <section className="catalog-products">
                        {filteredProducts.length === 0 ? (
                            <div className="no-products">Aucun produit trouvé</div>
                        ) : (
                            <div className="products-grid">
                                {filteredProducts.map((product) => {
                                    const imageUrl = product.images
                                        ? `${import.meta.env.VITE_API_URL}/images/${product.images}`
                                        : 'https://placehold.co/400x400?text=Produit';

                                    const hasDiscount = product.prix_barre && parseFloat(product.prix_barre) > parseFloat(product.prix_ttc);
                                    const discountPercent = hasDiscount
                                        ? Math.round(((parseFloat(product.prix_barre) - parseFloat(product.prix_ttc)) / parseFloat(product.prix_barre)) * 100)
                                        : 0;

                                    return (
                                        <Link
                                            key={product.id_articles}
                                            to={`/produit/${product.id_articles}`}
                                            className="catalog-product-card"
                                        >
                                            {hasDiscount && (
                                                <span className="discount-badge">-{discountPercent}%</span>
                                            )}

                                            <div className="catalog-product-image">
                                                <img src={imageUrl} alt={product.nom_produit} />
                                            </div>

                                            <div className="catalog-product-info">
                                                <span className="catalog-product-category">
                                                    {product.categorie?.toUpperCase() || 'PRODUIT'}
                                                </span>
                                                <h3 className="catalog-product-name">{product.nom_produit}</h3>

                                                <div className="catalog-product-footer">
                                                <div className="catalog-product-prices">
                                                    {hasDiscount && (
                                                        <span className="price-original">{parseFloat(product.prix_barre).toFixed(2)} €</span>
                                                    )}
                                                    <span className={`price-current ${hasDiscount ? 'price-discounted' : ''}`}>
                                                        {parseFloat(product.prix_ttc).toFixed(2)} €
                                                    </span>
                                                </div>

                                                <button
                                                    className="add-to-cart-btn"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        addToCart({
                                                            id: product.id_articles,
                                                            nom: product.nom_produit,
                                                            prixUnitaire: parseFloat(product.prix_ttc),
                                                            categorie: product.categorie,
                                                            images: product.images
                                                        });
                                                    }}
                                                >
                                                    Ajouter

                                                </button>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
};

export default ProductList;