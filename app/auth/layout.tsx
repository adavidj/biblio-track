"use client";

import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-animated flex items-center justify-center p-6 relative">
      {/* Decorative blobs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-accent-light/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary-light/15 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative animate-fade-in-up">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-text-primary">
            Biblio<span className="gradient-text">Track</span>
          </span>
        </Link>

        {children}
      </div>
    </div>
  );
}
