interface Book {
    title: string;
    author: string;
    isbn: string;
    bookDesc?: string;
    tagsList?: string[];
    language?: string[];
  }

export type { Book };