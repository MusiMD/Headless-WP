import "@/styles/globals.css";
import Header from '../components/Header'
import Footer from "@/components/Footer";
import { Poppins } from "@next/font/google";

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function App({ Component, pageProps }) {
  return (
  <>
    <div className={poppins.className}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  </>
  );
}
