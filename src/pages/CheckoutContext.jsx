import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext(null);

export const useCheckout = () => {
    const ctx = useContext(CheckoutContext);
    if (!ctx) throw new Error("useCheckout must be used inside CheckoutProvider");
    return ctx;
};

export const CheckoutProvider = ({ children }) => {
    const [checkoutData, setCheckoutData] = useState({
        // Étape Livraison
        deliveryMode: null,       // "domicile" | "magasin"
        selectedAddressId: null,  // id adresse existante fetchée depuis l'API
        newAddress: null,         // objet si le client saisit une nouvelle adresse
        carrier: null,            // transporteur choisi

        // Étape Paiement
        paymentMethod: null,      // "card" | "paypal" | "magasin"

        // Confirmation
        orderId: null,
        orderDate: null,
    });

    const updateCheckout = (fields) =>
        setCheckoutData((prev) => ({ ...prev, ...fields }));

    const resetCheckout = () =>
        setCheckoutData({
            deliveryMode: null,
            selectedAddressId: null,
            newAddress: null,
            carrier: null,
            paymentMethod: null,
            orderId: null,
            orderDate: null,
        });

    return (
        <CheckoutContext.Provider value={{ checkoutData, updateCheckout, resetCheckout }}>
            {children}
        </CheckoutContext.Provider>
    );
};
