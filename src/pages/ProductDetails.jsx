import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useCart } from "../context/CartContext";

const WEIGHTS = [
  { label: "100g", multiplier: 1 },
  { label: "250g", multiplier: 2.5 },
  { label: "500g", multiplier: 5 },
  { label: "1kg", multiplier: 10 },
];

const CATEGORY_URL = {
  cafes: "cafes",
  thes: "thes",
  accessoires: "accessoires",
};

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [produit, setProduit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedWeight, setSelectedWeight] = useState(WEIGHTS[0]);

  useEffect(() => {
    const fetchProduit = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/articles/${id}`,
        );
        if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);

        const data = await response.json();
        const produitRecu = data.article;

        console.log("Produit reçu:", produitRecu);
        console.log("Promo active:", produitRecu.promo_active);

        setProduit(produitRecu);

        const allRes = await fetch(
          `${import.meta.env.VITE_API_URL}/api/articles`,
        );
        const allData = await allRes.json();
        const all = allData.articles || allData || [];

        const related = all
          .filter(
            (p) =>
              p.ID_Article !== produitRecu.ID_Article &&
              p.categorie === produitRecu.categorie,
          )
          .slice(0, 3);
        setRelatedProducts(related);
      } catch (err) {
        console.error("Erreur lors du chargement du produit :", err);
        setError("Impossible de charger le produit");
      } finally {
        setIsLoading(false);
      }
    };
    window.scrollTo(0, 0);
    void fetchProduit();
  }, [id]);

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const priceForWeight = () => {
    if (!produit) return 0;
    const basePrice = produit.promo_active
      ? parseFloat(produit.prix_promo || produit.prix_ttc)
      : parseFloat(produit.prix_ttc);

    return basePrice * selectedWeight.multiplier;
  };

  const calculateTotal = () => {
    return (priceForWeight() * quantity).toFixed(2);
  };

  const handleAddToCart = () => {
    addToCart({
      id: produit.ID_Article,
      nom: `${produit.nom_produit} — ${selectedWeight.label}`,
      prixUnitaire: priceForWeight(),
      categorie: produit.categorie,
      images: produit.images,
      quantite: quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const reviews = [
    {
      id: 1,
      author: "Marie D.",
      rating: 5,
      date: "15 janvier 2026",
      comment:
        "Excellent produit, arômes complexes et délicats. Je recommande vivement !",
    },
    {
      id: 2,
      author: "Pierre L.",
      rating: 5,
      date: "8 janvier 2026",
      comment: "Un des meilleurs que j'ai goûtés. Livraison rapide et soignée.",
    },
    {
      id: 3,
      author: "Sophie M.",
      rating: 4,
      date: "2 janvier 2026",
      comment: "Très bon avec des notes subtiles et raffinées.",
    },
  ];

  if (isLoading) {
    return (
      <div className="product-details-wrapper">
        <div className="product-details-container">
          <div className="product-main">
            <div className="product-gallery">
              <Skeleton height={500} />
              <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
                <Skeleton width={100} height={100} />
              </div>
            </div>
            <div className="product-info-section">
              <Skeleton width="30%" height={20} />
              <Skeleton width="70%" height={40} style={{ marginTop: "10px" }} />
              <Skeleton count={4} style={{ marginTop: "15px" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !produit) {
    return (
      <div className="product-details-wrapper">
        <div className="product-details-container">
          <div className="product-list-error">
            <div className="error-container">
              <h3>Une erreur est survenue</h3>
              <p>{error}</p>
              <Link to="/produits" className="retry-button">
                Retour aux produits
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = produit.images
    ? `${import.meta.env.VITE_API_URL}/images/${produit.images}`
    : `https://placehold.co/600x600?text=${produit.nom_produit}`;

  const showWeightSelector = produit.categorie !== "accessoires";

  const categoryLabel =
    {
      cafes: "Cafés",
      thes: "Thés",
      accessoires: "Accessoires",
    }[produit.categorie] || produit.categorie;

  return (
    <main className="product-details-wrapper">
      <div className="product-details-container">
        <nav className="breadcrumb">
          <Link to="/">Accueil</Link>
          <span>/</span>
          <Link to="/produits">Produits</Link>
          <span>/</span>
          <Link
            to={`/produits?category=${CATEGORY_URL[produit.categorie] || produit.categorie}`}
          >
            {categoryLabel}
          </Link>
          <span>/</span>
          <span>{produit.nom_produit}</span>
        </nav>

        <section className="product-main">
          <div className="product-gallery">
            {produit.promo_active && produit.pourcentage_reduction && (
              <div className="pd-discount-badge">
                -{produit.pourcentage_reduction}%
              </div>
            )}

            <div className="gallery-main">
              <img src={imageUrl} alt={produit.nom_produit} />
            </div>
            <div className="gallery-thumbnails">
              <div className="thumbnail active">
                <img src={imageUrl} alt={produit.nom_produit} />
              </div>
            </div>
          </div>

          <div className="product-info-section">
            <span className="product-category-label">
              {categoryLabel.toUpperCase()}
            </span>

            <h1 className="product-title">{produit.nom_produit}</h1>

            <div className="product-rating">
              <div className="stars">★★★★☆</div>
              <span className="rating-value">4.8 (24 avis)</span>
            </div>

            {produit.description && (
              <p className="product-description">{produit.description}</p>
            )}

            <div className="product-details-info">
              {produit.origine && (
                <div className="info-row">
                  <span className="info-label">Origine :</span>
                  <span className="info-value">{produit.origine}</span>
                </div>
              )}
              <div className="info-row">
                <span className="info-label">Disponibilité :</span>
                <span
                  className={`info-value ${produit.stock > 0 ? "availability-stock" : "availability-out"}`}
                >
                  {produit.stock > 0 ? "En stock" : "Rupture de stock"}
                </span>
              </div>
            </div>

            {showWeightSelector && (
              <div className="weight-selector">
                <label>
                  Grammage
                  <span className="weight-base-price">
                    — prix de base : {parseFloat(produit.prix_ttc).toFixed(2)} €
                    / 100g
                  </span>
                </label>
                <div className="weight-options">
                  {WEIGHTS.map((w) => (
                    <button
                      key={w.label}
                      className={`weight-btn ${selectedWeight.label === w.label ? "active" : ""}`}
                      onClick={() => setSelectedWeight(w)}
                    >
                      <span className="weight-label">{w.label}</span>
                      <span className="weight-price">
                        {(parseFloat(produit.prix_ttc) * w.multiplier).toFixed(
                          2,
                        )}{" "}
                        €
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="quantity-selector-section">
              <label htmlFor="quantity-input">Nombre d'unités</label>
              <div className="quantity-controls">
                <button onClick={decrementQuantity}>−</button>
                <input type="number" value={quantity} readOnly />
                <button onClick={incrementQuantity}>+</button>
              </div>
            </div>

            <div className="product-price-section">
              <div className="pd-prices">
                {produit.promo_active && (
                  <span className="pd-price-original">
                    {(
                      parseFloat(produit.prix_ttc) *
                      selectedWeight.multiplier *
                      quantity
                    ).toFixed(2)}{" "}
                    €
                  </span>
                )}
                <span
                  className={`price-value ${produit.promo_active ? "pd-price-discounted" : ""}`}
                >
                  {calculateTotal()} €
                </span>
              </div>

              {produit.promo_active && produit.date_fin_promo && (
                <p
                  className="promo-info"
                  style={{
                    fontSize: "0.85rem",
                    color: "#D9C09B",
                    marginTop: "8px",
                    fontWeight: "500",
                  }}
                >
                  Offre valable jusqu'au{" "}
                  {new Date(produit.date_fin_promo).toLocaleDateString(
                    "fr-FR",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </p>
              )}

              {quantity > 1 && (
                <p className="pd-unit-price">
                  {priceForWeight().toFixed(2)} € / unité
                </p>
              )}

              <button
                className={`btn-add-to-cart ${added ? "btn-added" : ""}`}
                onClick={handleAddToCart}
                disabled={produit.stock === 0}
              >
                {added
                  ? "Ajouté au panier"
                  : produit.stock === 0
                    ? "Rupture de stock"
                    : "Ajouter au panier"}
              </button>

              <Link to="/produits" className="pd-back-link">
                Continuer mes achats
              </Link>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h2>Dans la même collection</h2>
            <div className="products-grid">
              {relatedProducts.map((item) => {
                const relatedImage = item.images
                  ? `${import.meta.env.VITE_API_URL}/images/${item.images}`
                  : "https://placehold.co/400x400?text=Produit";

                const prixAffiche = item.promo_active
                  ? parseFloat(item.prix_promo || item.prix_ttc)
                  : parseFloat(item.prix_ttc);

                return (
                  <Link
                    key={item.ID_Article}
                    to={`/produit/${item.ID_Article}`}
                    className="catalog-product-card"
                  >
                    {item.promo_active && item.pourcentage_reduction && (
                      <div className="discount-badge">
                        -{item.pourcentage_reduction}%
                      </div>
                    )}

                    <div className="catalog-product-image">
                      <img src={relatedImage} alt={item.nom_produit} />
                    </div>
                    <div className="catalog-product-info">
                      <span className="catalog-product-category">
                        {item.categorie?.toUpperCase() || "PRODUIT"}
                      </span>
                      <h3 className="catalog-product-name">
                        {item.nom_produit}
                      </h3>
                      <div className="catalog-product-footer">
                        <div className="catalog-product-prices">
                          {item.promo_active && (
                            <span className="price-original">
                              {parseFloat(item.prix_ttc).toFixed(2)} €
                            </span>
                          )}
                          <span
                            className={`price-current ${item.promo_active ? "price-discounted" : ""}`}
                          >
                            {prixAffiche.toFixed(2)} €
                          </span>
                        </div>
                        <button
                          className="add-to-cart-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart({
                              id: item.ID_Article,
                              nom: item.nom_produit,
                              prixUnitaire: prixAffiche,
                              categorie: item.categorie,
                              images: item.images,
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
          </section>
        )}

        <section className="customer-reviews">
          <h2>Avis clients</h2>
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="review-author">
                    <strong>{review.author}</strong>
                    <div className="review-stars">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
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
