import { create } from 'zustand'

export const useLyricsStore = create((set) => ({
  isOpen: false,
  isFloatingOpen: false,
  song: null,
  lyrics: '',
  isLoading: false,

  open: (song) => set({ isOpen: true, song, lyrics: '', isLoading: true }),
  close: () => set({ isOpen: false, song: null, lyrics: '', isLoading: false }),
  setLyrics: (lyrics) => set({ lyrics, isLoading: false }),
  toggleFloating: () => set((s) => ({ isFloatingOpen: !s.isFloatingOpen })),
  openFloating: (song) => set({ isFloatingOpen: true, song, lyrics: '', isLoading: true }),
  closeFloating: () => set({ isFloatingOpen: false }),
}))
