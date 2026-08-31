
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface ApiOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  token?: string;
  isFormData?: boolean;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

/* =========================================================
   API REQUEST
========================================================= */

async function request<T = unknown>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<ApiResponse<T>> {
  const {
    method = "GET",
    body,
    headers = {},
    token,
    isFormData = false,
  } = options;

  const reqHeaders: Record<string, string> = {
    Accept: "application/json",
  };

  /* JSON headers uniquement si ce n'est pas un FormData */
  if (!isFormData) {
    reqHeaders["Content-Type"] = "application/json";
  }

  /* Authorization */
  if (token) {
    reqHeaders["Authorization"] = `Bearer ${token}`;
  }

  /* Headers personnalisés */
  Object.assign(reqHeaders, headers);

  const url = `${API_BASE}${endpoint}`;

  let res: Response;

  try {
    res = await fetch(url, {
      method,
      headers: reqHeaders,
      body: isFormData
        ? (body as FormData)
        : body !== undefined
          ? JSON.stringify(body)
          : undefined,
    });
  } catch (error) {
    console.error("Erreur réseau :", error);

    throw {
      status: 0,
      success: false,
      message:
        "Impossible de contacter le serveur. Vérifiez votre connexion.",
    };
  }

  /* =========================================================
     LECTURE SÉCURISÉE DE LA RÉPONSE
  ========================================================= */

  const contentType = res.headers.get("content-type") || "";

  let data: unknown = null;

  try {
    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();

      data = text
        ? {
            success: false,
            message: text,
          }
        : null;
    }
  } catch {
    data = null;
  }

  /* =========================================================
     ERREUR HTTP
  ========================================================= */

  if (!res.ok) {
    const errorData =
      typeof data === "object" && data !== null
        ? (data as Record<string, unknown>)
        : {};

    throw {
      status: res.status,
      success: false,
      message:
        typeof errorData.message === "string"
          ? errorData.message
          : getDefaultErrorMessage(res.status),
      ...errorData,
    };
  }

  /* =========================================================
     RÉPONSE VIDE
  ========================================================= */

  if (data === null) {
    return {
      success: true,
      message: "Opération réussie.",
    };
  }

  /* =========================================================
     RÉPONSE JSON
  ========================================================= */

  return data as ApiResponse<T>;
}

/* =========================================================
   MESSAGES D'ERREUR
========================================================= */

function getDefaultErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return "Requête invalide.";

    case 401:
      return "Identifiants incorrects.";

    case 403:
      return "Vous n'êtes pas autorisé à effectuer cette action.";

    case 404:
      return "Ressource introuvable.";

    case 409:
      return "Cette ressource existe déjà.";

    case 422:
      return "Les données fournies sont invalides.";

    case 429:
      return "Trop de requêtes. Veuillez patienter.";

    case 500:
      return "Erreur interne du serveur.";

    case 502:
      return "Le serveur est temporairement indisponible.";

    case 503:
      return "Le service est temporairement indisponible.";

    default:
      return "Une erreur est survenue. Veuillez réessayer.";
  }
}

/* =========================================================
   AUTH
========================================================= */

export const authApi = {
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) =>
    request("/auth/register", {
      method: "POST",
      body: data,
    }),

  verifyOtp: (data: {
    email: string;
    code: string;
  }) =>
    request("/auth/verify-otp", {
      method: "POST",
      body: data,
    }),

  resendOtp: (data: {
    email: string;
  }) =>
    request("/auth/resend-otp", {
      method: "POST",
      body: data,
    }),

  login: (data: {
    email: string;
    password: string;
  }) =>
    request("/auth/login", {
      method: "POST",
      body: data,
    }),

  refresh: (refreshToken: string) =>
    request("/auth/refresh", {
      method: "POST",
      body: {
        refreshToken,
      },
    }),

  forgotPassword: (data: {
    email: string;
  }) =>
    request("/auth/forgot-password", {
      method: "POST",
      body: data,
    }),

  resetPassword: (data: {
    email: string;
    code: string;
    newPassword: string;
  }) =>
    request("/auth/reset-password", {
      method: "POST",
      body: data,
    }),

  updatePassword: (
    data: {
      currentPassword: string;
      newPassword: string;
    },
    token: string
  ) =>
    request("/auth/update-password", {
      method: "PATCH",
      body: data,
      token,
    }),
};

/* =========================================================
   USERS
========================================================= */

export const usersApi = {
  getMe: (token: string) =>
    request("/users/me", {
      token,
    }),

  updateMe: (
    data: {
      firstName?: string;
      lastName?: string;
    },
    token: string
  ) =>
    request("/users/me", {
      method: "PATCH",
      body: data,
      token,
    }),

  uploadAvatar: (
    file: File,
    token: string
  ) => {
    const fd = new FormData();

    fd.append("avatar", file);

    return request("/users/me/avatar", {
      method: "PATCH",
      body: fd,
      token,
      isFormData: true,
    });
  },

  deleteAvatar: (token: string) =>
    request("/users/me/avatar", {
      method: "DELETE",
      token,
    }),
};

/* =========================================================
   GENRES
========================================================= */

export const genresApi = {
  list: () =>
    request("/genres"),

  create: (
    data: {
      name: string;
    },
    token: string
  ) =>
    request("/genres", {
      method: "POST",
      body: data,
      token,
    }),

  update: (
    id: string,
    data: {
      name: string;
    },
    token: string
  ) =>
    request(`/genres/${id}`, {
      method: "PATCH",
      body: data,
      token,
    }),

  delete: (
    id: string,
    token: string
  ) =>
    request(`/genres/${id}`, {
      method: "DELETE",
      token,
    }),
};

/* =========================================================
   BOOKS
========================================================= */

export const booksApi = {
  externalSearch: (q: string) =>
    request(
      `/books/external-search?q=${encodeURIComponent(q)}`
    ),

  importExternal: (
    data: {
      externalSourceId: string;
      externalSource: string;
      genreId?: string;
    },
    token: string
  ) =>
    request("/books/import-external", {
      method: "POST",
      body: data,
      token,
    }),

  importManual: (
    data: {
      title: string;
      author: string;
      description?: string;
      totalPages?: number;
      isbn?: string;
      publisher?: string;
      publishedYear?: number;
      language?: string;
      externalSourceId?: string;
      externalSource?: string;
      genreId?: string;
    },
    token: string
  ) =>
    request("/books/import", {
      method: "POST",
      body: data,
      token,
    }),

  create: (
    data: {
      title: string;
      author: string;
      description?: string;
      isbn?: string;
      publisher?: string;
      publishedYear?: number;
      language?: string;
      genreId?: string;
      totalPages?: number;
    },
    token: string
  ) =>
    request("/books", {
      method: "POST",
      body: data,
      token,
    }),

  list: (
    token: string,
    params?: {
      page?: number;
      limit?: number;
      search?: string;
      status?: string;
      genreId?: string;
    }
  ) => {
    const query = new URLSearchParams();

    if (params?.page) {
      query.set("page", String(params.page));
    }

    if (params?.limit) {
      query.set("limit", String(params.limit));
    }

    if (params?.search) {
      query.set("search", params.search);
    }

    if (params?.status) {
      query.set("status", params.status);
    }

    if (params?.genreId) {
      query.set("genreId", params.genreId);
    }

    const qs = query.toString();

    return request(
      `/books${qs ? `?${qs}` : ""}`,
      {
        token,
      }
    );
  },

  get: (
    id: string,
    token: string
  ) =>
    request(`/books/${id}`, {
      token,
    }),

  getRead: (
    id: string,
    token: string
  ) =>
    request(`/books/${id}/read`, {
      token,
    }),

  update: (
    id: string,
    data: Record<string, unknown>,
    token: string
  ) =>
    request(`/books/${id}`, {
      method: "PATCH",
      body: data,
      token,
    }),

  delete: (
    id: string,
    token: string
  ) =>
    request(`/books/${id}`, {
      method: "DELETE",
      token,
    }),

  updateProgress: (
    id: string,
    currentPage: number,
    token: string
  ) =>
    request(`/books/${id}/progress`, {
      method: "PATCH",
      body: {
        currentPage,
      },
      token,
    }),

  uploadCover: (
    id: string,
    file: File,
    token: string
  ) => {
    const fd = new FormData();

    fd.append("cover", file);

    return request(`/books/${id}/cover`, {
      method: "POST",
      body: fd,
      token,
      isFormData: true,
    });
  },

  uploadFile: (
    id: string,
    file: File,
    token: string
  ) => {
    const fd = new FormData();

    fd.append("file", file);

    return request(`/books/${id}/file`, {
      method: "POST",
      body: fd,
      token,
      isFormData: true,
    });
  },
};

/* =========================================================
   SESSIONS
========================================================= */

export const sessionsApi = {
  create: (
    bookId: string,
    data: {
      pagesRead: number;
      startPage: number;
      endPage: number;
    },
    token: string
  ) =>
    request(`/books/${bookId}/sessions`, {
      method: "POST",
      body: data,
      token,
    }),

  list: (
    bookId: string,
    token: string
  ) =>
    request(`/books/${bookId}/sessions`, {
      token,
    }),

  delete: (
    id: string,
    token: string
  ) =>
    request(`/sessions/${id}`, {
      method: "DELETE",
      token,
    }),
};

/* =========================================================
   NOTIFICATIONS
========================================================= */

export const notificationsApi = {
  list: (token: string) =>
    request("/notifications", {
      token,
    }),

  markRead: (
    id: string,
    token: string
  ) =>
    request(`/notifications/${id}/read`, {
      method: "PATCH",
      token,
    }),

  markAllRead: (token: string) =>
    request("/notifications/read-all", {
      method: "PATCH",
      token,
    }),
};

/* =========================================================
   STATS
========================================================= */

export const statsApi = {
  overview: (token: string) =>
    request("/stats/overview", {
      token,
    }),

  progress: (token: string) =>
    request("/stats/progress", {
      token,
    }),
};
