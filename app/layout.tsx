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
  weight: ['400', '500', '600', '700'],
  variable: '--font-kalnia',
  display: 'swap',
})

const PINTEREST_KEY = process.env.PINTEREST_DOMAIN_VERIFY_KEY as string;

export const metadata: Metadata = {
  title: "Ratnatray",
  description: "Ratnatray Blog",
  other: {
    'p:domain_verify': PINTEREST_KEY,
  }
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
