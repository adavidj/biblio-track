import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  detail: string;
}

export function StatCard({ label, value, icon: Icon, detail }: StatCardProps) {
  return (
    <article className="rounded-2xl border border-[#e0e4db] bg-[#fffef9] p-5 shadow-[0_8px_24px_rgba(42,57,40,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div><p className="text-sm font-medium text-[#657061]">{label}</p><p className="mt-3 font-serif text-4xl tracking-[-0.04em] text-[#293529]">{value}</p></div>
        <span className="grid size-10 place-items-center rounded-xl bg-[#edf2e9] text-[#527049]"><Icon className="size-5" aria-hidden="true" /></span>
      </div>
      <p className="mt-4 text-xs text-[#859084]">{detail}</p>
    </article>
  );
}
