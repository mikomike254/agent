import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Premium, clean sans-serif
import "./globals.css";
import { Providers } from "./providers";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tech Developers - Kenya & East Africa",
  description: "Premier marketplace for vetted developers with escrow protection and 110% refund guarantee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased bg-gray-50/50`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
