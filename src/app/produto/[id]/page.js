'use client';
import { produtos } from '@/lib/database';
import { notFound } from 'next/navigation';
import { useState, use } from 'react'; // 'use' é necessário para desenrolar params no Next.js 15
import Image from 'next/image';
import '../produto.css';
import { useCart } from '@/context/CartContext';

export default function ProdutoPage({ params }) {
    // Descompactando params usando use (Padrão do Next.js 15)
    const { id } = use(params);
    const produto = produtos[id];
    
    // Importamos a função de adicionar ao carrinho
    const { addToCart } = useCart();

    if (!produto) {
        notFound();
    }

    const [mainImage, setMainImage] = useState(produto.imagens[0]);
    const [activeSize, setActiveSize] = useState(null);

    // Função que lida com o clique no botão
    const handleAddToCart = () => {
        if (!activeSize) {
            alert("Por favor, selecione um tamanho antes de adicionar.");
            return;
        }

        // Criamos o objeto do produto para o carrinho
        const item = {
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco, // Nota: idealmente converter para número no futuro
            imagem: mainImage, // Usa a imagem que está atualmente em destaque
        };

        addToCart(item, activeSize);
    };

    return (
        <div className="container product-page-container">
            <div className="product-page-grid-v2">
                <section className="product-image-column">
                    {produto.imagens.map((imgSrc, index) => (
                        <div key={index} className="image-wrapper" onClick={() => setMainImage(imgSrc)}>
                            <Image 
                                src={imgSrc} 
                                alt={`${produto.nome} - imagem ${index + 1}`} 
                                width={600} 
                                height={550} 
                                style={{ objectFit: 'cover', cursor: 'pointer' }}
                            />
                        </div>
                    ))}
                </section>

                <section className="product-info-sticky">
                    <div className="info-content">
                        <h1>{produto.nome}</h1>
                        <p className="product-price-pdp">{produto.preco}</p>
                        
                        <div className="size-selector">
                            <div className="size-header">
                                <span>Selecionar Tamanho</span>
                                <a href="#">Guia de Tamanhos</a>
                            </div>
                            <div className="size-options">
                                {[38, 39, 40, 41, 42, 43].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setActiveSize(String(size))}
                                        className={activeSize === String(size) ? 'size-button active' : 'size-button'}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="cta-buttons-pdp">
                            <button 
                                className="btn-add-to-cart"
                                onClick={handleAddToCart} // Conectamos a função aqui
                            >
                                Adicionar ao Carrinho
                            </button>
                            <button className="btn-buy-now">Comprar Agora</button>
                        </div>

                        <div className="product-description">
                            <p>{produto.descricao}</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}