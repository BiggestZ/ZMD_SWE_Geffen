import { Book } from "@/types";
import axios from "axios";
import { BookEntry } from "../components/book";
import { json } from "stream/consumers";


export default async function Home() {
    
    let booksList : string = '';

    await axios
        .get('http://localhost:3000/api/books', {responseType : "json"})
        .then(function (response) {
            booksList = response.data;
        })
        .catch((err) => console.log("couldn't read db"));

    console.log('test new', booksList);

    let bookArray = booksList.map((book : Book) => {
        // map is highlighted as an error here but it's working anyway?
        return (
            <BookEntry key={book.ISBN}    Title={book.Title} Author={book.Author} ISBN={book.ISBN} />
        )
    })

    return (
        <div>
            <h1>search test</h1>
            <div className="grid grid-cols-2 place-content-start p-5 gap-5">
                { bookArray }
            </div>           
        </div>             
    );
};
    
// <BookEntry key={book.Title} Title={book.Title} Author={book.Author} ISBN={book.ISBN} />
/////{booksList.map((book) => {})}