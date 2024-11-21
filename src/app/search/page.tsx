import { Book } from "@/types";
import axios, {AxiosRequestConfig, Method} from "axios";
import { BookEntry } from "../components/book";
import SearchBlock from "@/app/components/filters/search"
import { getAllSubtopics,getAllBooks, getAllTopics } from "../components/book_entry";
import { match } from "assert";

export default async function Home() {

    // initializing
    let booksList : string = ''; 
    let subtopicsList : Record<string,string[]> = {}
    let newBooksList : Record<string, string[]> = {}
    let topicsList : Record<string, string[]> = {}

    await axios
        .get('http://localhost:3000/api/books', {responseType : "json"})
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

    await getAllTopics()
        .then((value) => {
            topicsList = value;
        })

    let bookArray : Array<Book> = booksList.map((book : Book) => {

        let newBook : Book = {
            title: book.Title,
            author: book.Author,
            isbn: book.ISBN,
            bookDesc: book.Description,
            tagsList: [],
            topicsList: []
        }

        return(newBook)
    })

    // search filter attempt


    // map out books to render
    function matchBooks(booksList : Array<Book>, filter?: string) : Array<Book> {
        
        let finalList : Array<Book> = []

        if (filter) {
            let test = newBooksList[filter]

            for (const name of test) {
                for (const book of booksList) {
                    if (book.title == name) {
                        finalList.push(book)
                    }
                }
            }

            return finalList;
        }
        else {
            return booksList;
        }
    }

    let AAAAAH = matchBooks(bookArray,"language")

    let renderBooks = AAAAAH.map(
        (book) => {
            let tagsArray = subtopicsList[book.title]
            let topicsArray = topicsList[book.title]

            return (
                <BookEntry key={book.isbn} title={book.title} author={book.author} isbn={book.isbn} bookDesc={book.bookDesc} tagsList={tagsArray} topicsList={topicsArray}/>
            )
        }
    )

    return (
        <div className="flex space-x-10">
            <SearchBlock />
            <div className = "flex w-48" />
            <div className = "flex w-fit">
                <div className="right-0 p-5 gap-5 space-y-2">
                    { renderBooks }
                </div>  
            </div>         
        </div>             
    );
};