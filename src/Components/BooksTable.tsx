import * as React from "react";
import {Row} from "react-bootstrap";
import BookRow from "./BookRow";
import {Author} from "../Models/Author";
import {Book} from "../Models/Book";


interface Props {
    id?: string;
    title?: string;
    authors?: Author[];
    description?: string;
    publishing?: Date | undefined;
    image?: string;
    imgSize?: string;
    handler?: (e:any) => void;
    books?: Book[] | null;
}

interface State {
    book?: Book[] | null;
    selectedId?: string;
}

export default class BooksTable extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            book: [] as Book[],
        }
    }

    handler = (event:any):void => {
        const {handler} = this.props;
        if (handler !== undefined && handler !== null) {
            handler(event);
        }
        this.setState({
            selectedId: event,
        });
    }

    render() {
        const { books } = this.props;
        return  <Row xs={1} md={2} className="g-4">
            {
                (books !== null && books !== undefined)
                    ? books.map(
                        (book) => {
                            return(
                            <BookRow
                                key={ book.id }
                                id={ book.id }
                                title={ book.title }
                                publishing={ book.publishing }
                                authors={ book.authors }
                                description={ book.description }
                                image={ book.image }
                                handler={ this.handler }
                            />
                            )
                        }
                        ):null
            }
        </Row>
    }
}
