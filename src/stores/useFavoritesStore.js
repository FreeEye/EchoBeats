import { create } from 'zustand'

const STORAGE_KEY = 'favorites'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveToStorage(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export const useFavoritesStore = create((set, get) => ({
  favorites: loadFromStorage(),

  isFavorite: (newId) => {
    return get().favorites.some((s) => s.newId === newId)
  },

  toggleFavorite: (song) => {
    const list = get().favorites
    const idx = list.findIndex((s) => s.newId === song.newId)
    let updated
    if (idx >= 0) {
      updated = [...list.slice(0, idx), ...list.slice(idx + 1)]
    } else {
      updated = [song, ...list]
    }
    saveToStorage(updated)
    set({ favorites: updated })
    return idx < 0 // true = added, false = removed
  },

  removeFavorite: (newId) => {
    const list = get().favorites.filter((s) => s.newId !== newId)
    saveToStorage(list)
    set({ favorites: list })
  },
}))
