import { create } from "zustand"
import { persist } from "zustand/middleware"

export type LastRead = {
  bookSlug: string
  chapterSlug: string
}

type BookState = {
  sidebarOpen: boolean
  searchOpen: boolean
  lastRead: LastRead | null
  setSidebarOpen: (open: boolean) => void
  setSearchOpen: (open: boolean) => void
  toggleSidebar: () => void
  setLastRead: (bookSlug: string, chapterSlug: string) => void
}

export const useBookStore = create<BookState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      searchOpen: false,
      lastRead: null,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setSearchOpen: (open) => set({ searchOpen: open }),
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setLastRead: (bookSlug, chapterSlug) =>
        set({ lastRead: { bookSlug, chapterSlug } }),
    }),
    {
      name: "mostafa-effati-library",
      partialize: (state) => ({ lastRead: state.lastRead }),
    }
  )
)
