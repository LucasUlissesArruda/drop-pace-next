import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css'; // AQUI é o único lugar onde o CSS global é importado.

export const metadata = {
  title: 'Drop Pace',
  description: 'O seu lugar para os melhores sneakers.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}