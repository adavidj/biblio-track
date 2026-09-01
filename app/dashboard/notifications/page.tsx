"use client";

import { Bell, BellOff, BookOpen, CheckCircle2, Info, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { useNotificationStore } from "@/lib/notification-store";

const icons: Record<string, typeof Bell> = { BOOK_ADDED: BookOpen, BOOK_IMPORTED: BookOpen, WELCOME: CheckCircle2, default: Info };

export default function NotificationsPage() {
  const notifications = useNotificationStore((state) => state.notifications);
  const markAllAsRead = useNotificationStore((state) => state.markAllAsRead);
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const removeNotification = useNotificationStore((state) => state.removeNotification);
  const unread = notifications.filter((notification) => !notification.isRead).length;
  return <div className="mx-auto max-w-5xl space-y-7"><PageHeader actions={unread ? <button className="inline-flex items-center gap-2 rounded-xl border border-[#ccd7c7] bg-[#fffef9] px-4 py-2.5 text-sm font-semibold text-[#3f513f] transition hover:bg-[#f0f4ed]" onClick={markAllAsRead} type="button"><CheckCircle2 className="size-4" /> Tout marquer comme lu</button> : undefined} description={unread ? `${unread} nouvelle${unread > 1 ? "s" : ""} notification${unread > 1 ? "s" : ""} à consulter.` : "Tout est à jour."} eyebrow="Votre activité" title="Notifications" />
    {notifications.length ? <section className="overflow-hidden rounded-[1.75rem] border border-[#dce4d8] bg-[#fffef9] shadow-[0_12px_35px_rgba(49,76,53,0.05)]">{notifications.map((notification) => { const Icon = icons[notification.type] ?? icons.default; return <article className={`group flex gap-4 border-b border-[#e8ede5] p-5 last:border-b-0 ${notification.isRead ? "" : "bg-[#f7fbf5]"}`} key={notification.id}><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e4efe0] text-[#4e754b]"><Icon className="size-5" /></span><div className="min-w-0 flex-1"><div className="flex flex-col justify-between gap-1 sm:flex-row"><h2 className="text-sm font-semibold text-[#354534]">{notification.title}</h2><time className="text-xs text-[#7b8779]">{new Date(notification.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</time></div><p className="mt-1 text-sm leading-6 text-[#71806e]">{notification.message}</p></div><div className="flex shrink-0 items-start gap-1">{!notification.isRead && <button aria-label="Marquer comme lue" className="grid size-8 place-items-center rounded-lg text-[#4d744b] transition hover:bg-[#e4efe0]" onClick={() => markAsRead(notification.id)} type="button"><CheckCircle2 className="size-4" /></button>}<button aria-label="Supprimer la notification" className="grid size-8 place-items-center rounded-lg text-[#a75b52] opacity-100 transition hover:bg-[#fff0ed] sm:opacity-0 sm:group-hover:opacity-100" onClick={() => removeNotification(notification.id)} type="button"><Trash2 className="size-4" /></button></div></article>; })}</section> : <section className="rounded-[1.75rem] border border-dashed border-[#cedbc9] bg-[#f7faf5] p-14 text-center"><BellOff className="mx-auto size-9 text-[#849c80]" /><p className="mt-4 font-serif text-2xl text-[#405040]">Vous êtes à jour.</p><p className="mt-2 text-sm text-[#728070]">Vos nouvelles activités apparaîtront ici.</p></section>}
  </div>;
}
