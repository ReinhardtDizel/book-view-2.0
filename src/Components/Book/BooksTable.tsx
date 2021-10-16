import * as React from "react";
import {Button, Container, Row} from "react-bootstrap";
import BookRow from "./BookRow";
import {Book} from "../../Models/Book";
import {Link} from "react-router-dom";

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

    adminTools = () => {
        return (
            <Row xs={1} md={1} className="g-5">
                <Button
                    className='BookTable_BookAdd'
                    size="sm"
                    variant="Secondary"
                >
                    <Link
                        to={{
                            pathname:`/b/edit/${"new"}`,
                            state:  { activateLink: true, bookId:undefined},
                            hash: 'addBook',
                        }}
                        className = "addLink"
                    >
                        add Book
                    </Link>
                </Button>
            </Row>
        )
    }

    render() {
        const { books } = this.props;
        return (
            <Container fluid className={'bookTable'}>
                <Row xs={1} md={2} className="g-4">
                    {
                        (books !== null && books !== undefined)
                            ? books.map(
                                (book) => {
                                    return(
                                    <BookRow
                                        key={ book.id }
                                        book={book}
                                    />
                                    )
                                }
                                ):null
                    }
                </Row>
                {this.adminTools()}
            </Container>
        )
    }
}
