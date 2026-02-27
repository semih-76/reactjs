import React from 'react';
import { useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Panier = () => {
    // Recuperation des fonctions et des donnees depuis le Context
    const { items, updateQuantity, removeItem } = useCart();
    const navigate = useNavigate();

    // Calcul du sous-total
    const subtotal = items.reduce((acc, item) => acc + (item.prixUnitaire * item.quantite), 0);

    return (
        <main className="panier-wrapper">
            <div className="panier-container">
                <h1 className="panier-title">Mon Panier</h1>

                <div className="panier-content">

                    {items.length === 0 ? (
                        <div className="items-list">
                            <p style={{ padding: '20px', fontSize: '1.2rem' }}>
                                Votre panier est vide.
                            </p>
                            <Link to="/produits" className="btn-continue" style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}>
                                Parcourir les produits
                            </Link>
                        </div>
                    ) : (
                        <section className="items-list">
                            {items.map(item => (
                                <div key={item.id} className="cart-item">
                                    <div className="item-image-placeholder">
                                        {item.images && (
                                            <img
                                                src={`${import.meta.env.VITE_API_URL}/images/${item.images}`}
                                                alt={item.nom}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                            />
                                        )}
                                    </div>

                                    <div className="item-details">
                                        <div className="item-header">
                                            <span className="item-category">{item.categorie}</span>

                                            <button
                                                className="delete-btn"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                        <h3 className="item-name">{item.nom}</h3>
                                        <p className="item-info">{item.poids || "Format standard"}</p>

                                        <div className="item-footer">
                                            <div className="quantity-selector">

                                                <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                                                <span>{item.quantite}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                            </div>
                                            <div className="item-price-block">
                                                <span className="unit-price">{item.prixUnitaire.toFixed(2)} € / Unité</span>
                                                <span className="total-price">{(item.prixUnitaire * item.quantite).toFixed(2)} €</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}


                    {items.length > 0 && (
                        <aside className="summary-sidebar">
                            <div className="summary-card">
                                <h3>Recapitulatif</h3>

                                <div className="promo-section">
                                    <label>Code promo</label>
                                    <div className="promo-input-group">
                                        <div className="input-with-icon">
                                            <span className="tag-icon">Code</span>
                                            <input type="text" placeholder="Entrez votre code" />
                                        </div>
                                        <button className="apply-btn">Appliquer</button>
                                    </div>
                                </div>

                                <div className="summary-details">
                                    <div className="summary-row">
                                        <span>Sous-total</span>
                                        <span>{subtotal.toFixed(2)} €</span>
                                    </div>

                                </div>

                                <div className="summary-total">
                                    <span>Total</span>
                                    <span>{subtotal.toFixed(2)} €</span>
                                </div>



                                <button
                                    className="btn-checkout"
                                    onClick={() => navigate("/checkout/livraison")}
                                >
                                    Valider ma commande
                                </button>
                                <Link to="/produits" className="btn-continue" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                                    Continuer mes achats
                                </Link>
                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Panier;