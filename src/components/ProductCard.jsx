import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const GRAMMAGES = [
  { label: "100g", coeff: 1 },
  { label: "250g", coeff: 2.5 },
  { label: "500g", coeff: 5 },
  { label: "1kg", coeff: 10 },
];

const normalize = (str) =>
  str
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") || "";

const ProductCard = ({ produit }) => {
  const { addToCart } = useCart();

  const imageUrl = produit.images
    ? `${import.meta.env.VITE_API_URL}/images/${produit.images}`
    : `/images/placeholder.png`;

  const isWeighed = ["cafe", "the", "cafes", "thes"].includes(
    normalize(produit.categorie),
  );

  const [selectedGrammage, setSelectedGrammage] = useState(GRAMMAGES[0]);

  const basePrice = produit.promo_active
    ? parseFloat(produit.prix_promo || produit.prix_ttc)
    : parseFloat(produit.prix_ttc);

  const prixNormal = parseFloat(produit.prix_ttc);
  const displayPrice = isWeighed
    ? basePrice * selectedGrammage.coeff
    : basePrice;
  const displayPrixNormal = isWeighed
    ? prixNormal * selectedGrammage.coeff
    : prixNormal;

  return (
    <div className="catalog-product-card">
      {produit.promo_active && produit.pourcentage_reduction && (
        <div className="discount-badge">-{produit.pourcentage_reduction}%</div>
      )}

      <div className="catalog-product-image">
        <img
          src={imageUrl}
          alt={produit.nom_produit}
          className="product-card-images"
        />
      </div>

      <div className="catalog-product-info">
        <span className="catalog-product-category">
          {produit.categorie?.toUpperCase() || "PRODUIT"}
        </span>

        <h3 className="catalog-product-name">{produit.nom_produit}</h3>

        <div className="catalog-product-footer">
          {isWeighed && (
            <select
              className="card-grammage-select"
              value={selectedGrammage.label}
              onChange={(e) => {
                const found = GRAMMAGES.find((g) => g.label === e.target.value);
                setSelectedGrammage(found);
              }}
            >
              {GRAMMAGES.map((g) => (
                <option key={g.label} value={g.label}>
                  {g.label} — {(basePrice * g.coeff).toFixed(2)} €
                </option>
              ))}
            </select>
          )}

          <div className="catalog-product-prices">
            {produit.promo_active && (
              <span className="price-original">
                {displayPrixNormal.toFixed(2)} €
              </span>
            )}
            <span
              className={`price-current ${produit.promo_active ? "price-discounted" : ""}`}
            >
              {displayPrice.toFixed(2)} €
            </span>
          </div>

          <button
            className="add-to-cart-btn"
            onClick={(e) => {
              e.preventDefault();
              addToCart({
                id: produit.ID_Article,
                nom: isWeighed
                  ? `${produit.nom_produit} — ${selectedGrammage.label}`
                  : produit.nom_produit,
                prixUnitaire: displayPrice,
                categorie: produit.categorie,
                images: produit.images,
                quantite: 1,
              });
            }}
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
