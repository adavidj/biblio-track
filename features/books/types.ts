// Auto-generated TypeScript types

export interface CreateBookDto {

  title: string;

  author: string;

  description?: string;

  fileUrl?: string;

  totalPages?: number;

  isbn?: string;

  publisher?: string;

  publishedYear?: number;

  language?: string;

  genreId?: string;

  status?: 'TO_READ' | 'IN_PROGRESS' | 'FINISHED';
}

export interface UpdateBookDto {

  title?: string;

  author?: string;

  description?: string;

  coverUrl?: string;

  fileUrl?: string;

  totalPages?: number;

  isbn?: string;

  publisher?: string;

  publishedYear?: number;

  language?: string;

  genreId?: string;

  status?: 'TO_READ' | 'IN_PROGRESS' | 'FINISHED';
}

export interface ImportBookDto {

  title: string;

  author: string;

  description?: string;

  coverUrl?: string;

  totalPages?: number;

  isbn?: string;

  publisher?: string;

  publishedYear?: number;

  language?: string;

  externalSourceId?: string;

  externalSource?: string;

  genreId?: string;
}

export interface ImportByExternalIdDto {

  /** Open Library key or Google Books volume ID */
  externalSourceId: string;

  externalSource: 'open_library' | 'google_books';

  genreId?: string;
}

export interface UpdateProgressDto {

  currentPage: number;
}

