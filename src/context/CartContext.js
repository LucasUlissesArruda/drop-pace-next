'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    
    // Estado para controlar a notificação "Toast"
    const [toast, setToast] = useState({ visible: false, message: '' });

    // Carregar do localStorage ao iniciar
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem('drop-pace-cart');
            if (storedCart) {
                setCart(JSON.parse(storedCart));
            }
        }
    }, []);

    // Salvar no localStorage sempre que o carrinho mudar
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('drop-pace-cart', JSON.stringify(cart));
        }
    }, [cart]);

    // Função para mostrar a notificação
    const showToast = (message) => {
        setToast({ visible: true, message });
        setTimeout(() => {
            setToast({ visible: false, message: '' });
        }, 3000);
    };

    const addToCart = (product, size, quantity = 1) => {
        setCart((prevCart) => {
            // Verifica se o item já existe
            const existingItemIndex = prevCart.findIndex(
                (item) => item.id === product.id && item.size === size
            );

            if (existingItemIndex > -1) {
                // CORREÇÃO CRÍTICA AQUI:
                // Antes, estávamos editando o item original. Agora criamos uma cópia.
                const newCart = [...prevCart];
                const itemAtual = newCart[existingItemIndex];

                newCart[existingItemIndex] = {
                    ...itemAtual,
                    quantity: itemAtual.quantity + quantity
                };
                
                return newCart;
            } else {
                // Se não existe, adiciona novo
                return [...prevCart, { ...product, size, quantity }];
            }
        });
        
        // Chama a notificação
        showToast(`Boa! ${product.nome} adicionado.`);
    };

    const removeFromCart = (productId, size) => {
        setCart((prevCart) => 
            prevCart.filter((item) => !(item.id === productId && item.size === size))
        );
    };

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount }}>
            {children}
            
            {/* O Componente Visual do Toast */}
            <div className={`toast-notification ${toast.visible ? 'show' : ''}`}>
                <div className="toast-content">
                    {/* Ícone de Check em SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{toast.message}</span>
                </div>
                <div className={`toast-progress ${toast.visible ? 'active' : ''}`}></div>
            </div>
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);