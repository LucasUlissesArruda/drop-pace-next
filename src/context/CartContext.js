'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem('drop-pace-cart');
            if (storedCart) {
                setCart(JSON.parse(storedCart));
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('drop-pace-cart', JSON.stringify(cart));
        }
    }, [cart]);

    const triggerOverlay = () => {
        setShowOverlay(true);
        setTimeout(() => {
            setShowOverlay(false);
        }, 1200);
    };

    const addToCart = (product, size, quantity = 1) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex(
                (item) => item.id === product.id && item.size === size
            );

            if (existingItemIndex > -1) {
                const newCart = [...prevCart];
                const itemAtual = newCart[existingItemIndex];
                newCart[existingItemIndex] = {
                    ...itemAtual,
                    quantity: itemAtual.quantity + quantity
                };
                return newCart;
            } else {
                return [...prevCart, { ...product, size, quantity }];
            }
        });
        triggerOverlay();
    };

    const removeFromCart = (productId, size) => {
        setCart((prevCart) => 
            prevCart.filter((item) => !(item.id === productId && item.size === size))
        );
    };

    // --- NOVA FUNÇÃO: LIMPAR CARRINHO ---
    const clearCart = () => {
        setCart([]);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('drop-pace-cart');
        }
    };

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        // Adicionamos 'clearCart' aqui no value para ficar acessível
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount }}>
            {children}
            
            {/* OVERLAY DE "ADICIONADO AO CARRINHO" */}
            <div className={`added-overlay ${showOverlay ? 'active' : ''}`}>
                <div className="overlay-center-box">
                    <div className="bag-animation-container">
                         <svg className="bag-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect className="drop-box" x="35" y="-30" width="30" height="20" rx="2" fill="#00ff88"/>
                            <path className="bag-body" d="M20 30H80L75 90H25L20 30Z" stroke="white" strokeWidth="4" fill="#111"/>
                            <path className="bag-handle" d="M35 30V20C35 11.7157 41.7157 5 50 5C58.2843 5 65 11.7157 65 20V30" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                        </svg>
                    </div>
                    <h2>PRODUTO ADICIONADO!</h2>
                    <p>Já está na tua sacola.</p>
                </div>
            </div>
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);