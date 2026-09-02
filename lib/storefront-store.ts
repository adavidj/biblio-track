"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StorefrontState {
  description: string;
  isEnabled: boolean;
  name: string;
  showPrices: boolean;
  selectedBookIds: string[];
  productPrices: Record<string, string>;
  setDescription: (description: string) => void;
  setEnabled: (isEnabled: boolean) => void;
  setName: (name: string) => void;
  setShowPrices: (showPrices: boolean) => void;
  toggleBookSelection: (bookId: string) => void;
  setProductPrice: (bookId: string, price: string) => void;
}

export const useStorefrontStore = create<StorefrontState>()(persist((set) => ({
  description: "Une sélection de livres que j’ai envie de partager.",
  isEnabled: false,
  name: "Ma sélection de livres",
  showPrices: true,
  selectedBookIds: [],
  productPrices: {},
  setDescription: (description) => set({ description }),
  setEnabled: (isEnabled) => set({ isEnabled }),
  setName: (name) => set({ name }),
  setShowPrices: (showPrices) => set({ showPrices }),
  toggleBookSelection: (bookId) =>
    set((state) => ({
      selectedBookIds: state.selectedBookIds.includes(bookId)
        ? state.selectedBookIds.filter((id) => id !== bookId)
        : [...state.selectedBookIds, bookId],
    })),
  setProductPrice: (bookId, price) =>
    set((state) => ({ productPrices: { ...state.productPrices, [bookId]: price } })),
}), { name: "biblio-track-storefront" }));
