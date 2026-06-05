import { create } from 'zustand'
import { persist } from 'zustand/middleware'

let nextId = Date.now()

export const useLocalPlaylistStore = create(
  persist(
    (set, get) => ({
      playlists: [],

      createPlaylist: (name) => {
        const playlist = {
          id: String(nextId++),
          name,
          songs: [],
          createdAt: Date.now(),
        }
        set({ playlists: [...get().playlists, playlist] })
        return playlist
      },

      deletePlaylist: (id) => {
        set({
          playlists: get().playlists.filter((p) => p.id !== id),
        })
      },

      addSongToPlaylist: (playlistId, song) => {
        set({
          playlists: get().playlists.map((p) => {
            if (p.id !== playlistId) return p
            if (p.songs.some((s) => s.newId === song.newId)) return p
            return { ...p, songs: [...p.songs, song] }
          }),
        })
      },

      removeSongFromPlaylist: (playlistId, songNewId) => {
        set({
          playlists: get().playlists.map((p) => {
            if (p.id !== playlistId) return p
            return {
              ...p,
              songs: p.songs.filter((s) => s.newId !== songNewId),
            }
          }),
        })
      },

      renamePlaylist: (id, newName) => {
        set({
          playlists: get().playlists.map((p) => {
            if (p.id !== id) return p
            return { ...p, name: newName }
          }),
        })
      },
    }),
    {
      name: 'echobeats-playlists',
    },
  ),
)
