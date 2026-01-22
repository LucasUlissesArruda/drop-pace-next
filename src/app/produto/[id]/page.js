'use client';
import { produtos } from '@/lib/database';
import { notFound } from 'next/navigation';
import { useState, use } from 'react';
import Image from 'next/image';
import '../produto.css';
import { useCart } from '@/context/CartContext';

export default function ProdutoPage({ params }) {
    const { id } = use(params);
    const produto = produtos[id];
    
    // Importamos a nova função aqui
    const { addToCart, showToastWarning } = useCart();

    if (!produto) {
        notFound();
    }

    const [mainImage, setMainImage] = useState(produto.imagens[0]);
    const [activeSize, setActiveSize] = useState(null);

    const handleAddToCart = () => {
        if (!activeSize) {
            // AQUI ESTÁ A MUDANÇA: Trocamos o alert pelo nosso Toast
            showToastWarning("Por favor, selecione um tamanho.");
            return;
        }

        const item = {
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: mainImage,
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
                                onClick={handleAddToCart}
                            >
                                Adicionar ao Carrinho
                            </button>
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