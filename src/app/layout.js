import "@/styles/globals.css";
import Header from '@/components/Header';
import Footer from "@/components/Footer";
import { Poppins } from "@next/font/google";
import { getLogo } from '@/lib/pages'; 

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  icons: {
    icon: '/favicon.ico',
  },
};

const RootLayout = async ({ children }) => {
  const logoData = await getLogo();
  const logo = logoData.length > 0
    ? {
        src: logoData[0].sourceUrl,
        width: logoData[0].mediaDetails.width,
        height: logoData[0].mediaDetails.height,
      }
    : {
        src: '/logo.webp',
        width: 100,
        height: 100,
      };

  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header logo={logo} />
        {children}
        <Footer logo={logo} />
      </body>
    </html>
  );
};

export default RootLayout;
