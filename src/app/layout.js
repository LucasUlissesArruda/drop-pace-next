// src/app/layout.js
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';
import { CartProvider } from '@/context/CartContext'; // <--- Importar isto

export const metadata = {
  title: 'Drop Pace',
  description: 'O seu lugar para os melhores sneakers.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {/* Envolver tudo com o CartProvider */}
        <CartProvider>
            <Header />
            <main>
            {children}
            </main>
            <Footer />
        </CartProvider>
      </body>
    </html>
  );
}