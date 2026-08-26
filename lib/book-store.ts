"use client";

import { create } from "zustand";
import { fakeBooks } from "./fake-data";

export interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  coverUrl?: string | null;
  fileUrl?: string | null;
  readOnlineUrl?: string | null;
  totalPages: number;
  isbn?: string;
  publisher?: string;
  publishedYear?: number;
  language?: string;
  externalSourceId?: string;
  externalSource?: string;
  status: string;
  lastReadPage: number;
  genre?: { id: string; name: string };
  sessions: Array<{
    id: string;
    pagesRead: number;
    startPage: number;
    endPage: number;
    readAt: string;
  }>;
  hasReadableContent?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BookStore {
  books: Book[];
  addBook: (book: Book) => void;
  removeBook: (id: string) => void;
  updateBook: (id: string, updates: Partial<Book>) => void;
}

export const useBookStore = create<BookStore>((set) => ({
  books: [...fakeBooks],

  addBook: (book) =>
    set((state) => ({
      books: [book, ...state.books],
    })),

  removeBook: (id) =>
    set((state) => ({
      books: state.books.filter((b) => b.id !== id),
    })),

  updateBook: (id, updates) =>
    set((state) => ({
      books: state.books.map((b) => (b.id === id ? { ...b, ...updates } : b)),
    })),
}));
