import type { Metadata } from "next";
import '../app/globals.css'; 

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
