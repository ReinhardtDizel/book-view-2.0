import axios from "axios";

export const booksDataURL = "http://localhost:8080/books/";
export const registrationURL = "http://localhost:8081/registration/";

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

export const putBook = async (id:string, putData:any) => {
    if(id !== undefined && id !== null && putData !== undefined && putData !== null) {
        const data = await axios.put(booksDataURL + id, putData);
        const wait = await simulateNetworkRequest().then(() => {
        });
        return data;
    }
    return "ERROR";
}

export const postBook = async (postData:any) => {
    if(postData !== undefined && postData !== null) {
        const data = await axios.post(booksDataURL, postData);
        const wait = await simulateNetworkRequest().then(() => {
        });
        return data;
    }
    return "ERROR";
}

export const deleteBook = async (id:string) => {
    if(id !== undefined && id !== null && id !== "new") {
        const data = await axios.delete(booksDataURL + id);
        const wait = await simulateNetworkRequest().then(() => {
        });
        return data;
    }
    return "ERROR";
}

export const submitUser = async (postData:any) => {
    if(postData !== undefined && postData !== null) {

        console.log(postData);

    }
    return "ERROR";
}

export const simulateNetworkRequest = ():any => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
}

export const userLoginRole = () => {
    return "";
}