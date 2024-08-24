import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/componenets/Navbar";
import Footer from "@/componenets/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TransMark",
  description: "Your one-click transcript analysis solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">  
      <body className={inter.className}>
       
        {children}
   
      </body>
    </html>
  );
}
