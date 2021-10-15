import {Author} from './Author';
import {Image} from './Image';

export interface Book {
    id?: string;
    title?: string;
    description?: string;
    publishing: Date | undefined;
    images?: Image[];
    authors?: Author[];
}