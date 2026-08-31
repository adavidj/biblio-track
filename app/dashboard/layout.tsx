"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Home,
  Library,
  LogOut,
  Menu,
  Search,
  Settings,
  Store,
  Tag,
  User,
  X,
} from "lucide-react";
import { fakeNotifications, fakeUser } from "@/lib/fake-data";

type NavigationItem = { href: string; label: string; icon: typeof Home };

const navigation: NavigationItem[] = [
  { href: "/dashboard", label: "Vue d'ensemble", icon: Home },
  { href: "/dashboard/books", label: "Ma bibliothèque", icon: Library },
  { href: "/dashboard/search", label: "Ajouter un livre", icon: Search },
  { href: "/dashboard/stats", label: "Statistiques", icon: BarChart3 },
];

const personalSpace: NavigationItem[] = [
  { href: "/dashboard/genres", label: "Genres", icon: Tag },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/profile", label: "Profil", icon: User },
];

const commerce: NavigationItem[] = [
  { href: "/dashboard/settings", label: "Paramètres", icon: Settings },
  { href: "/dashboard/storefront", label: "Boutique", icon: Store },
];

function NavigationGroup({
  items,
  pathname,
  onNavigate,
}: {
  items: NavigationItem[];
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div className="space-y-1">
      {items.map((item) => {
        const active =
          item.href === "/dashboard"
            ? pathname === item.href
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active ? "bg-[#e7efe1] font-semibold text-[#2d4a32]" : "text-[#697568] hover:bg-[#f0f4ed] hover:text-[#304232]"}`}
          >
            <item.icon
              className={`size-4.5 ${active ? "text-[#4d7149]" : "text-[#8c9788] group-hover:text-[#54704f]"}`}
              aria-hidden="true"
            />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activePopover, setActivePopover] = useState<
    "notifications" | "profile" | null
  >(null);
  const headerActionsRef = useRef<HTMLDivElement>(null);
  const unreadCount = fakeNotifications.filter(
    (notification) => !notification.isRead,
  ).length;
  const previewNotifications = fakeNotifications
    .filter((notification) => !notification.isRead)
    .slice(0, 3);

  useEffect(() => {
    function closePopover(event: MouseEvent) {
      if (!headerActionsRef.current?.contains(event.target as Node)) {
        setActivePopover(null);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActivePopover(null);
      }
    }

    document.addEventListener("mousedown", closePopover);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closePopover);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div className="dashboard-shell min-h-screen">
      <div
        className={`fixed inset-0 z-40 bg-[#203022]/25 backdrop-blur-sm transition lg:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setIsOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-70 flex-col border-r border-[#dce2d8] bg-[#fffef9] px-4 py-5 transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-2">
          <Link href="/dashboard" className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-2xl rounded-br-2xl bg-[#314c35] text-[#fcf8ee]">
              <BookOpen className="size-5" aria-hidden="true" />
            </span>
            <span className="font-serif text-xl font-semibold tracking-tight text-[#263226]">
              BiblioTrack
            </span>
          </Link>
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setIsOpen(false)}
            className="grid size-9 place-items-center rounded-lg text-[#6e796c] lg:hidden"
          >
            <X className="size-5" />
          </button>
        </div>
        <nav className="mt-10 flex-1">
          <p className="px-3 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#98a397]">
            Bibliothèque
          </p>
          <div className="mt-3">
            <NavigationGroup
              items={navigation}
              pathname={pathname}
              onNavigate={() => setIsOpen(false)}
            />
          </div>
          <p className="mt-8 px-3 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#98a397]">
            Espace personnel
          </p>
          <div className="mt-3">
            <NavigationGroup
              items={personalSpace}
              pathname={pathname}
              onNavigate={() => setIsOpen(false)}
            />
          </div>
          <div className="mt-8 border-t border-[#e0e6dc] pt-8">
            <p className="px-3 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#98a397]">
              Boutique &amp; paramètres
            </p>
            <div className="mt-3">
              <NavigationGroup
                items={commerce}
                pathname={pathname}
                onNavigate={() => setIsOpen(false)}
              />
            </div>
          </div>
        </nav>
        <div className="rounded-2xl bg-[#f0f4ed] p-3">
          <Link href="/dashboard/profile" className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-[#d3e2cc] text-xs font-bold text-[#35543a]">
              {fakeUser.firstName[0]}
              {fakeUser.lastName[0]}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-[#314232]">
                {fakeUser.firstName} {fakeUser.lastName}
              </span>
              <span className="block truncate text-xs text-[#778376]">
                Mon espace lecture
              </span>
            </span>
            <ChevronRight
              className="size-4 text-[#8b9689]"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/"
            className="mt-3 flex items-center gap-2 border-t border-[#d9e2d5] pt-3 text-xs font-medium text-[#778376] transition hover:text-[#b5524e]"
          >
            <LogOut className="size-3.5" aria-hidden="true" />
            Retour à l&apos;accueil
          </Link>
        </div>
      </aside>
      <div className="min-h-screen lg:pl-70">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#dce2d8] bg-[#f5f7f2]/90 px-5 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Ouvrir le menu"
              onClick={() => setIsOpen(true)}
              className="grid size-10 place-items-center rounded-xl border border-[#dce2d8] bg-[#fffef9] text-[#536451] lg:hidden"
            >
              <Menu className="size-5" />
            </button>
            <div className="hidden sm:block">
              <p className="text-xs font-medium text-[#889387]">
                Votre espace personnel
              </p>
              <p className="mt-0.5 font-serif text-lg text-[#2e3a2e]">
                Une lecture à la fois
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2" ref={headerActionsRef}>
            <div className="relative">
              <button
                aria-controls="notifications-popover"
                aria-expanded={activePopover === "notifications"}
                aria-label="Notifications"
                className="relative grid size-10 place-items-center rounded-xl border border-[#d9e1d4] bg-[#fffef9] text-[#5c6b59] transition hover:bg-[#eef3ea]"
                onClick={() =>
                  setActivePopover((current) =>
                    current === "notifications" ? null : "notifications",
                  )
                }
                type="button"
              >
                <Bell className="size-4.5" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-[#b85e55] text-[0.6rem] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>
              {activePopover === "notifications" && (
                <div
                  className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[min(22rem,calc(100vw-2.5rem))] rounded-2xl border border-[#dce4d7] bg-[#fffef9] p-4 shadow-[0_20px_50px_rgba(42,57,40,0.16)]"
                  id="notifications-popover"
                  role="dialog"
                  aria-label="Notifications"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-serif text-xl text-[#2b382b]">Notifications</p>
                      <p className="mt-1 text-xs text-[#71806e]">Les dernières nouvelles de votre bibliothèque.</p>
                    </div>
                    {unreadCount > 0 && (
                      <span className="rounded-full bg-[#e7efe1] px-2 py-1 text-xs font-semibold text-[#416440]">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 space-y-2">
                    {previewNotifications.length > 0 ? (
                      previewNotifications.map((notification) => (
                        <div className="flex gap-3 rounded-xl bg-[#f3f7f0] p-3" key={notification.id}>
                          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#dcebd4] text-[#477242]">
                            <Bell aria-hidden="true" className="size-4" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-[#354534]">{notification.title}</p>
                            <p className="mt-0.5 text-xs leading-5 text-[#71806e]">{notification.message}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="rounded-xl bg-[#f3f7f0] p-4 text-sm text-[#71806e]">Vous êtes à jour.</p>
                    )}
                  </div>
                  <Link
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#314c35] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#263e2a]"
                    href="/dashboard/notifications"
                    onClick={() => setActivePopover(null)}
                  >
                    Voir toutes les notifications
                    <ChevronRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                aria-controls="profile-popover"
                aria-expanded={activePopover === "profile"}
                aria-label="Ouvrir le résumé du profil"
                className="grid size-10 place-items-center rounded-full bg-[#d3e2cc] text-xs font-bold text-[#35543a]"
                onClick={() =>
                  setActivePopover((current) =>
                    current === "profile" ? null : "profile",
                  )
                }
                type="button"
              >
                {fakeUser.firstName[0]}
                {fakeUser.lastName[0]}
              </button>
              {activePopover === "profile" && (
                <div
                  className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[min(20rem,calc(100vw-2.5rem))] rounded-2xl border border-[#dce4d7] bg-[#fffef9] p-4 shadow-[0_20px_50px_rgba(42,57,40,0.16)]"
                  id="profile-popover"
                  role="dialog"
                  aria-label="Résumé du profil"
                >
                  <p className="font-serif text-xl text-[#2b382b]">Votre profil</p>
                  <p className="mt-1 text-xs text-[#71806e]">Accédez rapidement à vos informations personnelles.</p>
                  <div className="mt-4 rounded-2xl bg-[#314c35] p-4 text-white">
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 place-items-center rounded-xl bg-white/15 text-sm font-bold">
                        {fakeUser.firstName[0]}
                        {fakeUser.lastName[0]}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-serif text-lg">{fakeUser.firstName} {fakeUser.lastName}</p>
                        <p className="truncate text-xs text-white/70">{fakeUser.email}</p>
                      </div>
                    </div>
                    <p className="mt-4 flex items-center gap-2 text-xs text-[#dcebd4]">
                      <CheckCircle2 aria-hidden="true" className="size-4" />
                      Compte vérifié
                    </p>
                  </div>
                  <Link
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#314c35] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#263e2a]"
                    href="/dashboard/profile"
                    onClick={() => setActivePopover(null)}
                  >
                    Gérer mon profil
                    <ChevronRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-360 px-5 py-8 sm:px-8 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
