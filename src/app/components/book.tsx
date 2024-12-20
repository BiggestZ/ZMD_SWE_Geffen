import { Book } from "@/types";
import { TagsContainer } from "./tagsContainer";
import { Plus } from "phosphor-react";
//import { PyBridge } from "pybridge";
import { connectionParameters } from "../books/route";
import mysql from "mysql2/promise";

const BookEntry : React.FC<Book> = ({ Title,Author,ISBN }) => {

    return(
        <div className="flex">
            <div className="w-full p-2 h-fit bg-slate-200 rounded-md border-solid border border-slate-500">
                <div className="flex space-x-4 text-base">
                    <div className="font-bold capitalize">{ Title }</div>
                    <div className="capitalize">{ Author }</div>
                    <div className="grow text-right"><b>ISBN: </b>{ ISBN }</div>
                    
                </div>
                <div className="text-sm p-2">description</div>
                <TagsContainer />
            </div>

        </div>
    );
};

export { BookEntry };

//<div className="grow text-right"><button onClick={() => } className="rounded-md"><Plus size={20} /></button></div>            