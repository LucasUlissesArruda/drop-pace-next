'use client';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import './checkout.css';

export default function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const router = useRouter();
    
    // Estados para simular o processo
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Redireciona se o carrinho estiver vazio (e não for sucesso ainda)
    useEffect(() => {
        if (cart.length === 0 && !isSuccess) {
            router.push('/carrinho');
        }
    }, [cart, isSuccess, router]);

    // Calcula totais
    const parseCurrency = (val) => parseFloat(val.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
    const subtotal = cart.reduce((acc, item) => acc + (parseCurrency(item.preco) * item.quantity), 0);
    const total = subtotal; // Poderia adicionar frete aqui

    const handlePayment = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simula tempo de processamento do cartão
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            clearCart(); // Limpa o carrinho
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="checkout-success-container">
                <div className="success-box">
                    <div className="success-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <h1>Pagamento Confirmado!</h1>
                    <p>Obrigado pela tua compra, Lucas. O teu pedido #DP-{Math.floor(Math.random() * 10000)} foi recebido.</p>
                    <Link href="/" className="btn-back-home">Voltar à Loja</Link>
                </div>
            </div>
        );
    }

    if (cart.length === 0) return null; // Evita piscar a tela antes do redirect

    return (
        <div className="checkout-page-wrapper">
            <div className="checkout-container">
                <div className="checkout-grid">
                    
                    {/* COLUNA DA ESQUERDA: FORMULÁRIO */}
                    <div className="form-column">
                        <div className="checkout-header">
                            <h2>Finalizar Compra</h2>
                        </div>

                        <form onSubmit={handlePayment} className="checkout-form">
                            {/* Seção de Dados */}
                            <section className="form-section">
                                <h3>Informações de Envio</h3>
                                <div className="input-group">
                                    <input type="email" placeholder="Email" required className="input-field full" />
                                </div>
                                <div className="input-row">
                                    <input type="text" placeholder="Nome" required className="input-field" />
                                    <input type="text" placeholder="Sobrenome" required className="input-field" />
                                </div>
                                <div className="input-group">
                                    <input type="text" placeholder="Endereço" required className="input-field full" />
                                </div>
                                <div className="input-row">
                                    <input type="text" placeholder="Cidade" required className="input-field" />
                                    <input type="text" placeholder="CEP" required className="input-field" />
                                </div>
                                <div className="input-group">
                                    <input type="tel" placeholder="Telefone" required className="input-field full" />
                                </div>
                            </section>

                            {/* Seção de Pagamento */}
                            <section className="form-section">
                                <h3>Pagamento</h3>
                                <div className="payment-box">
                                    <div className="card-mockup">
                                        <div className="card-chip"></div>
                                        <div className="card-number">•••• •••• •••• 4242</div>
                                    </div>
                                    <div className="input-group">
                                        <input type="text" placeholder="Número do Cartão" required className="input-field full" />
                                    </div>
                                    <div className="input-row">
                                        <input type="text" placeholder="Validade (MM/AA)" required className="input-field" />
                                        <input type="text" placeholder="CVV" required className="input-field" />
                                    </div>
                                    <div className="input-group">
                                        <input type="text" placeholder="Nome no Cartão" required className="input-field full" />
                                    </div>
                                </div>
                            </section>

                            <button type="submit" className="btn-pay-now" disabled={isProcessing}>
                                {isProcessing ? 'Processando...' : `Pagar ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
                            </button>
                        </form>
                    </div>

                    {/* COLUNA DA DIREITA: RESUMO */}
                    <div className="summary-column">
                        <div className="order-summary-box">
                            <h3>Resumo do Pedido</h3>
                            <div className="summary-items">
                                {cart.map(item => (
                                    <div key={`${item.id}-${item.size}`} className="summary-item">
                                        <div className="summary-img">
                                            <Image src={item.imagem} alt={item.nome} width={64} height={64} style={{objectFit: 'cover'}} />
                                            <span className="qty-badge">{item.quantity}</span>
                                        </div>
                                        <div className="summary-info">
                                            <p className="summary-name">{item.nome}</p>
                                            <p className="summary-desc">Tam: {item.size}</p>
                                        </div>
                                        <div className="summary-price">
                                            {item.preco}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="summary-totals">
                                <div className="total-row">
                                    <span>Subtotal</span>
                                    <span>{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                </div>
                                <div className="total-row">
                                    <span>Frete</span>
                                    <span>Grátis</span>
                                </div>
                                <div className="total-row final">
                                    <span>Total</span>
                                    <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}