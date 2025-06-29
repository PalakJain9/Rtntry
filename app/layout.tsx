import type { Metadata } from "next";
import { Roboto, Kalnia } from 'next/font/google';
import '../app/globals.css'; 

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

const kalnia = Kalnia({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Choose weights as needed
  variable: '--font-kalnia',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Ratnatray",
  description: "Ratnatray Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${kalnia.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
