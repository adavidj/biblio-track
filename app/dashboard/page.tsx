"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  ChevronRight,
  CircleCheck,
  Library,
  Plus,
  Sparkles,
  Target,
  Timer,
} from "lucide-react";
import {
  fakeStatsOverview,
  fakeStatsProgress,
  fakeUser,
} from "@/lib/fake-data";
import { useBookStore } from "@/lib/book-store";

function ReadingProgress({ value }: { value: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-[#c7d9c1]">
      <div
        className="h-full rounded-full bg-[#d5ed8b]"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export default function DashboardPage() {
  const { books, readingGoal } = useBookStore();
  const readingBooks = books.filter((book) => book.status === "IN_PROGRESS");
  const currentBook = readingBooks[0];
  const shelfBooks = readingBooks.slice(1, 4);
  const goalBook = readingGoal
    ? books.find((book) => book.id === readingGoal.bookId)
    : undefined;
  const goalTargetPage = readingGoal?.targetPage ?? 0;
  const goalCurrentPage = goalBook?.lastReadPage ?? 0;
  const goalProgress = goalTargetPage
    ? Math.min(100, Math.round((goalCurrentPage / goalTargetPage) * 100))
    : 0;
  const currentProgress = currentBook?.totalPages
    ? Math.round((currentBook.lastReadPage / currentBook.totalPages) * 100)
    : 0;

  return (
    <div className="space-y-8 pb-5">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#71856a]">
            <Sparkles className="size-3.5" /> Espace lecture
          </p>
          <h1 className="font-serif text-4xl tracking-[-0.045em] text-[#263326] sm:text-5xl">
            Bonjour, {fakeUser.firstName}.
          </h1>
          <p className="mt-2 text-sm text-[#697567] sm:text-base">
            Votre bibliothèque avance, une page après l&apos;autre.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/dashboard/books"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#d7dfd2] bg-[#fffef9] px-4 text-sm font-semibold text-[#40523f] transition hover:border-[#afc4a7] hover:bg-white"
          >
            <Library className="size-4" />
            Bibliothèque
          </Link>
          <Link
            href="/dashboard/search"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#314c35] px-4 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(49,76,53,0.18)] transition hover:bg-[#263e2a]"
          >
            <Plus className="size-4" />
            Ajouter un livre
          </Link>
        </div>
      </header>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(19rem,0.75fr)]">
        {currentBook ? (
          <article className="relative min-h-92 overflow-hidden rounded-[1.75rem] border border-[#cfdfc8] bg-[#e7efe1] p-6 text-[#29402c] shadow-[0_20px_45px_rgba(38,61,42,0.10)] sm:p-8">
            <div className="absolute -right-24 -top-32 size-80 rounded-full bg-white/45 blur-3xl" />
            <div className="absolute -bottom-36 left-1/3 size-80 rounded-full bg-[#c8dfbd]/35 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between gap-7 sm:flex-row sm:items-end">
              <div className="max-w-lg">
                <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-xs font-semibold text-[#496a48]">
                  <BookOpen className="size-3.5" />
                  Lecture en cours
                </p>
                <p className="max-w-md font-serif text-3xl leading-tight tracking-[-0.035em] sm:text-4xl">
                  {currentBook.title}
                </p>
                <p className="mt-2 text-sm text-[#657762]">
                  {currentBook.author}
                </p>
                <div className="mt-8 max-w-md">
                  <div className="mb-2 flex items-center justify-between text-xs text-[#5d735a]">
                    <span>
                      Page {currentBook.lastReadPage} sur{" "}
                      {currentBook.totalPages}
                    </span>
                    <span className="font-bold text-[#426b42]">
                      {currentProgress}%
                    </span>
                  </div>
                  <ReadingProgress value={currentProgress} />
                </div>
                <Link
                  href={`/dashboard/books/${currentBook.id}/read`}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#314c35] px-4 py-3 text-sm font-bold text-white shadow-[0_10px_20px_rgba(49,76,53,0.16)] transition hover:bg-[#263e2a]"
                >
                  Reprendre la lecture
                  <ArrowRight className="size-4" />
                </Link>
              </div>
              <Link
                href={`/dashboard/books/${currentBook.id}`}
                className="group relative block w-28 shrink-0 overflow-hidden rounded-xl bg-[#d4e2cd] shadow-xl ring-1 ring-white/60 sm:w-36"
              >
                <div className="relative aspect-2/3">
                  {currentBook.coverUrl ? (
                    <Image
                      src={currentBook.coverUrl}
                      alt={`Couverture de ${currentBook.title}`}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="144px"
                    />
                  ) : (
                    <span className="grid h-full place-items-center">
                      <BookOpen className="size-8 text-white/40" />
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </article>
        ) : (
          <article className="rounded-[1.75rem] border border-[#cfdfc8] bg-[#e7efe1] p-8 text-[#29402c]">
            <BookMarked className="size-9 text-[#426b42]" />
            <h2 className="mt-8 font-serif text-3xl">
              Votre prochaine lecture vous attend.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#657762]">
              Ajoutez un livre, puis reprenez ici dès que vous êtes prêt à
              commencer.
            </p>
            <Link
              href="/dashboard/search"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#d5ed8b] px-4 py-3 text-sm font-bold text-[#29402c]"
            >
              Trouver un livre
              <ArrowRight className="size-4" />
            </Link>
          </article>
        )}
        <aside className="rounded-[1.75rem] border border-[#dce4d7] bg-[#fffef9] p-6 shadow-[0_12px_32px_rgba(42,57,40,0.05)]">
          <div className="flex items-center justify-between">
            <span className="grid size-10 place-items-center rounded-xl bg-[#edf4e8] text-[#4f7049]">
              <Target className="size-5" />
            </span>
            <span className="rounded-full bg-[#f2f5ed] px-3 py-1 text-xs font-bold text-[#62755e]">
              Objectif de lecture
            </span>
          </div>
          {goalBook ? (
            <>
              <p className="mt-7 truncate font-serif text-3xl tracking-tighter text-[#2c392b]">
                {goalBook.title}
              </p>
              <p className="mt-2 text-sm text-[#6c786a]">
                Atteindre la page {goalTargetPage}
              </p>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#e7ede3]">
                <div
                  className="h-full rounded-full bg-[#6f9862]"
                  style={{ width: `${goalProgress}%` }}
                />
              </div>
              <div className="mt-5 rounded-2xl bg-[#f3f6ef] p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-[#3c533b]">
                  <Timer className="size-4 text-[#6f9862]" /> Page{" "}
                  {goalCurrentPage} sur {goalTargetPage}
                </p>
                <p className="mt-1 text-xs leading-5 text-[#71806e]">
                  {goalProgress}% de votre objectif atteint.
                </p>
              </div>
            </>
          ) : (
            <div className="mt-7 rounded-2xl bg-[#f3f6ef] p-5">
              <p className="font-serif text-2xl text-[#334833]">
                Choisissez un objectif
              </p>
              <p className="mt-2 text-sm leading-6 text-[#71806e]">
                Ouvrez la fiche d’un livre pour définir la page que vous
                souhaitez atteindre.
              </p>
              <Link
                href="/dashboard/books"
                className="mt-4 inline-flex text-sm font-semibold text-[#426742] hover:underline"
              >
                Choisir un livre
              </Link>
            </div>
          )}
        </aside>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Dans la bibliothèque",
            value: fakeStatsOverview.totalBooks,
            icon: Library,
            tone: "bg-[#edf4e8] text-[#54784c]",
          },
          {
            label: "Lectures en cours",
            value: fakeStatsOverview.booksInProgress,
            icon: BookOpen,
            tone: "bg-[#eef0e6] text-[#70804d]",
          },
          {
            label: "Livres terminés",
            value: fakeStatsOverview.booksFinished,
            icon: CircleCheck,
            tone: "bg-[#f3ece3] text-[#9a7044]",
          },
          {
            label: "Pages lues",
            value: fakeStatsOverview.totalPagesRead.toLocaleString(),
            icon: BookMarked,
            tone: "bg-[#e8f0ed] text-[#4c7868]",
          },
        ].map(({ label, value, icon: Icon, tone }) => (
          <article
            key={label}
            className="flex items-center gap-4 rounded-2xl border border-[#dfe5da] bg-[#fffef9] px-4 py-4 transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(42,57,40,0.06)]"
          >
            <span
              className={`grid size-10 place-items-center rounded-xl ${tone}`}
            >
              <Icon className="size-4.5" />
            </span>
            <div>
              <p className="font-serif text-2xl tracking-[-0.04em] text-[#2d392c]">
                {value}
              </p>
              <p className="text-xs text-[#788476]">{label}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.85fr)]">
        <div className="rounded-[1.75rem] border border-[#dce4d7] bg-[#fffef9] p-5 shadow-[0_12px_32px_rgba(42,57,40,0.04)] sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7d9277]">
                Sur votre étagère
              </p>
              <h2 className="mt-1 font-serif text-2xl tracking-[-0.035em] text-[#293629]">
                À continuer
              </h2>
            </div>
            <Link
              href="/dashboard/books"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#476246] hover:text-[#2d4a32]"
            >
              Tout voir <ChevronRight className="size-4" />
            </Link>
          </div>
          {shelfBooks.length > 0 ? (
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {shelfBooks.map((book) => {
                const progress = book.totalPages
                  ? Math.round((book.lastReadPage / book.totalPages) * 100)
                  : 0;
                return (
                  <Link
                    key={book.id}
                    href={`/dashboard/books/${book.id}`}
                    className="group flex min-w-0 gap-3 rounded-2xl p-2 transition hover:bg-[#f4f7f1]"
                  >
                    <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-lg bg-[#edf2ea] shadow-sm">
                      {book.coverUrl ? (
                        <Image
                          src={book.coverUrl}
                          alt={`Couverture de ${book.title}`}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="80px"
                        />
                      ) : (
                        <BookOpen className="m-auto mt-10 size-5 text-[#8b9c86]" />
                      )}
                    </div>
                    <div className="min-w-0 py-1">
                      <p className="truncate text-sm font-bold text-[#314030]">
                        {book.title}
                      </p>
                      <p className="mt-1 truncate text-xs text-[#7a8578]">
                        {book.author}
                      </p>
                      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#e5ebe1]">
                        <div
                          className="h-full rounded-full bg-[#73976a]"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="mt-1.5 text-xs font-semibold text-[#5e7c58]">
                        {progress}% terminé
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl bg-[#f4f7f1] p-7 text-center">
              <BookOpen className="mx-auto size-7 text-[#8aa184]" />
              <p className="mt-3 text-sm font-semibold text-[#40513e]">
                Une seule lecture en cours
              </p>
              <p className="mt-1 text-xs text-[#788576]">
                Quand vous commencerez un autre livre, il apparaîtra ici.
              </p>
            </div>
          )}
        </div>
        <aside className="rounded-[1.75rem] border border-[#dce4d7] bg-[#fffef9] p-6 shadow-[0_12px_32px_rgba(42,57,40,0.04)]">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7d9277]">
            Votre rythme
          </p>
          <h2 className="mt-1 font-serif text-2xl tracking-[-0.035em] text-[#293629]">
            Activité récente
          </h2>
          <div className="mt-7 flex h-24 items-end gap-2">
            {fakeStatsProgress.slice(-7).map((day, index) => {
              const height = Math.max(
                12,
                Math.round((day.pagesRead / 70) * 100),
              );
              return (
                <div
                  key={day.date}
                  className="flex h-full flex-1 flex-col justify-end gap-2"
                >
                  <div
                    className={`rounded-t-md ${index === 6 ? "bg-[#3e6440]" : "bg-[#c8dbbd]"}`}
                    style={{ height: `${height}%` }}
                    title={`${day.pagesRead} pages`}
                  />
                  <span className="text-center text-[10px] font-semibold text-[#899487]">
                    {["L", "M", "M", "J", "V", "S", "D"][index]}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-7 flex items-center justify-between border-t border-[#e4e9df] pt-5">
            <div>
              <p className="text-sm font-semibold text-[#3d513b]">
                {fakeStatsOverview.totalSessions} sessions
              </p>
              <p className="text-xs text-[#7d897a]">depuis le début</p>
            </div>
            <Link
              href="/dashboard/stats"
              className="rounded-xl bg-[#f0f5ec] px-3 py-2 text-xs font-bold text-[#496649] transition hover:bg-[#e2ebdc]"
            >
              Voir les statistiques
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
