import * as React from "react";
import {Row} from "react-bootstrap";
import BookRow from "./BookRow";
import {Book} from "../../Models/Book";

interface Props {
    books?: Book[] | null;
}

interface State {
    books?: Book[] | null;
}

export default class BooksTable extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            books: [] as Book[],
        }
    }
    render() {
        const {books} = this.props;
        return (
            <Row xs={1} md={2} className="bookTable">
                {
                    (books !== null && books !== undefined)
                        ? books.map(
                            (book) => {
                                const book_id_key:string = book.id?book.id:"noId";
                                return(
                                <BookRow
                                    key={ book_id_key }
                                    book={book}
                                />
                                )
                            }
                            ):null
                }
            </Row>
        )
    }
}
