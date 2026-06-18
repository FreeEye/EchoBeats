import { create } from 'zustand'

const STORAGE_KEY = 'playMode'

function loadFromStorage() {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'order'
  } catch {
    return 'order'
  }
}

function saveToStorage(mode) {
  localStorage.setItem(STORAGE_KEY, mode)
}

export const usePlayModeStore = create((set) => ({
  playMode: loadFromStorage(),
  setPlayMode: (mode) => {
    saveToStorage(mode)
    set({ playMode: mode })
  },
}))

export function getPlayMode() {
  return usePlayModeStore.getState().playMode
}

export function setPlayMode(mode) {
  usePlayModeStore.getState().setPlayMode(mode)
}
