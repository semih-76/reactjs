import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const FeaturedProducts = () => {
  const [produits, setProduits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/articles`,
        );
        const data = await response.json();
        setProduits(data.articles || []);
        console.log(data.articles[0]);
        setProduits(data.articles || []);
      } catch (err) {
        console.error("Erreur:", err);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchProduits();
  }, []);

  if (isLoading) {
    return (
      <div className="products-grid-home">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <Skeleton height={300} />
            <Skeleton height={20} width="70%" style={{ marginTop: "15px" }} />
            <Skeleton height={20} width="40%" style={{ marginTop: "10px" }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="products-grid-home">
      {produits.slice(0, 3).map((product) => {
        const imageUrl = product.images
          ? `${import.meta.env.VITE_API_URL}/images/${product.images}`
          : "https://placehold.co/400x400?text=Produit";

        return (
          <Link
            key={product.ID_Article}
            to={`/produit/${product.ID_Article}`}
            className="home-product-card"
            style={{ position: "relative" }}
          >
            {product.promo_active && product.pourcentage_reduction && (
              <div className="discount-badge">
                -{product.pourcentage_reduction}%
              </div>
            )}
            <div className="home-product-image">
              <img src={imageUrl} alt={product.nom_produit} />
            </div>
            <div className="home-product-info">
              <span className="home-product-category">
                {product.categorie?.toUpperCase() || "PRODUIT"}
              </span>
              <h3 className="home-product-name">{product.nom_produit}</h3>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                }}
              >
                {product.promo_active && (
                  <span className="price-original">
                    {parseFloat(product.prix_ttc).toFixed(2)} €
                  </span>
                )}
                <span className="home-product-price">
                  {product.promo_active
                    ? parseFloat(
                        product.prix_promo || product.prix_ttc,
                      ).toFixed(2)
                    : parseFloat(product.prix_ttc).toFixed(2)}{" "}
                  €
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default FeaturedProducts;
