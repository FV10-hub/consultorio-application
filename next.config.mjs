/** @type {import('next').NextConfig} */
const nextConfig = {
  //output:'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  /*
  TODO: aca tambien se puede configurar que redireecione al levantar la aplicacion 
  redirects: async () => [
    {
      source: "/",
      destination: "/personas", 
      permanent: true, 
    },
    
  ],*/
};

export default nextConfig;
