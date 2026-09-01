import type { Metadata } from "next";
import "@fontsource-variable/geist";
import "@fontsource-variable/raleway";
import "./globals.css";

export const metadata: Metadata = {
  title: "BiblioTrack — Suivez votre progression de lecture",
  description:
    "Votre bibliothèque personnelle intelligente. Suivez, importez et gérez vos lectures avec style.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
