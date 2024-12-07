interface Book {
    title: string;
    author: string;
    isbn: string;
    bookDesc?: string;
    tagsList: string[];
    topicsList: string[];
  }

type Subtopic = {
    SubtopicName: string;
}

type BooksList = {
    books: Book[]
}

// every subtopic will be back-linked to the big topics
// subtopics will be assigned to ISBNs as book IDs

export type { Book,Subtopic,BooksList };