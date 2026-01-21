'use client'; 

import Link from 'next/link';
import { useState, useEffect } from 'react';
import anime from 'animejs'; 
import { useCart } from '@/context/CartContext'; // Importamos o contexto

export default function Header() {
    const { cartCount } = useCart(); // Pegamos o contador dinâmico
    
    // Estado para controlar o efeito de scroll
    const [scrolled, setScrolled] = useState(false);
    // Estado para controlar qual menu dropdown está ativo
    const [activeMenu, setActiveMenu] = useState(null);

    useEffect(() => {
        // Lógica para o header fixo ao rolar
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);

        // Lógica da animação do logo
        import('animejs').then(module => {
            const anime = module.default;
            const logo = document.querySelector('.logo-caligrafia');
            if (logo && !logo.classList.contains('animated')) {
                logo.classList.add('animated');
                const textContent = logo.textContent;
                logo.innerHTML = textContent.replace(/\S/g, "<span class='letter'>$&</span>");
                
                anime.timeline({ loop: true })
                    .add({
                        targets: '.logo-caligrafia .letter',
                        translateY: [{ value: -5, duration: 800 }, { value: 0, duration: 800 }],
                        delay: anime.stagger(50),
                        easing: 'easeInOutSine'
                    });
            }
        });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // A lógica para o menu hamburger ficaria aqui (se ativada no futuro)
    const handleMenuToggle = () => {
        // ...
    };

    return (
        <header 
            className={scrolled ? 'main-header scrolled' : 'main-header'}
            // O onMouseLeave principal garante que o menu feche se o mouse sair do header
            onMouseLeave={() => setActiveMenu(null)}
        >
            <div className="container">
                <div className="header-left">
                     <a href="#" aria-label="Buscar"><svg className="header-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10,18a8,8,0,1,1,8-8A8,8,0,0,1,10,18ZM10,4a6,6,0,1,0,6,6A6,6,0,0,0,10,4Z"/><path d="M21,22a1,1,0,0,1-.71-.29l-4-4a1,1,0,0,1,1.42-1.42l4,4a1,1,0,0,1,0,1.42A1,1,0,0,1,21,22Z"/></svg></a>
                </div>

                <nav className="main-nav">
                    <ul>
                        <li 
                            className="nav-item" 
                            onMouseEnter={() => setActiveMenu('categorias')}
                            onMouseLeave={() => setActiveMenu(null)}
                        >
                            <a href="#">Categorias</a>
                            <div className={activeMenu === 'categorias' ? 'dropdown-content is-active' : 'dropdown-content'}>
                                <div className="dropdown-column">
                                    <h4>Destaques</h4>
                                    <ul>
                                        <li><a href="#">Lançamentos</a></li>
                                        <li><a href="#">Exclusivos SNKRS</a></li>
                                        <li><a href="#">Collabs</a></li>
                                        <li><a href="#">Mais Vendidos</a></li>
                                    </ul>
                                </div>
                                <div className="dropdown-column">
                                    <h4>Estilos</h4>
                                    <ul>
                                        <li><a href="#">Casual</a></li>
                                        <li><a href="#">Cano Baixo</a></li>
                                        <li><a href="#">Cano Alto</a></li>
                                        <li><a href="#">Plataforma</a></li>
                                        <li><a href="#">Slip-On</a></li>
                                    </ul>
                                </div>
                                <div className="dropdown-column">
                                    <h4>Performance</h4>
                                    <ul>
                                        <li><a href="#">Basquete</a></li>
                                        <li><a href="#">Skateboarding</a></li>
                                        <li><a href="#">Corrida</a></li>
                                        <li><a href="#">Treino</a></li>
                                    </ul>
                                </div>
                                <div className="dropdown-column">
                                    <h4>Modelos Icônicos</h4>
                                    <ul>
                                        <li><a href="#">Nike Dunk</a></li>
                                        <li><a href="#">Air Force 1</a></li>
                                        <li><a href="#">Air Jordan</a></li>
                                        <li><a href="#">Adidas Forum</a></li>
                                        <li><a href="#">New Balance 550</a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li className="nav-logo-item">
                            <Link href="/" className="logo-caligrafia">Drop Pace</Link>
                        </li>
                        
                        <li 
                            className="nav-item"
                            onMouseEnter={() => setActiveMenu('marcas')}
                            onMouseLeave={() => setActiveMenu(null)}
                        >
                            <a href="#">Marcas</a>
                            <div className={activeMenu === 'marcas' ? 'dropdown-content is-active' : 'dropdown-content'}>
                                <div className="dropdown-column">
                                    <h4></h4>
                                    <ul>
                                        <li><a href="#">Nike</a></li>
                                        <li><a href="#">Jordan</a></li>
                                        <li><a href="#">Adidas</a></li>
                                        <li><a href="#">New Balance</a></li>
                                        <li><a href="#">Puma</a></li>
                                    </ul>
                                </div>
                                <div className="dropdown-column">
                                    <h4></h4>
                                    <ul>
                                        <li><a href="#">Vans</a></li>
                                        <li><a href="#">Converse</a></li>
                                        <li><a href="#">Reebok</a></li>
                                        <li><a href="#">Asics</a></li>
                                        <li><a href="#">Mizuno</a></li>
                                    </ul>
                                </div>
                                <div className="dropdown-column">
                                    <h4></h4>
                                    <ul>
                                        <li><a href="#">Vert</a></li>
                                        <li><a href="#">On Running</a></li>
                                        <li><a href="#">Hoka</a></li>
                                        <li><a href="#">Salomon</a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>

                <div className="header-right">
                    <div className="header-cart">
                        <Link href="/carrinho" aria-label="Ver carrinho de compras">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="header-icon" viewBox="0 0 16 16">
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                            </svg>
                            {/* AQUI ESTÁ A MUDANÇA: Exibimos a variável cartCount */}
                            <span className="cart-counter">{cartCount}</span>
                        </Link>
                    </div>
                    <button className="btn-login">Entrar</button>
                </div>
            </div>
        </header>
    );
}