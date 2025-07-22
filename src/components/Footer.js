import Link from 'next/link';
import Image from 'next/image'; // Usaremos para a imagem de pagamentos

export default function Footer() {
    return (
        <footer className="main-footer">
            <div className="container">
                <div className="footer-main">

                    <div className="footer-column">
                        <h4>Categorias</h4>
                        <ul>
                            <li><a href="#">Lançamentos</a></li>
                            <li><a href="#">Basquete</a></li>
                            <li><a href="#">Skateboarding</a></li>
                            <li><a href="#">Casual</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Ajuda</h4>
                        <ul>
                            <li><a href="#">Perguntas Frequentes (FAQ)</a></li>
                            <li><a href="#">Rastrear Pedido</a></li>
                            <li><a href="#">Política de Troca</a></li>
                            <li><a href="#">Contato</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Institucional</h4>
                        <ul>
                            <li><a href="#">Sobre Nós</a></li>
                            <li><a href="#">Termos de Serviço</a></li>
                            <li><a href="#">Política de Privacidade</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Siga-nos</h4>
                        <div className="social-links">
                            <a href="https://www.instagram.com/lucas_arrudx/" aria-label="Instagram">
                                {/* Ícone antigo do Instagram trocado por este: */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                </svg>
                            </a>
                            <a href="#" aria-label="TikTok">
                                {/* Ícone antigo do TikTok trocado por este: */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-tiktok" viewBox="0 0 16 16">
                                    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p className="copyright">© 2025 Drop Pace. Todos os direitos reservados.</p>
                    <div className="payment-methods">
                        {/* O <Image> foi substituído pelo texto e o novo ícone SVG */}
                        <p>Formas de Pagamento</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-credit-card-2-back" viewBox="0 0 16 16">
                            <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z" />
                            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1m-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1" />
                        </svg>
                    </div>
                </div>
            </div>
        </footer>
    );
}