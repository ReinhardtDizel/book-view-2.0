import * as React from "react";
import Card from "react-bootstrap/Card";
import {Col, ListGroupItem} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup'
import {Author} from "../../Models/Author";
import {DateTools} from "../../Tools/DateTools";
import {getBookCover, JPEG_IMAGE_DATA} from "../../Tools/ImageTools";
import {Book} from "../../Models/Book";

const Link = require("react-router-dom").Link;

interface Props {
    book: Book;
}
interface State{
}

export default class BookRow extends React.Component<Props, State > {
    constructor(props: Props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const {
            book,
        } = this.props;
        const base64Image = getBookCover(book.images);
        const book_id_key = book.id?book.id:"noId";
        return(
                <Card
                    key={book_id_key + "Card"}
                    className = "BookBox"
                >
                    <Link
                        key={book_id_key + "Link"}
                        to={{
                            pathname: `/b/${book.id}`,
                            state: {
                                book:book,
                            }
                          }}
                        className="linkBook"
                    >
                        <Card.Img
                            key={book_id_key + "Img"}
                            className={"BookCover"}
                            variant="top"
                            src={`${JPEG_IMAGE_DATA},${base64Image}`}
                        />
                        <Card.Body
                            key={book_id_key + "Card_Body"}
                            className={"bookCardBody"}
                        >

                            <Card.Title
                                key={book_id_key + "Card_Title"}
                                className={"bookCardTitle"}
                            >
                                {
                                    book.title
                                }
                            </Card.Title>
                        </Card.Body>
                        <ListGroup
                            key={book_id_key + "ListGroup"}
                            variant="flush"
                            className="list-group-flush"
                        >
                            <ListGroupItem
                                key={book_id_key + "ListGroupItem1"}
                                variant="secondary"
                                className="ListGroupItem1"
                            >
                                <Card.Text
                                    key={book_id_key + "Card_Text"}
                                    className="Card_Text"
                                >
                                    {
                                        this.authorsName(book.authors)
                                    }
                                </Card.Text>
                            </ListGroupItem>
                            <ListGroupItem
                                key={book_id_key + "ListGroupItem2"}
                                className="ListGroupItem2"
                                disabled
                            >
                                {
                                    DateTools(book.publishing)
                                }
                            </ListGroupItem>
                        </ListGroup>
                    </Link>
                </Card>

        )
    }
    authorsName = (authors?:Author[]) => {
        return (
            authors!== null && authors !== undefined)
            ? authors.map(
                (author) => {
                    return(
                        <Card.Text>
                            <Link to={`/`} style={{ textDecoration: 'none' }}>{author.name?.fullName}</Link> &nbsp;&nbsp;
                        </Card.Text>
                    )
                }
            ):null
    }
}