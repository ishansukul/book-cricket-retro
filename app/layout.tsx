import type { Metadata } from "next";
import { Oswald, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book Cricket Retro 🏏 | Indian School Recess Nostalgia",
  description: "Authentic Indian school recess Book Cricket with character archetypes, vintage NCERT textbooks, thumb-riffle physics, and classroom teacher stealth AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${jetbrainsMono.variable} antialiased bg-[#0a0c10]`}>
        {children}
      </body>
    </html>
  );
}
