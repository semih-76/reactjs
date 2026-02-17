import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // 1. On initialise avec ce qu'il y a dans le localStorage (ou vide)
    const [items, setItems] = useState(() => {
        const savedCart = localStorage.getItem('monPanier');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // 2. On sauvegarde dans le localStorage à chaque changement
    useEffect(() => {
        localStorage.setItem('monPanier', JSON.stringify(items));
    }, [items]);

    // 3. Fonction pour ajouter un produit
    const addToCart = (product) => {
        setItems(prevItems => {
            const isExist = prevItems.find(item => item.id === product.id);
            if (isExist) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantite: item.quantite + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantite: 1 }];
        });
    };

    // 4. Fonction pour supprimer
    const removeItem = (id) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    // 5. Update quantité
    const updateQuantity = (id, delta) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantite: Math.max(1, item.quantite + delta) } : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ items, addToCart, removeItem, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook personnalisé pour utiliser le panier facilement
export const useCart = () => useContext(CartContext);