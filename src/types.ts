interface Book {
    title: string;
    author: string;
    isbn: string;
    bookDesc?: string;
    tagsList?: string[];
    language?: string[];
  }

  type Subtopic = {
    SubtopicName: string;
}

export type { Book, Subtopic };