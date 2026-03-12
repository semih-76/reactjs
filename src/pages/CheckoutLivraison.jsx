import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "./CheckoutContext.jsx";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/authContext.jsx";

const CARRIERS = [
  {
    id: "colissimo",
    label: "Colissimo",
    delay: "2 à 3 jours ouvrés",
    price: 4.9,
  },
  { id: "chronopost", label: "Chronopost", delay: "24h", price: 9.9 },
  {
    id: "mondial_relay",
    label: "Mondial Relay",
    delay: "3 à 5 jours ouvrés",
    price: 3.5,
  },
];

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

const CheckoutLivraison = () => {
  const navigate = useNavigate();
  const { checkoutData, updateCheckout } = useCheckout();
  const { user } = useContext(AuthContext); // ← récupère le user connecté

  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  const [deliveryMode, setDeliveryMode] = useState(
    checkoutData.deliveryMode || "domicile",
  );
  const [selectedAddressId, setSelectedAddressId] = useState(
    checkoutData.selectedAddressId || null,
  );
  const [carrier, setCarrier] = useState(checkoutData.carrier || null);

  // ← pré-remplissage avec les infos du user connecté
  const [newAddress, setNewAddress] = useState(
    checkoutData.newAddress || {
      firstName: user?.prenom || "",
      lastName: user?.nom || "",
      street: "",
      city: "",
      zip: "",
      country: "France",
    },
  );

  const [errors, setErrors] = useState({});
  const { items } = useCart();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await fetch("/api/client/addresses", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setAddresses(data);
        const def = data.find((a) => a.isDefault);
        if (def && !checkoutData.selectedAddressId)
          setSelectedAddressId(def.id);
      } catch {
        setShowNewAddressForm(true);
      } finally {
        setLoadingAddresses(false);
      }
    };
    fetchAddresses();
  }, []);

  const validate = () => {
    const e = {};
    if (deliveryMode === "domicile") {
      if (!selectedAddressId && !showNewAddressForm) {
        e.address = "Veuillez sélectionner une adresse.";
      }
      if (showNewAddressForm) {
        if (!newAddress.firstName.trim()) e.firstName = "Prénom requis.";
        if (!newAddress.lastName.trim()) e.lastName = "Nom requis.";
        if (!newAddress.street.trim()) e.street = "Adresse requise.";
        if (!newAddress.city.trim()) e.city = "Ville requise.";
        if (!/^\d{5}$/.test(newAddress.zip)) e.zip = "Code postal invalide.";
      }
      if (!carrier) e.carrier = "Veuillez choisir un transporteur.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    updateCheckout({
      deliveryMode,
      selectedAddressId: deliveryMode === "domicile" ? selectedAddressId : null,
      newAddress: showNewAddressForm ? newAddress : null,
      totalAmount: total,
      shippingFees: shippingCost,
      carrier: deliveryMode === "domicile" ? carrier : null,
    });
    navigate("/checkout/paiement");
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.prixUnitaire * item.quantite,
    0,
  );
  const selectedCarrier = CARRIERS.find((c) => c.id === carrier);
  const shippingCost =
    deliveryMode === "magasin" ? 0 : selectedCarrier?.price || 0;
  const total = subtotal + shippingCost;

  return (
    <div className="checkout-wrapper">
      <CheckoutSteps current={2} />

      <form className="checkout-layout" onSubmit={handleSubmit}>
        <div className="checkout-main">
          <section className="checkout-section">
            <h2 className="checkout-section-title">Mode de livraison</h2>
            <div className="delivery-mode-grid">
              {[
                {
                  value: "domicile",
                  icon: "",
                  label: "Livraison à domicile",
                  sub: "Reçu chez vous",
                },
                {
                  value: "magasin",
                  icon: "",
                  label: "Retrait en boutique",
                  sub: "15 rue du Thé, Paris 75001 — Gratuit",
                },
              ].map((m) => (
                <label
                  key={m.value}
                  className={`delivery-mode-card ${deliveryMode === m.value ? "active" : ""}`}
                >
                  <input
                    type="radio"
                    name="deliveryMode"
                    value={m.value}
                    checked={deliveryMode === m.value}
                    onChange={() => setDeliveryMode(m.value)}
                  />
                  <span className="delivery-mode-icon">{m.icon}</span>
                  <span className="delivery-mode-label">{m.label}</span>
                  <span className="delivery-mode-sub">{m.sub}</span>
                </label>
              ))}
            </div>
          </section>

          {deliveryMode === "domicile" && (
            <section className="checkout-section">
              <h2 className="checkout-section-title">Adresse de livraison</h2>

              {loadingAddresses ? (
                <p className="checkout-loading">Chargement de vos adresses…</p>
              ) : (
                <>
                  {addresses.length > 0 && !showNewAddressForm && (
                    <div className="address-radio-list">
                      {addresses.map((addr) => (
                        <label
                          key={addr.id}
                          className={`address-radio-card ${selectedAddressId === addr.id ? "active" : ""}`}
                        >
                          <input
                            type="radio"
                            name="address"
                            value={addr.id}
                            checked={selectedAddressId === addr.id}
                            onChange={() => setSelectedAddressId(addr.id)}
                          />
                          <div className="address-radio-body">
                            <strong>
                              {addr.firstName} {addr.lastName}
                            </strong>
                            <span>{addr.street}</span>
                            <span>
                              {addr.zip} {addr.city}, {addr.country}
                            </span>
                            {addr.isDefault && (
                              <span className="badge-default">Par défaut</span>
                            )}
                          </div>
                        </label>
                      ))}
                      <button
                        type="button"
                        className="btn-add-new-addr"
                        onClick={() => {
                          setShowNewAddressForm(true);
                          setSelectedAddressId(null);
                        }}
                      >
                        + Utiliser une nouvelle adresse
                      </button>
                    </div>
                  )}

                  {(showNewAddressForm || addresses.length === 0) && (
                    <div className="new-address-form">
                      {addresses.length > 0 && (
                        <button
                          type="button"
                          className="btn-back-addr"
                          onClick={() => setShowNewAddressForm(false)}
                        >
                          ← Retour à mes adresses
                        </button>
                      )}
                      <div className="form-row-checkout">
                        <div className="input-group">
                          <label>Prénom</label>
                          <input
                            type="text"
                            value={newAddress.firstName}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                firstName: e.target.value,
                              })
                            }
                            placeholder="Jean"
                          />
                          {errors.firstName && (
                            <span className="field-error">
                              {errors.firstName}
                            </span>
                          )}
                        </div>
                        <div className="input-group">
                          <label>Nom</label>
                          <input
                            type="text"
                            value={newAddress.lastName}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                lastName: e.target.value,
                              })
                            }
                            placeholder="Dupont"
                          />
                          {errors.lastName && (
                            <span className="field-error">
                              {errors.lastName}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="input-group">
                        <label>Adresse</label>
                        <input
                          type="text"
                          value={newAddress.street}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              street: e.target.value,
                            })
                          }
                          placeholder="12 rue des Fleurs"
                        />
                        {errors.street && (
                          <span className="field-error">{errors.street}</span>
                        )}
                      </div>
                      <div className="form-row-checkout">
                        <div className="input-group">
                          <label>Code postal</label>
                          <input
                            type="text"
                            value={newAddress.zip}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                zip: e.target.value,
                              })
                            }
                            placeholder="75001"
                            maxLength={5}
                          />
                          {errors.zip && (
                            <span className="field-error">{errors.zip}</span>
                          )}
                        </div>
                        <div className="input-group">
                          <label>Ville</label>
                          <input
                            type="text"
                            value={newAddress.city}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                city: e.target.value,
                              })
                            }
                            placeholder="Paris"
                          />
                          {errors.city && (
                            <span className="field-error">{errors.city}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {errors.address && (
                    <span className="field-error">{errors.address}</span>
                  )}
                </>
              )}
            </section>
          )}

          {deliveryMode === "domicile" && (
            <section className="checkout-section">
              <h2 className="checkout-section-title">Transporteur</h2>
              <div className="carrier-list">
                {CARRIERS.map((c) => (
                  <label
                    key={c.id}
                    className={`carrier-card ${carrier === c.id ? "active" : ""}`}
                  >
                    <input
                      type="radio"
                      name="carrier"
                      value={c.id}
                      checked={carrier === c.id}
                      onChange={() => setCarrier(c.id)}
                    />
                    <div className="carrier-info">
                      <strong>{c.label}</strong>
                      <span>{c.delay}</span>
                    </div>
                    <span className="carrier-price">
                      {c.price === 0 ? "Gratuit" : `${c.price.toFixed(2)} €`}
                    </span>
                  </label>
                ))}
              </div>
              {errors.carrier && (
                <span className="field-error">{errors.carrier}</span>
              )}
            </section>
          )}

          {deliveryMode === "magasin" && (
            <section className="checkout-section">
              <div className="store-pickup-info">
                <span className="store-pickup-icon"></span>
                <div>
                  <strong>Boutique CafThé — Paris</strong>
                  <p>15 rue du Thé, 75001 Paris</p>
                  <p>Lun–Sam : 10h–19h</p>
                  <p>
                    Votre commande sera disponible sous <strong>24h</strong>.
                    Vous recevrez un email de confirmation.
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>

        <aside className="checkout-sidebar">
          <div className="checkout-summary-card">
            <h3>Récapitulatif</h3>

            <div className="summary-line">
              <span>Sous-total</span>
              <span>{subtotal.toFixed(2)} €</span>
            </div>
            <div className="summary-line">
              <span>Livraison</span>
              <span>
                {deliveryMode === "magasin"
                  ? "Gratuit"
                  : carrier
                    ? `${shippingCost.toFixed(2)} €`
                    : "À choisir"}
              </span>
            </div>
            <div className="summary-total">
              <span>Total TTC</span>
              <span>{total.toFixed(2)} €</span>
            </div>

            <button type="submit" className="btn-checkout-next">
              Continuer vers le paiement →
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
};

export default CheckoutLivraison;
