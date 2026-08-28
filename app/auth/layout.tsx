"use client";

import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
children,
}: {
children: React.ReactNode;
}) {
return ( <div className="relative min-h-screen w-full overflow-hidden bg-[#fffdf8]">
{/* Decorative blobs */} <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent-light/10 blur-3xl" /> <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary-light/10 blur-3xl" />


  {/* Content */}
  <div className="relative min-h-screen w-full">
    {children}
  </div>
</div>


);
}
