import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ThemeProvider from "@/components/ThemeProvider/ThemeProvider";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight:["400","500","700","900"],
  style:["italic","normal"],
  variable:"--font-poppins" 
});

export const metadata: Metadata = {
  title: "Hotel",
  description: "Seu Refúgio de Tranquilidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
       <ThemeProvider>
       <main className="font-normal">
          <Header/>
          {children}
          <Footer/>
        </main>
       </ThemeProvider>
      </body>
    </html>
  );
}
