import {Author} from './Author';

export interface Book {
    id?: string;
    title?: string;
    description?: string;
    publishing: Date | undefined;
    image?: string;
    authors?: Author[];
}