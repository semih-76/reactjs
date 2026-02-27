import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "./CheckoutContext";


// Barre de progression
const CheckoutSteps = ({ current }) => {
    const steps = ["Identification", "Livraison", "Paiement", "Confirmation"];
    return (
        <div className="checkout-steps">
            {steps.map((s, i) => (
                <div key={s} className={`checkout-step ${i + 1 === current ? "active" : i + 1 < current ? "done" : ""}`}>
                    <span className="step-number">{i + 1 < current ? "✓" : i + 1}</span>
                    <span className="step-label">{s}</span>
                    {i < steps.length - 1 && <span className="step-line" />}
                </div>
            ))}
        </div>
    );
};

// Formatage numéro de carte
const formatCardNumber = (val) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

const formatExpiry = (val) => {
    const clean = val.replace(/\D/g, "").slice(0, 4);
    return clean.length > 2 ? `${clean.slice(0, 2)}/${clean.slice(2)}` : clean;
};

// Composant principal
const CheckoutPaiement = () => {
    const navigate = useNavigate();
    const { checkoutData, updateCheckout } = useCheckout();

    const isMagasin = checkoutData.deliveryMode === "magasin";

    const [paymentMethod, setPaymentMethod] = useState(
        checkoutData.paymentMethod || (isMagasin ? "magasin" : "card")
    );
    const [cardData, setCardData] = useState({ number: "", name: "", expiry: "", cvv: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Validation carte
    const validateCard = () => {
        const e = {};
        const rawNumber = cardData.number.replace(/\s/g, "");
        if (rawNumber.length !== 16) e.number = "Numéro de carte invalide (16 chiffres).";
        if (!cardData.name.trim()) e.name = "Nom du porteur requis.";
        if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) e.expiry = "Date invalide (MM/AA).";
        if (!/^\d{3,4}$/.test(cardData.cvv)) e.cvv = "CVV invalide.";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    // Soumission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (paymentMethod === "card" && !validateCard()) return;

        setLoading(true);
        try {
            const fakeOrderId = "CMD-" + Math.random().toString(36).slice(2, 9).toUpperCase();
            const fakeDate = new Date().toLocaleDateString("fr-FR", {
                day: "2-digit", month: "long", year: "numeric",
            });

            updateCheckout({
                paymentMethod,
                orderId: fakeOrderId,
                orderDate: fakeDate,
            });

            navigate("/checkout/confirmation");
        } catch {
            setErrors({ global: "Une erreur est survenue. Veuillez réessayer." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-wrapper">
            <CheckoutSteps current={3} />

            <form className="checkout-layout" onSubmit={handleSubmit}>
                {/* ── Colonne gauche ── */}
                <div className="checkout-main">

                    {/* Méthodes de paiement */}
                    <section className="checkout-section">
                        <h2 className="checkout-section-title">Méthode de paiement</h2>

                        <div className="payment-methods">
                            {!isMagasin && (
                                <label className={`payment-method-card ${paymentMethod === "card" ? "active" : ""}`}>
                                    <input type="radio" name="payment" value="card"
                                           checked={paymentMethod === "card"}
                                           onChange={() => setPaymentMethod("card")} />
                                    <span className="payment-method-icon"></span>
                                    <span>Carte bancaire</span>
                                    <span className="payment-brands">VISA · Mastercard · Amex</span>
                                </label>
                            )}

                            {!isMagasin && (
                                <label className={`payment-method-card ${paymentMethod === "paypal" ? "active" : ""}`}>
                                    <input type="radio" name="payment" value="paypal"
                                           checked={paymentMethod === "paypal"}
                                           onChange={() => setPaymentMethod("paypal")} />
                                    <span className="payment-method-icon"></span>
                                    <span>PayPal</span>
                                </label>
                            )}

                            {isMagasin && (
                                <label className={`payment-method-card ${paymentMethod === "magasin" ? "active" : ""}`}>
                                    <input type="radio" name="payment" value="magasin"
                                           checked={paymentMethod === "magasin"}
                                           onChange={() => setPaymentMethod("magasin")} />
                                    <span className="payment-method-icon"></span>
                                    <span>Paiement à la boutique</span>
                                    <span className="payment-brands">CB · Espèces · Chèque</span>
                                </label>
                            )}
                        </div>
                    </section>

                    {/* Formulaire carte */}
                    {paymentMethod === "card" && (
                        <section className="checkout-section">
                            <h2 className="checkout-section-title">Informations de paiement</h2>
                            <div className="payment-secure-badge">Paiement 100% sécurisé — SSL</div>

                            <div className="input-group">
                                <label>Numéro de carte</label>
                                <input type="text" inputMode="numeric"
                                       value={cardData.number}
                                       onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                                       placeholder="1234 5678 9012 3456" maxLength={19} />
                                {errors.number && <span className="field-error">{errors.number}</span>}
                            </div>

                            <div className="input-group">
                                <label>Nom du porteur</label>
                                <input type="text"
                                       value={cardData.name}
                                       onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                                       placeholder="JEAN DUPONT" />
                                {errors.name && <span className="field-error">{errors.name}</span>}
                            </div>

                            <div className="form-row-checkout">
                                <div className="input-group">
                                    <label>Date d'expiration</label>
                                    <input type="text" inputMode="numeric"
                                           value={cardData.expiry}
                                           onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                                           placeholder="MM/AA" maxLength={5} />
                                    {errors.expiry && <span className="field-error">{errors.expiry}</span>}
                                </div>
                                <div className="input-group">
                                    <label>CVV</label>
                                    <input type="password" inputMode="numeric"
                                           value={cardData.cvv}
                                           onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                                           placeholder="•••" maxLength={4} />
                                    {errors.cvv && <span className="field-error">{errors.cvv}</span>}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Message PayPal */}
                    {paymentMethod === "paypal" && (
                        <section className="checkout-section">
                            <div className="paypal-info">
                                <span></span>
                                <p>Vous serez redirigé vers PayPal pour finaliser votre paiement en toute sécurité.</p>
                            </div>
                        </section>
                    )}

                    {/* Message paiement en magasin */}
                    {paymentMethod === "magasin" && (
                        <section className="checkout-section">
                            <div className="store-pickup-info">
                                <span className="store-pickup-icon">💶</span>
                                <div>
                                    <strong>Paiement à la boutique</strong>
                                    <p>Vous réglez au moment du retrait de votre commande.</p>
                                    <p>Moyens acceptés : carte bancaire, espèces, chèque.</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {errors.global && (
                        <div className="msg-error">{errors.global}</div>
                    )}
                </div>

                {/* ── Sidebar récap ── */}
                <aside className="checkout-sidebar">
                    <div className="checkout-summary-card">
                        <h3>Récapitulatif</h3>

                        <div className="summary-recap-block">
                            <span className="summary-recap-label">Livraison</span>
                            <span>{checkoutData.deliveryMode === "magasin" ? "Retrait en boutique" : "À domicile"}</span>
                        </div>

                        <div className="summary-line">
                            <span>Sous-total</span>
                            <span>—</span>
                        </div>
                        <div className="summary-line">
                            <span>Livraison</span>
                            <span>{checkoutData.deliveryMode === "magasin" ? "Gratuit" : "—"}</span>
                        </div>
                        <div className="summary-total">
                            <span>Total TTC</span>
                            <span>{checkoutData.total ? `${checkoutData.total.toFixed(2)} €` : "—"}</span>
                        </div>

                        <button type="submit" className="btn-checkout-next" disabled={loading}>
                            {loading ? "Traitement…" : "Confirmer la commande →"}
                        </button>
                        <button type="button" className="btn-checkout-back"
                                onClick={() => navigate("/checkout/livraison")}>
                            ← Retour à la livraison
                        </button>
                    </div>
                </aside>
            </form>
        </div>
    );
};

export default CheckoutPaiement;