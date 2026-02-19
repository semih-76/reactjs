import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState(() => {
        const savedCart = localStorage.getItem('monPanier');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        localStorage.setItem('monPanier', JSON.stringify(items));
    }, [items]);

    const showToast = useCallback((product) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, product }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    }, []);

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
        showToast(product);
    };

    const removeItem = (id) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    };

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

            {/* ── TOASTS ── */}
            <div className="toast-container">
                {toasts.map(({ id, product }) => {
                    const imageUrl = product.images
                        ? `${import.meta.env.VITE_API_URL}/images/${product.images}`
                        : 'https://placehold.co/60x60?text=•';

                    return (
                        <div key={id} className="toast">
                            <img src={imageUrl} alt={product.nom} className="toast-img" />
                            <div className="toast-body">
                                <span className="toast-label">Ajouté au panier</span>
                                <span className="toast-name">{product.nom}</span>
                            </div>
                            <div className="toast-check">✓</div>
                        </div>
                    );
                })}
            </div>
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);