"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Mulish } from "next/font/google";
import "./globals.css";
import Topbar from "./components/common/Topbar/Topbar";
import Navbar from "./components/common/Navbar/Navbar";
const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});


export default function RootLayout({ children }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let scrollTween = gsap.to("body", {
      ease: "power1.out",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    return () => {
      scrollTween.kill();
    };
  }, []);

  return (
    <html lang="en">
      <body className={`${mulish.variable} antialiased`}>
       
         <Navbar/>
       
        {children}
      </body>
    </html>
  );
}
