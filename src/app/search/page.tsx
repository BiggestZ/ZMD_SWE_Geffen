import { Book } from "@/types";
import axios, {AxiosRequestConfig, Method} from "axios";
import { BookEntry } from "../components/book";
import SearchBlock from "@/app/components/filters/search"
import { getAllSubtopics,getAllBooks } from "../components/book_entry";

export default async function Home() {

    let booksList : string = ''; 
    let subtopicsList : Record<string,string[]> = {}
    let newBooksList : Record<string, string[]> = {}
    
    await axios
        .get('http://localhost:3000/api/books', {responseType : "json"})
        //use the form response URL mods here???
        .then(function (response) {
            booksList = response.data;
        })
        .catch((err) => console.log("couldn't read db"));

    await getAllBooks()
        .then(value => {
            newBooksList = value;
        })

    await getAllSubtopics()
        .then((value) => {
            subtopicsList = value;
        })

    // take formData and feed it to newBooksList["subtopic"]
    // compare newBooksList with booksList
    // for each title in newBooksList, map out the full book from the booksList data

    let bookArray = booksList.map((book : Book) => {
        let tagsArray = subtopicsList[book.Title]

        // map is highlighted as an error here but it's working anyway?
        return (
            <BookEntry key={book.ISBN} title={book.Title} author={book.Author} isbn={book.ISBN} bookDesc={book.Description} tagsList={tagsArray}/>
        )
    })

    return (
        <div className="flex space-x-10">
            <SearchBlock />
            <div className = "flex w-48" />
            <div className = "flex w-fit">
                <div className="right-0 p-5 gap-5 space-y-2">
                    { bookArray }
                </div>  
            </div>         
        </div>             
    );
};