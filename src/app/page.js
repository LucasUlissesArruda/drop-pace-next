import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="page-content">

      <section className="hero-banner ">
        <div className="hero-text">
          <h2>New Balance 9060</h2>
          <p>Atitude, conforto e personalidade.</p>
          <Link href="/produto/new-balance-9060" className="cta-button">
            Disponível Agora <span className="arrow">→</span>
          </Link>
        </div>
        <div className="hero-image">
          {/* Tag <img> convertida para <Image> do Next.js */}
          <Image src="/img/NewBalance8080.png" alt="Tênis New Balance 9060 em azul e branco" width={550} height={243} priority />
        </div>
      </section>

      <section className="product-showcase">
        <h2 className="showcase-title">New Balance 725</h2>
        <div className="product-grid">

          <article className="product-card">
            <Link href="/produto/New-Balance-725-Sea-Salt-Phantom-Bone">
              <div className="product-image-container">
                <Image src="https://lojavirus.fbitsstatic.net/img/p/tenis-new-balance-725-sea-salt-phantom-ml725ca-75623/317599.jpg?w=1200&h=1200&v=no-value" alt="New Balance 725 Sea Salt" width={240} height={240}/>
              </div>
              <h3 className="product-name">New Balance 725 Sea Salt Phantom Bone</h3>
              <div className="product-price">
                <span className="price">R$ 1300</span>
                <span className="discount">+18%</span>
              </div>
            </Link>
          </article>

          <article className="product-card">
            <Link href="/produto/New-Balance-725-Black-Angora">
              <div className="product-image-container">
                <Image src="https://droper-media.us-southeast-1.linodeobjects.com/1472024225836277.jpg" alt="New Balance 725 Grey Matter" width={240} height={240}/>
              </div>
              <h3 className="product-name">New Balance 725 Grey Matter Black White</h3>
              <div className="product-price">
                <span className="price">R$ 1200</span>
                <span className="discount">+9%</span>
              </div>
            </Link>
          </article>

          <article className="product-card">
            <Link href="/produto/New-Balance-725-Black-Angora">
              <div className="product-image-container">
                <Image src="https://droper-media.us-southeast-1.linodeobjects.com/2820242245458.jpg" alt="New Balance 725 Black Angora" width={240} height={240}/>
              </div>
              <h3 className="product-name">New Balance 725 Black Angora</h3>
              <div className="product-price">
                <span className="price">R$ 779</span>
              </div>
            </Link>
          </article>

          <article className="product-card">
            <Link href="/produto?id=new-balance-725-white-black">
              <div className="product-image-container">
                <Image src="https://droper-lapse.us-southeast-1.linodeobjects.com/20250506182617275-439.webp" alt="New Balance 725 White Black" width={240} height={240}/>
              </div>
              <h3 className="product-name">New Balance 725 White Black</h3>
              <div className="product-price">
                <span className="price">R$ 900</span>
              </div>
            </Link>
          </article>

          <article className="product-card">
            <Link href="/produto?id=new-balance-725-white-royal">
              <div className="product-image-container">
                <Image src="https://droper-lapse.us-southeast-1.linodeobjects.com/202504291835318-495.webp" alt="New Balance 725 White Team Royal" width={240} height={240}/>
              </div>
              <h3 className="product-name">New Balance 725 White Team Royal</h3>
              <div className="product-price">
                <span className="price-old">R$ 900</span>
                <span className="price-new">R$ 630</span>
                <span className="discount-percent">-30%</span>
              </div>
            </Link>
          </article>
        </div>
        <br></br>
        <br></br>
      </section>

      <section className="hero-banner hero-banner--reversed " height ={537} >
        <div className="hero-image">
          {/* Lembrete: Domínios de imagem externos precisam ser autorizados no arquivo next.config.js */}
          <Image src="https://sneakersul.com.br/cdn/shop/files/air-jordan-1-low-travis-scott-olive-1.webp?v=1711911744&width=533" alt="Tênis Air Jordan 1 Low Travis Scott Reverse Mocha" width={553} height={488} margin-bottom ={63}/>
        </div>
        <div className="hero-text">
          <h2>Nike x Travis Scott</h2>
          <p>A parceria que redefine a cultura sneaker.</p>
          <Link href="/produto/travis-scott-aj1-low-olive" className="cta-button">
            Ver Coleção <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      <section className="product-showcase ">
        <h2 className="showcase-title">Lançamentos</h2>
        <div className="featured-grid">

          <article className="featured-card">
            <Link href="/produto/travis-scott-jumpman-red">
                <div className="featured-image-container">
                    <Image 
                        src="/img/Jumpman.jpg" 
                        alt="Travis Scott x Air Jordan 1" 
                        width={450} 
                        height={400} 
                    />
                </div>
                <div className="featured-text-content">
                    <h3 className="product-name">Travis Scott x Air Jordan Jumpman Jack University Red</h3>
                    <p className="featured-description">
                        O cobiçado reverse swoosh em uma das silhuetas mais icônicas da história.
                    </p>
                    <div className="featured-price-cta">
                        <p className="product-price">R$ 4.699,90</p>
                        <span className="cta-button">Ver Detalhes →</span>
                    </div>
                </div>
            </Link>
        </article>

          <div className="side-cards-container">
            <article className="side-card">
              <Link href="/produto/nike-dunk-la-dodgers">
                <div className="side-card-image">
                  <Image src="https://droper-media.us-southeast-1.linodeobjects.com/3072022163851611.webp" alt="Nike SB Dunk Low LA Dodgers" width={80} height={80}/>
                </div>
                <div className="side-card-text">
                  <h3 className="product-name">Nike SB Dunk Low LA Dodgers</h3>
                  <p className="product-price">R$ 1.600,00</p>
                </div>
              </Link>
            </article>

            <article className="side-card">
              <Link href="/produto/tiago-lemos-nb-808">
                <div className="side-card-image">
                  <Image src="https://droper-lapse.us-southeast-1.linodeobjects.com/20250612180856190-145.webp" alt="Tiago Lemos x New Balance 808 Tan Aqua Black" width={80} height={80}/>
                </div>
                <div className="side-card-text">
                  <h3 className="product-name">Tiago Lemos x New Balance 808 Tan Aqua Black</h3>
                  <p className="product-price">R$ 1.119,99</p>
                </div>
              </Link>
            </article>

            <article className="side-card">
              <Link href="/produto/vans-skate-wayvee">
                <div className="side-card-image">
                  <Image src="/img/Vans.jpg" alt="Vans Skate Wayvee Black White" width={80} height={80}/>
                </div>
                <div className="side-card-text">
                  <h3 className="product-name">Vans Skate Wayvee Black White</h3>
                  <p className="product-price">R$ 549,90</p>
                </div>
              </Link>
            </article>

            <article className="side-card">
              <Link href="/produto/puma-suede-xl-dark">
                <div className="side-card-image">
                  <Image src="https://droper-lapse.us-southeast-1.linodeobjects.com/20241018194521347-854.webp" alt="Puma Suede XL Jackhammer Dark" width={80} height={80}/>
                </div>
                <div className="side-card-text">
                  <h3 className="product-name">Puma Suede XL Jackhammer Dark</h3>
                  <p className="product-price">R$ 850,00</p>
                </div>
              </Link>
            </article>
          </div>

        </div>
      </section>
    </main>
  );
}