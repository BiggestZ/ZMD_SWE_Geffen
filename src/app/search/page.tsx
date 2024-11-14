import { Book } from "@/types";
import axios from "axios";
import { BookEntry } from "../components/book";
import SearchBlock from "@/app/components/filters/search"


export default async function Home() {
    
    let booksList : string = "";

    await axios
        .get('http://localhost:3000/api/books', {responseType : "json"})
        .then(function (response) {
            booksList = response.data;
        })
        .catch((err) => console.log("couldn't read db"));
        // probably going to want to make it so you can just feed this a query as a method and then call it back in later

    let bookArray = booksList.map((book : Book) => {
        // map is highlighted as an error here but it's working anyway?
        return (
            <BookEntry key={book.ISBN} Title={book.Title} Author={book.Author} ISBN={book.ISBN} />
        )
    })

    return (
        <div className="flex space-x-10">
            <SearchBlock />
            <div className = "flex w-52"></div>
            <div>
                <h1>search test</h1>
                <div className="grid grid-cols-2 place-content-start p-5 gap-5">
                    { bookArray }
                </div>  
            </div>         
        </div>             
    );
};