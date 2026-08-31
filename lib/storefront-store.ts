"use client";

import { create } from "zustand";

interface StorefrontState {
  description: string;
  isEnabled: boolean;
  name: string;
  showPrices: boolean;
  setDescription: (description: string) => void;
  setEnabled: (isEnabled: boolean) => void;
  setName: (name: string) => void;
  setShowPrices: (showPrices: boolean) => void;
}

export const useStorefrontStore = create<StorefrontState>((set) => ({
  description: "Une sélection de livres que j’ai envie de partager.",
  isEnabled: false,
  name: "Ma sélection de livres",
  showPrices: true,
  setDescription: (description) => set({ description }),
  setEnabled: (isEnabled) => set({ isEnabled }),
  setName: (name) => set({ name }),
  setShowPrices: (showPrices) => set({ showPrices }),
}));
