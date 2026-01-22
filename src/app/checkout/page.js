'use client';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import './checkout.css';
import confetti from 'canvas-confetti';

export default function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const router = useRouter();
    
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    // --- ESTADOS DOS CAMPOS (Para controlar o que é digitado) ---
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [cep, setCep] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (cart.length === 0 && !isSuccess) {
            router.push('/carrinho');
        }
    }, [cart, isSuccess, router]);

    const parseCurrency = (val) => parseFloat(val.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
    const subtotal = cart.reduce((acc, item) => acc + (parseCurrency(item.preco) * item.quantity), 0);
    const total = subtotal;

    // --- FUNÇÕES DE MÁSCARA (A Mágica acontece aqui) ---
    
    // Formata: 00000-000
    const handleCepChange = (e) => {
        let val = e.target.value.replace(/\D/g, ''); // Remove tudo o que não é número
        if (val.length > 8) val = val.slice(0, 8); // Limita tamanho
        if (val.length > 5) val = val.replace(/^(\d{5})(\d)/, '$1-$2'); // Adiciona o traço
        setCep(val);
    };

    // Formata: (11) 90000-0000
    const handlePhoneChange = (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 11) val = val.slice(0, 11);
        if (val.length > 2) val = val.replace(/^(\d{2})(\d)/, '($1) $2');
        if (val.length > 7) val = val.replace(/(\d{5})(\d)/, '$1-$2');
        setPhone(val);
    };

    // Formata: 0000 0000 0000 0000
    const handleCardNumberChange = (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 16) val = val.slice(0, 16);
        val = val.replace(/(\d{4})(?=\d)/g, '$1 '); // Espaço a cada 4 dígitos
        setCardNumber(val);
    };

    // Formata: MM/AA
    const handleCardExpiryChange = (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 4) val = val.slice(0, 4);
        if (val.length > 2) val = val.replace(/^(\d{2})(\d)/, '$1/$2'); // Adiciona a barra
        setCardExpiry(val);
    };

    // Limita CVV a 3 ou 4 dígitos
    const handleCvvChange = (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 4) val = val.slice(0, 4);
        setCardCvv(val);
    };

    const fireSubtleConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00ff88', '#ffffff', '#111111'],
            ticks: 200,
            gravity: 1.2,
            decay: 0.94,
            startVelocity: 30,
            disableForReducedMotion: true
        });
    };

    const handlePayment = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            clearCart(); 
            fireSubtleConfetti();
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
                    <p>Obrigado pela tua compra. O teu pedido #DP-{Math.floor(Math.random() * 10000)} foi recebido.</p>
                    <Link href="/" className="btn-back-home">Voltar à Loja</Link>
                </div>
            </div>
        );
    }

    if (cart.length === 0) return null;

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
                                    
                                    {/* CAMPO CEP COM MÁSCARA */}
                                    <input 
                                        type="text" 
                                        placeholder="CEP (00000-000)" 
                                        required 
                                        className="input-field"
                                        value={cep}
                                        onChange={handleCepChange}
                                        inputMode="numeric"
                                    />
                                </div>
                                <div className="input-group">
                                    {/* CAMPO TELEFONE COM MÁSCARA */}
                                    <input 
                                        type="tel" 
                                        placeholder="Telefone (11) 90000-0000" 
                                        required 
                                        className="input-field full" 
                                        value={phone}
                                        onChange={handlePhoneChange}
                                    />
                                </div>
                            </section>

                            {/* Seção de Pagamento */}
                            <section className="form-section">
                                <h3>Pagamento</h3>
                                <div className="payment-box">
                                    <div className="card-mockup">
                                        <div className="card-chip"></div>
                                        {/* Número do cartão dinâmico */}
                                        <div className="card-number">
                                            {cardNumber || '•••• •••• •••• ••••'}
                                        </div>
                                        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px', color: '#aaa', fontSize: '0.8rem'}}>
                                            <span>Nome do Titular</span>
                                            <span>Validade</span>
                                        </div>
                                        <div style={{display: 'flex', justifyContent: 'space-between', color: '#fff', fontWeight: '600', textTransform: 'uppercase'}}>
                                            <span>{cardName || 'SEU NOME'}</span>
                                            {/* Validade dinâmica */}
                                            <span>{cardExpiry || 'MM/AA'}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="input-group">
                                        {/* CARTÃO COM MÁSCARA */}
                                        <input 
                                            type="text" 
                                            placeholder="Número do Cartão" 
                                            required 
                                            className="input-field full" 
                                            value={cardNumber}
                                            onChange={handleCardNumberChange}
                                            maxLength={19}
                                            inputMode="numeric"
                                        />
                                    </div>
                                    <div className="input-row">
                                        {/* VALIDADE COM MÁSCARA */}
                                        <input 
                                            type="text" 
                                            placeholder="Validade (MM/AA)" 
                                            required 
                                            className="input-field" 
                                            value={cardExpiry}
                                            onChange={handleCardExpiryChange}
                                            maxLength={5}
                                            inputMode="numeric"
                                        />
                                        
                                        {/* CVV COM MÁSCARA */}
                                        <input 
                                            type="text" 
                                            placeholder="CVV" 
                                            required 
                                            className="input-field" 
                                            value={cardCvv}
                                            onChange={handleCvvChange}
                                            maxLength={4}
                                            inputMode="numeric"
                                        />
                                    </div>
                                    <div className="input-group">
                                        <input 
                                            type="text" 
                                            placeholder="Nome no Cartão" 
                                            required 
                                            className="input-field full"
                                            value={cardName}
                                            onChange={(e) => setCardName(e.target.value)}
                                            maxLength={26}
                                        />
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