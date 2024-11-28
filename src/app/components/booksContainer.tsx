// perhaps
import React from "react";
import { BookEntry } from "./book";
import { Book, BooksList } from "@/types";

// use this for search and for bookmarks
// search: take directly from db
// bookmarks: figure out a different call

const BooksContainer : React.FC<BooksList> = ({ books }) => {

    return(
        <div className="grid grid-cols-2 place-content-start p-5 gap-5">
            {
                books.map((book) => {
                    return (
                        <BookEntry title={book.title} author={book.author} isbn={book.isbn} bookDesc={book.bookDesc} tagsList={book.tagsList} topicsList={[]} />
                    )
                })
            }
        </div>
    );
};

export default BooksContainer;