import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCheckout } from "./CheckoutContext.jsx";

const CheckoutConfirmation = () => {
    const { checkoutData, resetCheckout } = useCheckout();
    const { orderId, orderDate, deliveryMode, carrier, paymentMethod } = checkoutData;

    useEffect(() => {
        // Le reset se fait quand l'utilisateur quitte via les boutons
    }, []);

    if (!orderId) {
        return (
            <div className="checkout-wrapper">
                <div className="confirmation-guard">
                    <p>Aucune commande trouvée.</p>
                    <Link to="/" className="btn-checkout-next">Retour à l'accueil</Link>
                </div>
            </div>
        );
    }

    const paymentLabel = {
        card: "Carte bancaire",
        paypal: "PayPal",
        magasin: "Paiement en boutique",
    }[paymentMethod] || paymentMethod;

    const deliveryLabel =
        deliveryMode === "magasin"
            ? "Retrait en boutique — 15 rue du Thé, 75001 Paris"
            : `Livraison à domicile — ${carrier || ""}`;

    return (
        <div className="checkout-wrapper">
            <div className="confirmation-wrapper">

                <div className="confirmation-icon">
                    <svg viewBox="0 0 52 52" className="checkmark-svg">
                        <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                        <path className="checkmark-check" fill="none" d="M14 27l8 8 16-16" />
                    </svg>
                </div>

                <h1 className="confirmation-title">Commande confirmée</h1>
                <p className="confirmation-subtitle">
                    Merci pour votre confiance. Votre commande a bien été enregistrée.
                </p>

                <div className="confirmation-order-id">
                    <span className="order-id-label">Numéro de commande</span>
                    <span className="order-id-value">{orderId}</span>
                    <span className="order-id-date">{orderDate}</span>
                </div>

                <div className="confirmation-details">
                    <div className="confirmation-detail-row">
                        <span className="detail-label">Livraison</span>
                        <span className="detail-value">{deliveryLabel}</span>
                    </div>
                    <div className="confirmation-detail-row">
                        <span className="detail-label">Paiement</span>
                        <span className="detail-value">{paymentLabel}</span>
                    </div>
                    <div className="confirmation-detail-row">
                        <span className="detail-label">Email de confirmation</span>
                        <span className="detail-value">Envoyé à votre adresse email ✓</span>
                    </div>
                </div>

                {deliveryMode === "magasin" && (
                    <div className="confirmation-store-notice">
                        <span>🏪</span>
                        <p>
                            Votre commande sera prête sous <strong>24h</strong>.<br />
                            Vous recevrez un email dès qu'elle est disponible en boutique.
                        </p>
                    </div>
                )}

                <div className="confirmation-actions">
                    <Link to="/espace-client" className="btn-checkout-next" onClick={resetCheckout}>
                        Suivre ma commande
                    </Link>
                    <Link to="/produits" className="btn-checkout-back" onClick={resetCheckout}>
                        Continuer mes achats
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CheckoutConfirmation;