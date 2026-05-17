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
  metadataBase: new URL(
    "https://nikus-andhra-kitchen.vercel.app"
  ),

  title: {
    default:
      "Nikus Andhra Kitchen | Authentic Andhra Restaurant",
    template:
      "%s | Nikus Andhra Kitchen",
  },

  description:
    "Experience premium Andhra cuisine with authentic biryanis, starters, reservations, seafood specials, delivery and smart dining at Nikus Andhra Kitchen.",

  keywords: [
    "Andhra Restaurant",
    "Biryani",
    "Nikus Andhra Kitchen",
    "Chicken Biryani",
    "Mutton Biryani",
    "Prawns Biryani",
    "Table Reservation",
    "Food Delivery",
    "Andhra Food",
    "Seafood Restaurant",
    "Restaurant in Bangalore",
  ],

  authors: [
    {
      name: "Nikus Andhra Kitchen",
    },
  ],

  creator: "Nikus Andhra Kitchen",

  publisher: "Nikus Andhra Kitchen",

  applicationName: "Nikus Andhra Kitchen",

  category: "Restaurant",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title:
      "Nikus Andhra Kitchen",

    description:
      "Premium Andhra dining experience with authentic flavors, biryanis and seafood specials.",

    url:
      "https://nikus-andhra-kitchen.vercel.app",

    siteName:
      "Nikus Andhra Kitchen",

    locale:
      "en_IN",

    type:
      "website",

    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Nikus Andhra Kitchen",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Nikus Andhra Kitchen",

    description:
      "Authentic Andhra flavours with premium dining experience.",

    images: ["/logo.png"],
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
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
      suppressHydrationWarning
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        h-full
        scroll-smooth
        antialiased
      `}
    >
      <body
        className="
          min-h-screen
          flex
          flex-col
          bg-black
          text-white
          overflow-x-hidden
          font-sans
        "
      >
        {children}
      </body>
    </html>
  );
}