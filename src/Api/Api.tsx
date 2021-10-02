import axios from "axios";

export const booksDataURL = "http://localhost:8080/books/";

axios.create({
    responseType: "json",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
    }
});

export const getBooks = async () => {
    const data = await axios.get(booksDataURL);
    return data;
}

export const  getBookById = async (id:string) => {
    const data = await axios.get(booksDataURL + id.replaceAll('?id=', ''));
    return data;
}

export const putBook = async (id:string, postData:any) => {
    const data = await axios.put(booksDataURL + id, postData);
    const wait = await simulateNetworkRequest().then(() => {});
    return data;
}

export const simulateNetworkRequest = ():any => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
}