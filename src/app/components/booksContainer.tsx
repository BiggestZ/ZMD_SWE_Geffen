// perhaps
import React from "react";
import { BookEntry } from "./book";

// use this for search and for bookmarks
// search: take directly from db
// bookmarks: figure out a different call
const BooksContainer : React.FC = () => {
    return(
        <div className="grid grid-cols-2 place-content-start p-5 gap-5">
            <BookEntry Title={"test Title"} Author={"test Author"} ISBN={"123456789"} PublicationYear={0} />
            <BookEntry Title={"test 2"} Author={"test 2"} ISBN={"123456789"} PublicationYear={0} />
            <BookEntry Title={"test 3"} Author={"test 3"} ISBN={"123456789"} PublicationYear={0} />
        </div>
    );
};

export default BooksContainer;