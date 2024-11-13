interface Book {
    Title: string;
    Author: string;
    ISBN: string;
    PublicationYear: number;
    // Tags: Array<Subtopic>;
    // tags: ?
}; 

type Subtopic = {
    SubtopicName: string;
    SubtopicID: number;
    TopicID: number;
}

type BookList = {
    books: Book | Book[]
}

type SubtopicsList =  {
    children: JSX.Element | JSX.Element[]
}

// every subtopic will be back-linked to the big topics
// subtopics will be assigned to ISBNs as book IDs

type BookAPI = {
    find: () => Promise<Book[]>;
    count: () => Promise<number>;
    // not really sure what this does actually
};

export type { Book,Subtopic,BookAPI,BookList };