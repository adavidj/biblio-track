// Auto-generated query keys
// Central place to define all query keys

export const queryKeys = {
  // Auth
  auth: {
    all: ["auth"] as const,
    lists: () => [...queryKeys.auth.all, "list"] as const,
    list: (filters?: any) => [...queryKeys.auth.lists(), filters] as const,
    details: () => [...queryKeys.auth.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.auth.details(), id] as const,
  },
  // Notifications
  notifications: {
    all: ["notifications"] as const,
    lists: () => [...queryKeys.notifications.all, "list"] as const,
    list: (filters?: any) => [...queryKeys.notifications.lists(), filters] as const,
    details: () => [...queryKeys.notifications.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.notifications.details(), id] as const,
  },
  // Users
  users: {
    all: ["users"] as const,
    lists: () => [...queryKeys.users.all, "list"] as const,
    list: (filters?: any) => [...queryKeys.users.lists(), filters] as const,
    details: () => [...queryKeys.users.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },
  // Genres
  genres: {
    all: ["genres"] as const,
    lists: () => [...queryKeys.genres.all, "list"] as const,
    list: (filters?: any) => [...queryKeys.genres.lists(), filters] as const,
    details: () => [...queryKeys.genres.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.genres.details(), id] as const,
  },
  // Books
  books: {
    all: ["books"] as const,
    lists: () => [...queryKeys.books.all, "list"] as const,
    list: (filters?: any) => [...queryKeys.books.lists(), filters] as const,
    details: () => [...queryKeys.books.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.books.details(), id] as const,
  },
  // Reading Sessions
  readingSessions: {
    all: ["readingSessions"] as const,
    lists: () => [...queryKeys.readingSessions.all, "list"] as const,
    list: (filters?: any) => [...queryKeys.readingSessions.lists(), filters] as const,
    details: () => [...queryKeys.readingSessions.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.readingSessions.details(), id] as const,
  },
  // Stats
  stats: {
    all: ["stats"] as const,
    lists: () => [...queryKeys.stats.all, "list"] as const,
    list: (filters?: any) => [...queryKeys.stats.lists(), filters] as const,
    details: () => [...queryKeys.stats.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.stats.details(), id] as const,
  },
};
