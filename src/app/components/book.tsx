import { Book } from "@/types";
import { TagsContainer } from "./tagsContainer";
import { Plus } from "phosphor-react";
//import { PyBridge } from "pybridge";
import { connectionParameters } from "../api/books/route";
import mysql from "mysql2/promise";

const BookEntry : React.FC<Book> = ({ Title,Author,ISBN }) => {

    //const bridge = new PyBridge({python: 'python3', cwd: __dirname});
   /// const connection = await mysql.createConnection(connectionParameters)
    
   /*
    interface call {
        subtopics: string[];
    }*/

    //const api = bridge.controller<call>('book_check.py');
    ///const tags = await api.find_subtopics_for_book(connection, { Title });

    ///bridge.close();

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