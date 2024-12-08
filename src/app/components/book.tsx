import { Book } from "@/types";
import { Tag } from "./tag";
import { getSubtopicsForBook } from "./book_entry";

const BookEntry : React.FC<Book> = ({ title,author,isbn,bookDesc,tagsList,language}) => {

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