// will this be used? not sure

import csv from "csvtojson";
import type { Book, BookAPI } from "../types.js";

/*const getBookData: () => Promise<Book[]> = async () => {
    const result: Book[] await csv().fromFile();
    return result;
};*/

const booksAPIService: BookAPI = {
    find: async () => {
        const data: Book[] = await getBookData();
        return data;
    },
    count: async () => {
        const data: Book[] = await getBookData();
        return data.length;
    },
};
export { booksAPIService };