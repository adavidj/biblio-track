"use client";

import { useState } from "react";
import {
  Bell,
  BellOff,
  BookOpen,
  CheckCircle2,
  Info,
} from "lucide-react";
import { fakeNotifications } from "@/lib/fake-data";
import { ApiDocsCard } from "@/components/api-docs-card";
import { PageHeader } from "@/components/shared/page-header";

const TYPE_ICONS: Record<string, typeof Bell> = {
  BOOK_ADDED: BookOpen,
  BOOK_IMPORTED: BookOpen,
  WELCOME: CheckCircle2,
  default: Info,
};

const TYPE_COLORS: Record<string, string> = {
  BOOK_ADDED: "bg-info/10 text-info",
  BOOK_IMPORTED: "bg-success/10 text-success",
  WELCOME: "bg-success/10 text-success",
  default: "bg-primary/10 text-primary",
};

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(fakeNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Votre activité" title="Notifications" description={unreadCount > 0 ? `${unreadCount} non lue${unreadCount > 1 ? "s" : ""}` : "Tout est à jour"} actions={unreadCount > 0 ? <button onClick={handleMarkAllRead} className="inline-flex items-center gap-2 rounded-xl border border-[#ccd7c7] bg-[#fffef9] px-4 py-2.5 text-sm font-semibold text-[#3f513f] transition hover:bg-[#f0f4ed]"><CheckCircle2 className="size-4" />Tout marquer comme lu</button> : undefined} />

      {notifications.length === 0 ? (
        <div className="glass-strong rounded-2xl p-12 text-center">
          <BellOff className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary">Aucune notification</p>
          <p className="text-sm text-text-muted mt-1">
            Vous serez notifié des nouveaux livres et progrès
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => {
            const Icon = TYPE_ICONS[notif.type] || TYPE_ICONS.default;
            const colorClass =
              TYPE_COLORS[notif.type] || TYPE_COLORS.default;

            return (
              <div
                key={notif.id}
                className={`glass-strong rounded-2xl p-5 flex items-start gap-4 card-hover ${
                  !notif.isRead ? "border-l-4 border-l-primary" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-text-primary">
                        {notif.title}
                      </h3>
                      <p className="text-sm text-text-secondary mt-0.5">
                        {notif.message}
                      </p>
                    </div>
                    <p className="text-xs text-text-muted whitespace-nowrap flex-shrink-0">
                      {new Date(notif.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                {!notif.isRead && (
                  <button
                    onClick={() => handleMarkRead(notif.id)}
                    className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    title="Marquer comme lu"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* API Documentation */}
      <ApiDocsCard
        title="Endpoints API utilisés"
        subtitle="Requêtes effectuées depuis cette page"
        endpoints={[
          {
            method: "GET",
            path: "/notifications",
            description: "Liste des notifications",
            when: "Au chargement de la page pour afficher toutes les notifications",
            response: JSON.stringify({ success: true, message: "Request completed successfully", data: [{ id: "uuid", type: "BOOK_ADDED", title: "Book Added", message: 'Vous avez ajouté "Django" à votre bibliothèque.', isRead: false, createdAt: "2026-08-26T07:33:37.493Z" }, { id: "uuid", type: "WELCOME", title: "Welcome to BiblioTrack!", message: "Hi John, your account has been verified.", isRead: true, createdAt: "2026-08-26T07:30:00.000Z" }] }, null, 2),
          },
          {
            method: "PATCH",
            path: "/notifications/:id/read",
            description: "Marquer comme lue",
            when: "Quand l'utilisateur clique sur l'icone check a cote d'une notification non lue",
            response: JSON.stringify({ success: true, message: "Request completed successfully", data: { id: "uuid", type: "BOOK_ADDED", title: "Book Added", message: "...", isRead: true, createdAt: "..." } }, null, 2),
          },
          {
            method: "PATCH",
            path: "/notifications/read-all",
            description: "Tout marquer comme lu",
            when: "Quand l'utilisateur clique sur le bouton 'Tout marquer comme lu' dans le header",
            response: JSON.stringify({ success: true, message: "All notifications marked as read" }, null, 2),
          },
        ]}
      />
    </div>
  );
}
