import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {

  title: "Nikus Andhra Kitchen | Authentic Andhra Restaurant",

  description:
    "Experience premium Andhra cuisine with authentic biryanis, starters, reservations, delivery and smart dining at Nikus Andhra Kitchen.",

  keywords: [
    "Andhra Restaurant",
    "Biryani",
    "Nikus Andhra Kitchen",
    "Chicken Biryani",
    "Table Reservation",
    "Food Delivery",
    "Andhra Food",
  ],

  authors: [
    {
      name: "Nikus Andhra Kitchen",
    },
  ],

  openGraph: {

    title:
      "Nikus Andhra Kitchen",

    description:
      "Premium Andhra dining experience with authentic flavors.",

    url:
      "https://nikus-andhra-kitchen.vercel.app",

    siteName:
      "Nikus Andhra Kitchen",

    locale:
      "en_IN",

    type:
      "website",

  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        h-full
        antialiased
      `}
    >

      <body className="min-h-full flex flex-col bg-black text-white">

        {children}

      </body>

    </html>

  );
}