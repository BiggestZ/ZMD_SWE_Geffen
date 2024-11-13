// perhaps
import React from "react";
import { BookEntry } from "./book";
import { Book } from "@/types";
import { BookList } from "@/types"

// use this for search and for bookmarks
// search: take directly from db
// bookmarks: figure out a different call

/*
function BooksContainer2 ({data}){
    return(
        <div className="grid grid-cols-2 place-content-start p-5 gap-5">
            {data.map(({ Title, Author, ISBN }) => 
                <div key={ISBN}>
                    { Title }: <BookEntry Title={Title}, Author={Author}, ISBN={ISBN}, PublicationYear={0} />
                </div>
            )}
            <BookEntry Title={""} Author={""} ISBN={""} PublicationYear={0} />
        </div>
    );
}*/

const BooksContainer : React.FC<BookList> = ({ books }) => {

/*
essentially:
take an input somehow of every book you want included
run a for() to make a new book "entry" for each one
fill the container 

this should work then to port over both the db and to do bookmarks, smaller searches, whatever
storage and rendering need to happen separately
it does mean that the thing will need to generate all the new items every time a different page is loaded...?
*/


    return(
        <div className="grid grid-cols-2 place-content-start p-5 gap-5">
            <BookEntry Title={""} Author={""} ISBN={""} PublicationYear={0} />
        </div>
    );
};

export default BooksContainer;