import { Book, Subtopic } from "@/types";
import { Tag } from "./tag";
import { getSubtopicsForBook } from "./book_entry";
import { Plus } from "phosphor-react";

const BookEntry : React.FC<Book> = async ({ title,author,isbn,bookDesc,tagsList}) => {

    let tagsArray = tagsList.map((tag) => {
        return(
        <Tag key={tag} SubtopicName={tag} />
    )})
    
    return(
        <div className="flex">
            <div className="w-full p-2 h-fit bg-slate-200 rounded-md border-solid border border-slate-500">
                <div className="flex space-x-4 text-base">
                    <div className="font-bold capitalize">{ title }</div>
                    <div className="grow text-right"><b>ISBN: </b>{ isbn }</div>
                </div> 
                <div className="capitalize">{ author }</div>
                <div className="text-sm p-2">{ bookDesc }</div>
                <div className="flex flex-wrap flex-row place-content-start p-1 gap-2">
                    {tagsArray}
                </div>
            </div>

        </div>
    );
};

export { BookEntry };



// get a list of all topics/subtopics, order by subtopics
// loop through every tag and match them to what each book has
// add topics to also be displayed

//<div className="grow text-right"><button onClick={() => } className="rounded-md"><Plus size={20} /></button></div>            