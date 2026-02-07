import React from 'react';
import {Link} from "react-router-dom";

const ProductCard = ({produit}) => {

    // Image provenant de l'API
    const imageUrl = produit.images
    ? `${import.meta.env.VITE_API_URL}/images/${produit.images}`
        : `https://urladefinir.com`;


    return (
        <div className="product-card">
            <img
                 src={imageUrl}
                 alt={produit.nom_produit}
                 className="product-card-images"
            />
            <h3>{produit.nom_produit}</h3>
            <p>{produit.prix_ttc}</p>

            {/* Lien vers les détails produit */}
            <Link to={`/produit/${produit.id_articles}`} className="details-btn">
                Voir Détails
            </Link>
        </div>
    );
};

export default ProductCard;