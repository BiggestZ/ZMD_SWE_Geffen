// perhaps
import React from "react";
import { BookEntry } from "./book";
import { Book } from "@/types";
import { BookList } from "@/types"

// use this for search and for bookmarks
// search: take directly from db
// bookmarks: figure out a different call

const BooksContainer : React.FC<BookList> = ({ books }) => {

    return(
        <div className="grid grid-cols-2 place-content-start p-5 gap-5">
            <BookEntry Title={""} Author={""} ISBN={""} />
        </div>
    );
};

export default BooksContainer;