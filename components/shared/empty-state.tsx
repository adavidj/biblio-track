import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return <div className="rounded-2xl border border-dashed border-[#ced7c9] bg-[#fbfcf8] px-6 py-14 text-center"><span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[#edf2e9] text-[#56734f]"><Icon className="size-6" aria-hidden="true" /></span><h2 className="mt-5 font-serif text-2xl text-[#2a3529]">{title}</h2><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#718070]">{description}</p>{action && <div className="mt-6 flex justify-center">{action}</div>}</div>;
}
