import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const ProductDetails = () => {
    const { id } = useParams();

    const [produit, setProduit] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedWeight, setSelectedWeight] = useState('50g');
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        const fetchProduit = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/articles/${id}`,
                );

                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }

                const data = await response.json();
                setProduit(data.article);
            } catch (err) {
                console.error("Erreur lors du chargement du produit :", err);
                setError("Impossible de charger le produit");
            } finally {
                setIsLoading(false);
            }
        };

        void fetchProduit();
    }, [id]);

    const incrementQuantity = () => setQuantity(quantity + 1);
    const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);

    const calculateTotal = () => {
        if (!produit) return 0;
        return (produit.prix_ttc * quantity).toFixed(2);
    };

    if (isLoading) {
        return (
            <div className="product-details-wrapper">
                <div className="product-details-container">
                    <div className="product-main">
                        <div className="product-gallery">
                            <Skeleton height={500} />
                            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                                <Skeleton width={100} height={100} />
                                <Skeleton width={100} height={100} />
                            </div>
                        </div>
                        <div className="product-info-section">
                            <Skeleton width="30%" height={20} />
                            <Skeleton width="70%" height={40} style={{ marginTop: '10px' }} />
                            <Skeleton width="40%" height={20} style={{ marginTop: '10px' }} />
                            <Skeleton count={3} style={{ marginTop: '20px' }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-details-wrapper">
                <div className="product-details-container">
                    <div className="product-list-error">
                        <div className="error-container">
                            <h3>Une erreur est survenue</h3>
                            <p>{error}</p>
                            <Link to="/" className="back-link">
                                Retour à l'accueil
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Image provenant de l'API
    const imageUrl = produit.images
        ? `${import.meta.env.VITE_API_URL}/images/${produit.images}`
        : `https://placehold.co/600x600?text=${produit.nom_produit}`;

    // Poids disponibles
    const weights = ['50g', '100g', '250g', '500g', '1kg'];

    // Produits complémentaires (exemple statique - à remplacer par un appel API)
    const relatedProducts = [
        { id: 1, category: 'CAFÉS', name: 'Café Kenya AA', price: '19.90', image: imageUrl },
        { id: 2, category: 'CAFÉS', name: 'Café Colombie Supremo', price: '16.90', image: imageUrl },
        { id: 3, category: 'CAFÉS', name: 'Café Brésil Santos', price: '14.90', image: imageUrl }
    ];

    // Avis clients (exemple statique)
    const reviews = [
        { id: 1, author: 'Marie D.', rating: 5, date: '15 janvier 2026', comment: 'Excellent café, arômes complexes et délicats. Je recommande vivement !' },
        { id: 2, author: 'Pierre L.', rating: 5, date: '8 janvier 2026', comment: 'Un des meilleurs cafés que j\'ai goûtés. Livraison rapide.' },
        { id: 3, author: 'Sophie M.', rating: 4, date: '2 janvier 2026', comment: 'Très bon café avec des notes fruitées prononcées.' }
    ];

    return (
        <main className="product-details-wrapper">
            <div className="product-details-container">
                {/* Fil d'Ariane */}
                <nav className="breadcrumb">
                    <Link to="/">Accueil</Link>
                    <span>/</span>
                    <Link to="/produits">Cafés</Link>
                    <span>/</span>
                    <span>{produit.nom_produit}</span>
                </nav>

                {/* Section principale du produit */}
                <section className="product-main">
                    {/* Galerie d'images */}
                    <div className="product-gallery">
                        <div className="gallery-main">
                            <img src={imageUrl} alt={produit.nom_produit} />
                        </div>
                        <div className="gallery-thumbnails">
                            <div className="thumbnail active">
                                <img src={imageUrl} alt={produit.nom_produit} />
                            </div>
                            <div className="thumbnail">
                                <img src={imageUrl} alt={produit.nom_produit} />
                            </div>
                        </div>
                    </div>

                    {/* Informations produit */}
                    <div className="product-info-section">
                        <span className="product-category-label">CAFÉS</span>
                        <h1 className="product-title">{produit.nom_produit}</h1>
                        <p className="product-reference">Référence: {produit.reference || 'N/A'}</p>

                        <div className="product-rating">
                            <div className="stars">★★★★☆</div>
                            <span className="rating-value">4.8 (24 avis)</span>
                        </div>

                        <p className="product-description">{produit.description || 'Description non disponible'}</p>

                        <div className="product-details-info">
                            <div className="info-row">
                                <span className="info-label">Origine:</span>
                                <span className="info-value">Éthiopie, région de Sidamo</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Disponibilité:</span>
                                <span className="info-value availability-stock">
                                    {produit.stock > 0 ? 'En stock' : 'Rupture de stock'}
                                </span>
                            </div>
                        </div>

                        {/* Sélecteur de poids */}
                        <div className="weight-selector">
                            <label>Quantité (poids)</label>
                            <div className="weight-options">
                                {weights.map((weight) => (
                                    <button
                                        key={weight}
                                        className={`weight-btn ${selectedWeight === weight ? 'active' : ''}`}
                                        onClick={() => setSelectedWeight(weight)}
                                    >
                                        {weight}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sélecteur de quantité */}
                        <div className="quantity-selector-section">
                            <label>Nombre d'unités</label>
                            <div className="quantity-controls">
                                <button onClick={decrementQuantity}>−</button>
                                <input type="number" value={quantity} readOnly />
                                <button onClick={incrementQuantity}>+</button>
                            </div>
                        </div>

                        {/* Prix et ajout au panier */}
                        <div className="product-price-section">
                            <div className="price-display">
                                <span className="price-label">Prix total:</span>
                                <span className="price-value">{calculateTotal()} €</span>
                            </div>
                            <button className="btn-add-to-cart">Ajouter au panier</button>
                        </div>
                    </div>
                </section>

                {/* Produits complémentaires */}
                <section className="related-products">
                    <h2>Produits complémentaires</h2>
                    <div className="related-products-grid">
                        {relatedProducts.map((item) => (
                            <div key={item.id} className="related-product-card">
                                <div className="related-product-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="related-product-info">
                                    <span className="related-category">{item.category}</span>
                                    <h3>{item.name}</h3>
                                    <span className="related-price">{item.price} €</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Avis clients */}
                <section className="customer-reviews">
                    <h2>Avis clients</h2>
                    <div className="reviews-list">
                        {reviews.map((review) => (
                            <div key={review.id} className="review-card">
                                <div className="review-header">
                                    <div className="review-author">
                                        <strong>{review.author}</strong>
                                        <div className="review-stars">
                                            {'★'.repeat(review.rating)}
                                            {'☆'.repeat(5 - review.rating)}
                                        </div>
                                    </div>
                                    <span className="review-date">{review.date}</span>
                                </div>
                                <p className="review-comment">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default ProductDetails;