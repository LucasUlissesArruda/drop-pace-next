/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignora erros de lint durante o deploy (Perigoso, mas útil para testes rápidos)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;