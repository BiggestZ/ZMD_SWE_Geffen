import { Book } from "@/types";
import axios, {AxiosRequestConfig, Method} from "axios";
import { BookEntry } from "../components/book";
import SearchBlock from "@/app/components/filters/search"
import { getAllSubtopics,getSubtopicsForBook } from "../components/book_entry";
import { config } from "dotenv";
import { makeAxiosRequestConfig } from "../components/axiosrequest";

export default async function Home() {

    let booksList : string = ''; 
    
    let subTopicsList = getAllSubtopics();
    
    //const configData = makeAxiosRequestConfig('PATCH', '/api/books', myFormData)
    //const response = await axios(configData)

    await axios
        .get('http://localhost:3000/api/books', {responseType : "json"})
        //use the form response URL mods here???
        .then(function (response) {
            booksList = response.data;
        })
        .catch((err) => console.log("couldn't read db"));

    let bookArray = booksList.map((book : Book) => {
        let tagsArray = getSubtopicsForBook(subTopicsList,book.Title)

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