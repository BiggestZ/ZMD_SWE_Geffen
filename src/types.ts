type Book = {
    Title: string;
    Author: string;
    ISBN: string;
    PublicationYear: number;
    // Tags: Array<Subtopic>;
    // tags: ?
    // look into prisma.io for db integration - may need to fuck with packages/dependencies first
}; 

type Subtopic = {
    SubtopicName: string;
    SubtopicID: number;
    TopicID: number;
}

type BookAPI = {
    find: () => Promise<Book[]>;
    count: () => Promise<number>;
    // not really sure what this does actually
};

export type { Book, Subtopic, BookAPI };