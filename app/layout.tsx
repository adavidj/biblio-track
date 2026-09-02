import type { Metadata } from "next";
import "@fontsource-variable/geist";
import "@fontsource-variable/raleway";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "BiblioTrack — Suivez votre progression de lecture",
  description:
    "Votre bibliothèque personnelle intelligente. Suivez, importez et gérez vos lectures avec style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={cn("h-full antialiased", "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
