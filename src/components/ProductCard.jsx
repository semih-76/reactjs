import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const GRAMMAGES = [
  { label: "100g", coeff: 1 },
  { label: "250g", coeff: 2.5 },
  { label: "500g", coeff: 5 },
  { label: "1kg", coeff: 10 },
];

function normalize(str) {
  if (str === null || str === undefined) {
    return "";
  }
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const ProductCard = ({ produit }) => {
  const { addToCart } = useCart();

  let imageUrl;
  if (produit.images) {
    imageUrl = import.meta.env.VITE_API_URL + "/images/" + produit.images;
  } else {
    imageUrl = "/images/placeholder.png";
  }

  const categorieNormalisee = normalize(produit.categorie);
  const categoriesAuPoids = ["cafe", "the", "cafes", "thes"];
  const isWeighed = categoriesAuPoids.includes(categorieNormalisee);

  const [selectedGrammage, setSelectedGrammage] = useState(GRAMMAGES[0]);

  let basePrice;
  if (produit.promo_active === true && produit.prix_promo) {
    basePrice = parseFloat(produit.prix_promo);
  } else {
    basePrice = parseFloat(produit.prix_ttc);
  }

  const prixNormal = parseFloat(produit.prix_ttc);

  let displayPrice;
  if (isWeighed === true) {
    displayPrice = basePrice * selectedGrammage.coeff;
  } else {
    displayPrice = basePrice;
  }

  let displayPrixNormal;
  if (isWeighed === true) {
    displayPrixNormal = prixNormal * selectedGrammage.coeff;
  } else {
    displayPrixNormal = prixNormal;
  }

  function handleGrammageChange(e) {
    let grammageChoisi;
    for (let i = 0; i < GRAMMAGES.length; i++) {
      if (GRAMMAGES[i].label === e.target.value) {
        grammageChoisi = GRAMMAGES[i];
      }
    }
    setSelectedGrammage(grammageChoisi);
  }

  function handleAddToCart(e) {
    e.preventDefault();

    let nomProduit;
    if (isWeighed === true) {
      nomProduit = produit.nom_produit + " — " + selectedGrammage.label;
    } else {
      nomProduit = produit.nom_produit;
    }

    addToCart({
      id: produit.ID_Article,
      nom: nomProduit,
      prixUnitaire: displayPrice,
      categorie: produit.categorie,
      images: produit.images,
      quantite: 1,
    });
  }

  let categorie;
  if (produit.categorie) {
    const categorieNom = produit.categorie.toLowerCase();
    if (categorieNom === "cafes" || categorieNom === "cafe") {
      categorie = "CAFÉS";
    } else if (categorieNom === "thes" || categorieNom === "the") {
      categorie = "THÉS";
    } else {
      categorie = produit.categorie.toUpperCase();
    }
  } else {
    categorie = "PRODUIT";
  }

  return (
    <div className="catalog-product-card">
      {produit.promo_active && produit.pourcentage_reduction && (
        <div className="discount-badge">-{produit.pourcentage_reduction}%</div>
      )}

      <div className="catalog-product-image">
        <Link to={"/produit/" + produit.ID_Article}>
          <img
            src={imageUrl}
            alt={produit.nom_produit}
            className="product-card-images"
          />
        </Link>
      </div>

      <div className="catalog-product-info">
        <span className="catalog-product-category">{categorie}</span>

        <h3 className="catalog-product-name">{produit.nom_produit}</h3>

        <div className="catalog-product-footer">
          {isWeighed && (
            <select
              className="card-grammage-select"
              value={selectedGrammage.label}
              onChange={handleGrammageChange}
            >
              {GRAMMAGES.map(function (g) {
                const prixOption = basePrice * g.coeff;
                return (
                  <option key={g.label} value={g.label}>
                    {g.label} — {prixOption.toFixed(2)} €
                  </option>
                );
              })}
            </select>
          )}

          <div className="catalog-product-prices">
            {produit.promo_active && (
              <span className="price-original">
                {displayPrixNormal.toFixed(2)} €
              </span>
            )}
            <span
              className={
                produit.promo_active
                  ? "price-current price-discounted"
                  : "price-current"
              }
            >
              {displayPrice.toFixed(2)} €
            </span>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
