import { create } from 'zustand'

export const useAudioTimeStore = create((set) => ({
  currentTime: 0,
  setCurrentTime: (time) => set({ currentTime: time }),
}))
