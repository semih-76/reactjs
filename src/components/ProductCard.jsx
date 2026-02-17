import React from 'react';
import { Link } from "react-router-dom";

const ProductCard = ({ produit }) => {
    // Image provenant de l'API
    const imageUrl = produit.images
        ? `${import.meta.env.VITE_API_URL}/images/${produit.images}`
        : `/images/placeholder.png`; // Image par défaut si vide

    return (
        <div className="product-card">
            {/* Conteneur gris pour l'image */}
            <div className="product-image-container">
                <img
                    src={imageUrl}
                    alt={produit.nom_produit}
                    className="product-card-images"
                />
            </div>

            {/* Zone de texte sous l'image */}
            <div className="product-info">
                <span className="product-category">CAFÉ</span>

                <h3 className="product-name">{produit.nom_produit}</h3>

                <div className="product-footer">
                    <span className="product-price">{produit.prix_ttc} €</span>

                    <Link to={`/produit/${produit.id_articles}`} className="product-view-link">
                        Voir &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;