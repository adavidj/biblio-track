"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  BarChart3,
  Search,
  Bell,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Download,
  FileText,
  Globe,
  Star,
  TrendingUp,
  BookMarked,
  Upload,
  Zap,
  Shield,
  Smartphone,
} from "lucide-react";
import { fakeBooks, fakeStatsOverview } from "@/lib/fake-data";

const STATUS_STYLES: Record<string, string> = {
  TO_READ: "badge-to-read",
  IN_PROGRESS: "badge-in-progress",
  FINISHED: "badge-finished",
};

const STATUS_LABELS: Record<string, string> = {
  TO_READ: "À lire",
  IN_PROGRESS: "En cours",
  FINISHED: "Terminé",
};

export default function Home() {
  const featuredBooks = fakeBooks.slice(0, 6);
  const finishedCount = fakeStatsOverview.booksFinished;
  const totalPagesRead = fakeStatsOverview.totalPagesRead;

  return (
    <div className="min-h-screen bg-animated">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-[#4A6FA5]/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4A6FA5] to-[#7FB5D5] flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-text-primary">
              Biblio<span className="gradient-text">Track</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-text-secondary hover:text-[#4A6FA5] transition-colors">Fonctionnalités</a>
            <a href="#library" className="text-sm font-medium text-text-secondary hover:text-[#4A6FA5] transition-colors">Bibliothèque</a>
            <a href="#how" className="text-sm font-medium text-text-secondary hover:text-[#4A6FA5] transition-colors">Comment ça marche</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="btn-primary text-sm px-5 py-2.5 rounded-xl">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-[#7FB5D5]/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#4A6FA5]/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B8D8E8]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 border border-[#4A6FA5]/10">
                <Sparkles className="w-4 h-4 text-[#4A6FA5]" />
                <span className="text-xs font-semibold text-[#4A6FA5] tracking-wide uppercase">
                  Bibliothèque intelligente
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-text-primary mb-6">
                Suivez chaque
                <br />
                <span className="gradient-text">page lue</span>
              </h1>

              <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-lg mb-10">
                Organisez, suivez et célébrer votre progression de lecture.
                Importez depuis Open Library, Google Books, et plus encore.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard" className="btn-primary text-base px-8 py-4 flex items-center justify-center gap-2.5 group rounded-xl">
                  Commencer à lire
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="#library" className="btn-secondary text-base px-8 py-4 flex items-center justify-center gap-2.5 rounded-xl">
                  Voir les livres
                </a>
              </div>

              {/* Quick stats */}
              <div className="flex gap-10 mt-12">
                {[
                  { value: fakeBooks.length, label: "Livres" },
                  { value: totalPagesRead.toLocaleString(), label: "Pages lues" },
                  { value: finishedCount, label: "Terminés" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-black gradient-text">{stat.value}</p>
                    <p className="text-xs text-text-muted mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Featured book cards */}
            <div className="relative hidden lg:block">
              <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                {/* Main book card */}
                <div className="glass-strong rounded-3xl p-6 shadow-xl max-w-md ml-auto border border-[#4A6FA5]/10">
                  <div className="flex gap-4">
                    <div className="w-24 h-32 rounded-2xl bg-gradient-to-br from-[#4A6FA5]/10 to-[#7FB5D5]/10 overflow-hidden relative flex-shrink-0 shadow-md">
                      {featuredBooks[0].coverUrl ? (
                        <Image src={featuredBooks[0].coverUrl} alt={featuredBooks[0].title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-[#4A6FA5]/30" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className={`inline-block text-[10px] font-semibold px-2.5 py-1 rounded-lg mb-2 ${STATUS_STYLES[featuredBooks[0].status]}`}>
                        {STATUS_LABELS[featuredBooks[0].status]}
                      </span>
                      <h3 className="font-bold text-text-primary text-sm leading-tight">{featuredBooks[0].title}</h3>
                      <p className="text-xs text-text-muted mt-0.5">{featuredBooks[0].author}</p>
                      <div className="w-full bg-[#B8D8E8]/30 rounded-full h-2 mt-3 mb-1.5">
                        <div className="bg-gradient-to-r from-[#4A6FA5] to-[#7FB5D5] h-2 rounded-full" style={{ width: `${Math.round((featuredBooks[0].lastReadPage / featuredBooks[0].totalPages) * 100)}%` }} />
                      </div>
                      <div className="flex justify-between text-[10px] text-text-muted">
                        <span>p. {featuredBooks[0].lastReadPage} / {featuredBooks[0].totalPages}</span>
                        <span className="font-bold text-[#4A6FA5]">{Math.round((featuredBooks[0].lastReadPage / featuredBooks[0].totalPages) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating stat card */}
                <div className="absolute -left-8 top-16 glass-strong rounded-2xl p-4 shadow-lg animate-float border border-[#4A6FA5]/10" style={{ animationDelay: "1s" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#4CAF7D]/10 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-[#4CAF7D]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-text-muted">Pages cette semaine</p>
                      <p className="text-sm font-bold text-text-primary">247</p>
                    </div>
                  </div>
                </div>

                {/* Floating notification */}
                <div className="absolute -right-6 bottom-12 glass-strong rounded-2xl p-4 shadow-lg animate-float border border-[#4A6FA5]/10" style={{ animationDelay: "2s" }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#4CAF7D]/10 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-[#4CAF7D]" />
                    </div>
                    <p className="text-xs font-semibold text-text-primary">+1 livre terminé ! 🎉</p>
                  </div>
                </div>

                {/* Floating genre badge */}
                <div className="absolute -left-4 bottom-28 glass-strong rounded-xl px-4 py-2.5 shadow-lg animate-float border border-[#4A6FA5]/10" style={{ animationDelay: "2.5s" }}>
                  <div className="flex items-center gap-2">
                    <BookMarked className="w-4 h-4 text-[#4A6FA5]" />
                    <span className="text-xs font-bold text-[#4A6FA5]">8 genres</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 border border-[#4A6FA5]/10">
              <Zap className="w-4 h-4 text-[#4A6FA5]" />
              <span className="text-xs font-semibold text-[#4A6FA5] tracking-wide uppercase">Fonctionnalités</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Des outils puissants pour transformer votre expérience de lecture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Search, title: "Recherche externe", desc: "Trouvez des livres via Open Library ou Google Books avec ISBN, couverture et métadonnées.", color: "from-[#5BA3D9]/15 to-[#5BA3D9]/5", iconColor: "text-[#5BA3D9]" },
              { icon: Download, title: "Import automatique", desc: "Importez en un clic. Le backend récupère toutes les métadonnées automatiquement.", color: "from-[#4CAF7D]/15 to-[#4CAF7D]/5", iconColor: "text-[#4CAF7D]" },
              { icon: Upload, title: "Upload fichiers", desc: "Ajoutez des couvertures (10MB) et des PDF/EPUB (50MB) en drag-and-drop.", color: "from-[#E8A838]/15 to-[#E8A838]/5", iconColor: "text-[#E8A838]" },
              { icon: FileText, title: "Lecteur intégré", desc: "Lisez vos livres en ligne via PDF viewer ou Internet Archive.", color: "from-[#4A6FA5]/15 to-[#4A6FA5]/5", iconColor: "text-[#4A6FA5]" },
              { icon: BarChart3, title: "Statistiques", desc: "Pages lues par jour, répartition des genres, progression dans le temps.", color: "from-[#7FB5D5]/15 to-[#7FB5D5]/5", iconColor: "text-[#7FB5D5]" },
              { icon: Bell, title: "Notifications live", desc: "Alertes en temps réel via WebSocket : livres ajoutés, lectures terminées.", color: "from-[#D65F5F]/15 to-[#D65F5F]/5", iconColor: "text-[#D65F5F]" },
              { icon: Globe, title: "Sources multiples", desc: "Open Library pour les classiques, Google Books pour les nouveautés.", color: "from-[#5BA3D9]/15 to-[#5BA3D9]/5", iconColor: "text-[#5BA3D9]" },
              { icon: Star, title: "Sessions de lecture", desc: "Enregistrez chaque session avec pages lues, plage de pages et date.", color: "from-[#E8A838]/15 to-[#E8A838]/5", iconColor: "text-[#E8A838]" },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className="glass-strong rounded-2xl p-6 card-hover group border border-[#4A6FA5]/5 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-base font-bold text-text-primary mb-1.5">{feature.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section id="library" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 border border-[#4A6FA5]/10">
              <BookOpen className="w-4 h-4 text-[#4A6FA5]" />
              <span className="text-xs font-semibold text-[#4A6FA5] tracking-wide uppercase">Bibliothèque</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Bibliothèque en vedette
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Découvrez notre sélection de livres disponibles sur BiblioTrack
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredBooks.map((book, i) => {
              const progress = book.totalPages ? Math.round((book.lastReadPage / book.totalPages) * 100) : 0;
              return (
                <Link
                  key={book.id}
                  href="/dashboard"
                  className="glass-strong rounded-2xl p-5 card-hover group animate-fade-in-up border border-[#4A6FA5]/5"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-32 rounded-xl bg-gradient-to-br from-[#4A6FA5]/10 to-[#7FB5D5]/10 overflow-hidden relative flex-shrink-0 shadow-sm">
                      {book.coverUrl ? (
                        <Image src={book.coverUrl} alt={book.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-[#4A6FA5]/30" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md ${STATUS_STYLES[book.status]}`}>
                          {STATUS_LABELS[book.status]}
                        </span>
                        {book.genre && <span className="text-[10px] text-text-muted">{book.genre.name}</span>}
                      </div>
                      <h3 className="font-bold text-text-primary text-sm truncate mb-0.5">{book.title}</h3>
                      <p className="text-xs text-text-muted truncate mb-2">{book.author}</p>
                      <p className="text-xs text-text-secondary line-clamp-2 mb-3">{book.description}</p>
                      {book.totalPages > 0 && (
                        <>
                          <div className="w-full bg-[#B8D8E8]/30 rounded-full h-1.5 mb-1">
                            <div className="bg-gradient-to-r from-[#4A6FA5] to-[#7FB5D5] h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                          </div>
                          <div className="flex justify-between text-[10px] text-text-muted">
                            <span>p. {book.lastReadPage} / {book.totalPages}</span>
                            <span className="font-bold text-[#4A6FA5]">{progress}%</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/dashboard/books" className="btn-secondary text-sm px-8 py-3.5 inline-flex items-center gap-2 group rounded-xl">
              Voir toute la bibliothèque
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 border border-[#4A6FA5]/10">
              <Sparkles className="w-4 h-4 text-[#4A6FA5]" />
              <span className="text-xs font-semibold text-[#4A6FA5] tracking-wide uppercase">Comment ça marche</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">En 5 étapes simples</h2>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: "01", title: "Créez votre compte", desc: "Inscrivez-vous et vérifiez votre email.", icon: Shield },
              { step: "02", title: "Créez vos genres", desc: "Organisez votre bibliothèque.", icon: BookMarked },
              { step: "03", title: "Importez vos livres", desc: "Recherchez et importez en un clic.", icon: Download },
              { step: "04", title: "Ajoutez les fichiers", desc: "Upload PDF/EPUB ou liens auto.", icon: Upload },
              { step: "05", title: "Suivez votre progression", desc: "Sessions et statistiques.", icon: BarChart3 },
            ].map((item, i) => (
              <div key={item.step} className="text-center group">
                <div className="relative inline-block mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4A6FA5] to-[#7FB5D5] flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-lg bg-white shadow-md flex items-center justify-center text-xs font-black text-[#4A6FA5]">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-text-primary mb-1">{item.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Preview */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-strong rounded-3xl p-12 text-center relative overflow-hidden border border-[#4A6FA5]/10 shadow-xl">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#4A6FA5]/5 to-[#7FB5D5]/5" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#4A6FA5]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#7FB5D5]/5 rounded-full translate-y-1/2 -translate-x-1/4" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 border border-[#4A6FA5]/10">
                <Globe className="w-4 h-4 text-[#4A6FA5]" />
                <span className="text-xs font-semibold text-[#4A6FA5] tracking-wide uppercase">API RESTful</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Backend NestJS + PostgreSQL
              </h2>
              <p className="text-lg text-text-secondary mb-8 max-w-lg mx-auto">
                API complète avec Swagger, WebSocket, SMTP et Cloudinary. Toutes les routes documentées.
              </p>
              <div className="flex flex-wrap justify-center gap-2.5 mb-8">
                {["Auth (JWT)", "CRUD Livres", "Upload Cloudinary", "WebSocket", "Stats", "Notifications"].map((tag) => (
                  <span key={tag} className="text-xs font-medium px-3.5 py-2 rounded-xl bg-white/60 border border-[#4A6FA5]/10 text-text-secondary">
                    {tag}
                  </span>
                ))}
              </div>
              <Link href="/dashboard" className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2.5 group rounded-xl">
                Explorer le Dashboard
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-[#4A6FA5]/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4A6FA5] to-[#7FB5D5] flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-text-primary">BiblioTrack</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-text-muted">
            <span>NestJS · PostgreSQL · TypeORM</span>
            <span>•</span>
            <span>© 2026 BiblioTrack</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
