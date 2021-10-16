import * as React from "react";
import Card from "react-bootstrap/Card";
import {Col, ListGroupItem} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup'
import {Author} from "../../Models/Author";
import {representTime} from "../../Functions/representTime";
import {getBookCover, JPEG_IMAGE_DATA} from "../Image/ImageTools";
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
        const base64Image = getBookCover(book);
        return(
            <Col xl ='auto' sm = 'auto' lg = 'auto' md = 'auto' xs = 'auto' xxl = 'auto' className="bookCard">
                <Card className = "box">
                    <Link key={book.id}
                          to={{
                              pathname: `/b/${book.id}`,
                              search: `?id=${book.id}`
                          }}
                          className="linkBook"
                    >
                    <Card.Img variant="top" src={`${JPEG_IMAGE_DATA},${base64Image}`} />
                    <Card.Body>
                        <Card.Title>
                            {
                                book.title
                            }
                        </Card.Title>
                    </Card.Body>
                    <ListGroup  variant="flush" className="list-group-flush">
                        <ListGroupItem variant="secondary">
                            <Card.Text>
                                {
                                    this.authorsName(book.authors)
                                }
                            </Card.Text>
                        </ListGroupItem>
                        <ListGroupItem disabled>
                            {
                                representTime(book.publishing)
                            }
                        </ListGroupItem>
                    </ListGroup>
                    </Link>
                </Card>
            </Col>
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