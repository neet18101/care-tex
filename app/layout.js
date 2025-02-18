'use client'
import { Mulish } from "next/font/google";
import 'lenis/dist/lenis.css'
import "./globals.css";
import Navbar from "./components/common/Navbar/Navbar";
import Lenis from "lenis";
import Footer from "./components/common/Footer/Footer";
const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});


export default function RootLayout({ children }) {

  // Initialize Lenis
  const lenis = new Lenis();

  // Use requestAnimationFrame to continuously update the scroll
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  return (
    <html lang="en">
      <body className={`${mulish.variable} antialiased`}>




        <Navbar />

        {children}

        <Footer/>

      </body>
    </html>
  );
}
