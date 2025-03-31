"use client";

import { Geist, Geist_Mono, Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import "toastify-js/src/toastify.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap"
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap"
});

const poppins = Poppins({
  weight: "300",
  preload: false,
  display: "swap"
})



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider> {children} </SessionProvider>
      </body>
    </html>
  );
}
