"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookCheck,
  BookOpen,
  Clock3,
  Library,
  Plus,
  TrendingUp,
} from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { fakeStatsOverview, fakeUser } from "@/lib/fake-data";
import { useBookStore } from "@/lib/book-store";

export default function DashboardPage() {
  const { books } = useBookStore();
  const inProgress = books.filter((book) => book.status === "IN_PROGRESS");
  const currentBook = inProgress[0];

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Bonjour, "
        title={`${fakeUser.firstName}.`}
        description="Voici l'essentiel pour reprendre votre lecture aujourd'hui."
        actions={
          <>
            <Link
              href="/dashboard/books"
              className="inline-flex items-center gap-2 rounded-xl border border-[#ccd7c7] bg-[#fffef9] px-4 py-2.5 text-sm font-semibold text-[#3f513f] transition hover:bg-[#f0f4ed]"
            >
              <Library className="size-4" />
              Ma bibliothèque
            </Link>
            <Link
              href="/dashboard/search"
              className="inline-flex items-center gap-2 rounded-xl bg-[#314c35] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#263e2b]"
            >
              <Plus className="size-4" />
              Ajouter un livre
            </Link>
          </>
        }
      />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Dans la bibliothèque"
          value={fakeStatsOverview.totalBooks}
          icon={BookOpen}
          detail="Livres suivis au total"
        />
        <StatCard
          label="En cours"
          value={fakeStatsOverview.booksInProgress}
          icon={Clock3}
          detail="Lectures actuellement ouvertes"
        />
        <StatCard
          label="Terminés"
          value={fakeStatsOverview.booksFinished}
          icon={BookCheck}
          detail="Histoires déjà parcourues"
        />
        <StatCard
          label="Pages lues"
          value={fakeStatsOverview.totalPagesRead.toLocaleString()}
          icon={TrendingUp}
          detail="Toutes vos sessions confondues"
        />
      </section>
      {currentBook ? (
        <section className="overflow-hidden rounded-3xl bg-[#314c35] text-[#fbf9ef]">
          <div className="grid gap-0 md:grid-cols-[0.72fr_1.28fr]">
            <div className="relative min-h-64 bg-[radial-gradient(circle_at_44%_34%,rgba(222,235,210,0.32),transparent_46%)] p-7">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#c8dbc0]">
                À reprendre
              </p>
              <div className="mt-8 flex items-end gap-5">
                <div className="relative h-44 w-28 overflow-hidden rounded-md bg-[#526e50] shadow-2xl">
                  {currentBook.coverUrl ? (
                    <Image
                      src={currentBook.coverUrl}
                      alt={currentBook.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <BookOpen className="absolute inset-0 m-auto size-9 text-[#d4e3ce]" />
                  )}
                </div>
                <p className="max-w-40 font-serif text-3xl leading-none">
                  {currentBook.title}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center p-7 md:p-10">
              <p className="text-sm text-[#cfddc9]">{currentBook.author}</p>
              <h2 className="mt-2 max-w-lg font-serif text-4xl leading-none tracking-[-0.04em]">
                Reprenez là où votre lecture s&apos;est arrêtée.
              </h2>
              <div className="mt-8 max-w-lg">
                <div className="flex justify-between text-sm text-[#d9e6d4]">
                  <span>
                    Page {currentBook.lastReadPage} sur {currentBook.totalPages}
                  </span>
                  <span>
                    {Math.round(
                      (currentBook.lastReadPage / currentBook.totalPages) * 100,
                    )}{" "}
                    %
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-[#e5b16a]"
                    style={{
                      width: `${Math.round((currentBook.lastReadPage / currentBook.totalPages) * 100)}%`,
                    }}
                  />
                </div>
              </div>
              <Link
                href={`/dashboard/books/${currentBook.id}`}
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-[#f5eddc] px-4 py-2.5 text-sm font-bold text-[#304b35] transition hover:bg-white"
              >
                Voir le livre <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <EmptyState
          icon={BookOpen}
          title="Votre prochaine lecture vous attend"
          description="Ajoutez un livre à votre bibliothèque pour commencer à suivre votre parcours."
          action={
            <Link
              href="/dashboard/search"
              className="inline-flex items-center gap-2 rounded-xl bg-[#314c35] px-4 py-2.5 text-sm font-semibold text-white"
            >
              <Plus className="size-4" />
              Ajouter un livre
            </Link>
          }
        />
      )}
      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6b8164]">
              À garder en vue
            </p>
            <h2 className="mt-2 font-serif text-3xl tracking-[-0.04em] text-[#273327]">
              Vos lectures en cours
            </h2>
          </div>
          <Link
            href="/dashboard/books"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#466346] hover:text-[#2c482e]"
          >
            Voir la bibliothèque <ArrowRight className="size-4" />
          </Link>
        </div>
        {inProgress.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {inProgress.slice(0, 4).map((book) => {
              const progress = book.totalPages
                ? Math.round((book.lastReadPage / book.totalPages) * 100)
                : 0;
              return (
                <Link
                  key={book.id}
                  href={`/dashboard/books/${book.id}`}
                  className="group rounded-2xl border border-[#e0e4db] bg-[#fffef9] p-4 transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(42,57,40,0.08)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#edf2e9]">
                    {book.coverUrl ? (
                      <Image
                        src={book.coverUrl}
                        alt={book.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <BookOpen className="absolute inset-0 m-auto size-8 text-[#789071]" />
                    )}
                  </div>
                  <p className="mt-4 truncate font-serif text-xl text-[#2a3529]">
                    {book.title}
                  </p>
                  <p className="mt-1 truncate text-sm text-[#70806e]">
                    {book.author}
                  </p>
                  <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#e8eee3]">
                    <div
                      className="h-full rounded-full bg-[#5d8157]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-[#7b8879]">
                    <span>p. {book.lastReadPage}</span>
                    <span>{progress} %</span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : null}
      </section>
    </div>
  );
}
