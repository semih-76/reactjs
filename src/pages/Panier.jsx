import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Panier = () => {
    // 1. Recuperation des fonctions et des donnees depuis le Context
    const { items, updateQuantity, removeItem } = useCart();

    // 2. Calcul du sous-total
    const subtotal = items.reduce((acc, item) => acc + (item.prixUnitaire * item.quantite), 0);

    return (
        <main className="panier-wrapper">
            <div className="panier-container">
                <h1 className="panier-title">Mon Panier</h1>

                <div className="panier-content">
                    {/* 3. Affichage conditionnel si le panier est vide */}
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
                                            {/* 4. Branchement de la suppression */}
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
                                                {/* 5. Branchement des quantites */}
                                                <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                                                <span>{item.quantite}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                            </div>
                                            <div className="item-price-block">
                                                <span className="unit-price">{item.prixUnitaire.toFixed(2)} € / unite</span>
                                                <span className="total-price">{(item.prixUnitaire * item.quantite).toFixed(2)} €</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Sidebar Recapitulatif */}
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
                                    <div className="summary-row">
                                        <span>Frais de livraison</span>
                                        <span className="free-shipping">Gratuit</span>
                                    </div>
                                </div>

                                <div className="summary-total">
                                    <span>Total TTC</span>
                                    <span>{subtotal.toFixed(2)} €</span>
                                </div>

                                <button className="btn-checkout">Valider ma commande</button>
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