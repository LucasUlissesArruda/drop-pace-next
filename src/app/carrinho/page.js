'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';
import './carrinho.css';

export default function CarrinhoPage() {
    const { cart, removeFromCart } = useCart();

    const parseCurrency = (value) => {
        if (typeof value !== 'string') return 0;
        return parseFloat(value.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
    };

    const total = useMemo(() => {
        return cart.reduce((acc, item) => {
            const price = parseCurrency(item.preco);
            return acc + (price * item.quantity);
        }, 0);
    }, [cart]);

    const formatCurrency = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    if (cart.length === 0) {
        return (
            <div className="cart-wrapper">
                <div className="empty-cart-state">
                    <h2>Seu carrinho está vazio</h2>
                    <p>Parece que você ainda não adicionou nenhum sneaker.</p>
                    <Link href="/" className="btn-continue-shopping">
                        Explorar Produtos
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-wrapper">
            <div className="cart-header-row">
                <h1 className="cart-title">Seu Carrinho ({cart.reduce((a, c) => a + c.quantity, 0)})</h1>
            </div>
            
            <div className="cart-grid">
                {/* LADO ESQUERDO: Lista de Produtos */}
                <div className="cart-items-list">
                    {cart.map((item) => (
                        <div key={`${item.id}-${item.size}`} className="cart-item-row">
                            <div className="cart-item-img-box">
                                <Image 
                                    src={item.imagem} 
                                    alt={item.nome} 
                                    width={120} 
                                    height={120} 
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            
                            <div className="cart-item-info">
                                <div className="cart-item-top">
                                    <h3>{item.nome}</h3>
                                    <span className="cart-item-price">{item.preco}</span>
                                </div>
                                
                                <div className="cart-item-details">
                                    <span className="badge-detail">Tam: {item.size}</span>
                                    <span className="badge-detail">Qtd: {item.quantity}</span>
                                </div>

                                <button 
                                    onClick={() => removeFromCart(item.id, item.size)}
                                    className="btn-remove-item"
                                >
                                    Remover
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* LADO DIREITO: Resumo (Sticky) */}
                <aside className="cart-summary-sidebar">
                    <div className="summary-box">
                        <h2>Resumo do Pedido</h2>
                        
                        <div className="summary-line">
                            <span>Subtotal</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                        
                        <div className="summary-line">
                            <span>Frete</span>
                            <span className="text-green">Grátis</span>
                        </div>
                        
                        <div className="divider"></div>
                        
                        <div className="summary-line total">
                            <span>Total</span>
                            <span>{formatCurrency(total)}</span>
                        </div>

                        <button className="btn-checkout-final">
                            Finalizar Compra
                        </button>
                        
                        <p className="secure-text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                            </svg>
                            Compra Segura
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
}