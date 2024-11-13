//import BooksContainer from "../components/booksContainer";
import { Book } from "@/types";
import axios from "axios";
import { BookEntry } from "../components/book";
///import { Book } from "phosphor-react";


export default async function Home() {

    let booksList : Array<Book> = [];

        await axios
        .get('http://localhost:3000/api/books', {responseType : "json"})
        .then(function (response) {
            booksList.push(response.data);
        })
        .catch((err) => console.log("couldn't read db"));
        Promise.all(booksList);

    console.log('test', booksList);

    return (
        <div>
            <h1>search test</h1>
            
                {booksList.map((book) => {
                    return (
                        <div className="grid grid-cols-2 place-content-start p-5 gap-5"> 
                        <div className="flex">
                            <BookEntry key={book.Title} Title={book.Title} Author={book.Author} ISBN={book.ISBN} PublicationYear={0} />

                            <div className="w-full p-2 h-fit bg-slate-200 rounded-md border-solid border border-slate-500">     
                                <div className="flex space-x-4 text-base">
                                    <div className="font-bold capitalize"></div>
                                    <div className="capitalize">book.Author</div>
                                    <div className="grow text-right"><b>ISBN: </b>book.ISBN</div>
                                </div>
                                <div className="text-sm p-2">description</div>
                            </div>
                        </div>
                        </div>  
                    )
                })}
            </div>
            
    );
};
    