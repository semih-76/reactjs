import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "./CheckoutContext";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const CheckoutSteps = ({ current }) => {
  const steps = ["Identification", "Livraison", "Paiement", "Confirmation"];
  return (
    <div className="checkout-steps">
      {steps.map((s, i) => (
        <div
          key={s}
          className={`checkout-step ${i + 1 === current ? "active" : i + 1 < current ? "done" : ""}`}
        >
          <span className="step-number">{i + 1 < current ? "✓" : i + 1}</span>
          <span className="step-label">{s}</span>
          {i < steps.length - 1 && <span className="step-line" />}
        </div>
      ))}
    </div>
  );
};

const formatCardNumber = (val) =>
  val
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();

const formatExpiry = (val) => {
  const clean = val.replace(/\D/g, "").slice(0, 4);
  return clean.length > 2 ? `${clean.slice(0, 2)}/${clean.slice(2)}` : clean;
};

const CheckoutPaiement = () => {
  const navigate = useNavigate();
  const { checkoutData, updateCheckout } = useCheckout();
  const { items, total } = useCart();
  const { user } = useContext(AuthContext);

  const token = localStorage.getItem("token");
  const stored = localStorage.getItem("id_client");
  const id_client =
    user?.id || (stored && stored !== "undefined" ? Number(stored) : null);

  const isMagasin = checkoutData.deliveryMode === "magasin";

  const [paymentMethod, setPaymentMethod] = useState(
    checkoutData.paymentMethod || (isMagasin ? "magasin" : "card"),
  );
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateCard = () => {
    const e = {};
    const rawNumber = cardData.number.replace(/\s/g, "");
    if (rawNumber.length !== 16)
      e.number = "Numéro de carte invalide (16 chiffres).";
    if (!cardData.name.trim()) e.name = "Nom du porteur requis.";
    if (!/^\d{2}\/\d{2}$/.test(cardData.expiry))
      e.expiry = "Date invalide (MM/AA).";
    if (!/^\d{3}$/.test(cardData.cvv)) e.cvv = "CVV invalide (3 chiffres).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("user:", user);
    console.log("user.id:", user?.id);
    console.log("user.ID_Client:", user?.ID_Client);
    console.log("stored:", localStorage.getItem("id_client"));
    console.log("token:", localStorage.getItem("token"));
    if (paymentMethod === "card" && !validateCard()) return;

    if (!id_client) {
      setErrors({
        global: "Vous devez être connecté pour passer une commande.",
      });
      return;
    }

    setLoading(true);
    try {
      const articles = items.map((item) => ({
        id_article: item.id,
        quantite: item.quantite,
        prix_unitaire: parseFloat(item.prix_ttc || item.prix || 0),
      }));

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/commandes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            id_client,
            articles,
            total_ttc: total,
            mode_commande: isMagasin ? "magasin" : "en_ligne",
            mode_paiement: paymentMethod === "card" ? "cb" : paymentMethod,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la commande");
      }

      const fakeDate = new Date().toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      updateCheckout({
        paymentMethod,
        orderId: "CMD-" + data.orderId,
        orderDate: fakeDate,
        total,
      });

      navigate("/checkout/confirmation");
    } catch (err) {
      setErrors({
        global: err.message || "Une erreur est survenue. Veuillez réessayer.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-wrapper">
      <CheckoutSteps current={3} />

      <form className="checkout-layout" onSubmit={handleSubmit}>
        <div className="checkout-main">
          <section className="checkout-section">
            <h2 className="checkout-section-title">Méthode de paiement</h2>
            <div className="payment-methods">
              {!isMagasin && (
                <label
                  className={`payment-method-card ${paymentMethod === "card" ? "active" : ""}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  <span className="payment-method-icon"></span>
                  <span>Carte bancaire</span>
                  <span className="payment-brands">
                    VISA · Mastercard · Amex
                  </span>
                </label>
              )}

              {!isMagasin && (
                <label
                  className={`payment-method-card ${paymentMethod === "paypal" ? "active" : ""}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                  />
                  <span className="payment-method-icon"></span>
                  <span>PayPal</span>
                </label>
              )}

              {isMagasin && (
                <label
                  className={`payment-method-card ${paymentMethod === "magasin" ? "active" : ""}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="magasin"
                    checked={paymentMethod === "magasin"}
                    onChange={() => setPaymentMethod("magasin")}
                  />
                  <span className="payment-method-icon"></span>
                  <span>Paiement à la boutique</span>
                  <span className="payment-brands">CB · Espèces · Chèque</span>
                </label>
              )}
            </div>
          </section>

          {paymentMethod === "card" && (
            <section className="checkout-section">
              <h2 className="checkout-section-title">
                Informations de paiement
              </h2>
              <div className="payment-secure-badge">
                Paiement 100% sécurisé — SSL
              </div>

              <div className="input-group">
                <label>Numéro de carte</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={cardData.number}
                  onChange={(e) =>
                    setCardData({
                      ...cardData,
                      number: formatCardNumber(e.target.value),
                    })
                  }
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                {errors.number && (
                  <span className="field-error">{errors.number}</span>
                )}
              </div>

              <div className="input-group">
                <label>Nom du porteur</label>
                <input
                  type="text"
                  value={cardData.name}
                  onChange={(e) =>
                    setCardData({
                      ...cardData,
                      name: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="JEAN DUPONT"
                />
                {errors.name && (
                  <span className="field-error">{errors.name}</span>
                )}
              </div>

              <div className="form-row-checkout">
                <div className="input-group">
                  <label>Date d'expiration</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={cardData.expiry}
                    onChange={(e) =>
                      setCardData({
                        ...cardData,
                        expiry: formatExpiry(e.target.value),
                      })
                    }
                    placeholder="MM/AA"
                    maxLength={5}
                  />
                  {errors.expiry && (
                    <span className="field-error">{errors.expiry}</span>
                  )}
                </div>
                <div className="input-group">
                  <label>CVV</label>
                  <input
                    type="password"
                    inputMode="numeric"
                    value={cardData.cvv}
                    onChange={(e) =>
                      setCardData({
                        ...cardData,
                        cvv: e.target.value.replace(/\D/g, "").slice(0, 3),
                      })
                    }
                    placeholder="•••"
                    maxLength={3}
                  />
                  {errors.cvv && (
                    <span className="field-error">{errors.cvv}</span>
                  )}
                </div>
              </div>
            </section>
          )}

          {paymentMethod === "paypal" && (
            <section className="checkout-section">
              <div className="paypal-info">
                <span></span>
                <p>
                  Vous serez redirigé vers PayPal pour finaliser votre paiement
                  en toute sécurité.
                </p>
              </div>
            </section>
          )}

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

          {errors.global && <div className="msg-error">{errors.global}</div>}
        </div>

        <aside className="checkout-sidebar">
          <div className="checkout-summary-card">
            <h3>Récapitulatif</h3>

            {items.map((item) => (
              <div className="summary-line" key={item.id}>
                <span>
                  {item.nom_produit || item.nom} × {item.quantite}
                </span>
                <span>
                  {(
                    parseFloat(item.prix_ttc || item.prix || 0) * item.quantite
                  ).toFixed(2)}{" "}
                  €
                </span>
              </div>
            ))}

            <div className="summary-recap-block">
              <span className="summary-recap-label">Livraison</span>
              <span>
                {checkoutData.deliveryMode === "magasin"
                  ? "Retrait en boutique"
                  : "À domicile"}
              </span>
            </div>

            <div className="summary-line">
              <span>Sous-total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            <div className="summary-line">
              <span>Livraison</span>
              <span className="free-shipping">Gratuit</span>
            </div>
            <div className="summary-total">
              <span>Total TTC</span>
              <span>{total.toFixed(2)} €</span>
            </div>

            <button
              type="submit"
              className="btn-checkout-next"
              disabled={loading}
            >
              {loading ? "Traitement…" : "Confirmer la commande →"}
            </button>
            <button
              type="button"
              className="btn-checkout-back"
              onClick={() => navigate("/checkout/livraison")}
            >
              ← Retour à la livraison
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
};

export default CheckoutPaiement;
