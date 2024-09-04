import "@/styles/globals.css";
import Header from '@/components/Header'
import Footer from "@/components/Footer";
import { Poppins } from "next/font/google";


const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  icons: {
    icon: '/favicon.ico',
  },
};

const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <body className={poppins.className}>
            <Header />
            {children}
            <Footer />
        </body>
    </html>
  )
}

export default RootLayout