import { Axios,AxiosRequestConfig,AxiosResponse } from "axios";
import type { Book,BookAPI } from "@/types.ts";

const axios: Axios = new Axios({
    baseURL: "http://localhost:8888",
    } as AxiosRequestConfig);

/*const booksAPIService: BookAPI = {
    search: async ({ query }) => {
        const response: AxiosResponse<any,any> = await.axios.get("/")
    }
}*/
