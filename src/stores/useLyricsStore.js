import { create } from 'zustand'

export const useLyricsStore = create((set) => ({
  isOpen: false,
  song: null,
  lyrics: '',
  isLoading: false,

  open: (song) => set({ isOpen: true, song, lyrics: '', isLoading: true }),
  close: () => set({ isOpen: false, song: null, lyrics: '', isLoading: false }),
  setLyrics: (lyrics) => set({ lyrics, isLoading: false }),
}))
