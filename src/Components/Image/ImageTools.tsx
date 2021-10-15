import {Image} from "../../Models/Image";
import {Book} from "../../Models/Book";

const BASE64_MARKER = ';base64,';

export const JPEG_IMAGE_DATA = 'data:image/jpeg;base64';


export  function base64ToArray(data:any) {
    const base64Index = data.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    const base64 = data.substring(base64Index);
    const raw = window.atob(base64);
    const rawLength = raw.length;
    let array = new Uint8Array(new Array(rawLength));
    for(let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return Array.from(array);
}

export function arrayToBase64(data:any) {
    let binary = '';
    const bytes = new Uint8Array(data);
    const len = bytes.byteLength;
    for(let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    const base64 = window.btoa(binary);
    return base64;
}

function isCover(element:Image, index:number, array:Image[]){
    if (element.cover == true) {
        return element;
    }
}

export function getBookCover(book:Book | undefined) {
    if(book !== undefined && book !== null) {
        const images:Image[] | undefined = book.images;
        if(images !== undefined && images !== null) {
            const image = images.find(isCover)
            if(image !== undefined && image !== null) {
                const {pic} = image;
                if (pic !== undefined && pic !== null) {
                    return pic;
                }
            }
        }
    }
}