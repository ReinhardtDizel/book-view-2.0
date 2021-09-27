import * as React from "react";
import Card from "react-bootstrap/Card";
import {Col, ListGroupItem} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup'
import {Author} from "../Models/Author";
import {representTime} from "../Functions/representTime";

const Link = require("react-router-dom").Link;

interface Props {
    id?: string;
    title?: string;
    authors?: Author[];
    description?: string;
    publishing: Date | undefined;
    image?: string;
    imgSize?: string;
    handler?: (e:any) => void;
    selectedId?: number;
}
interface State{
    selectedId?: any;
}

export default class BookRow extends React.Component<Props, State > {
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedId: this.props.id
        };
    }

    render() {
        const {
            id,
            title,
            publishing,
            authors,
            description,
            image,
            imgSize,
        } = this.props;
        const {selectedId} = this.state;
        return(
                <Col xl ='auto' sm = 'auto' lg = '3' md = 'auto' xs = 'auto' xxl = 'auto' className="bookCard"
                     onClick={this.bookOnClick}
                >
                        <Card className = "box">
                            <Link key={id}
                                  to={{pathname: `/b/${id}`, search: `?id=${id}`}}
                                  style={{ textDecoration: 'none' }}
                                  className="linkBook"
                            >
                            <Card.Img variant="top" src={image} />
                            <Card.Body>
                                <Card.Title>{title}</Card.Title>

                                <Card.Text>

                                </Card.Text>

                            </Card.Body>
                            <ListGroup  variant="flush" className="list-group-flush">
                                <ListGroupItem variant="secondary">
                                    <Card.Text>
                                        {this.authorsName(authors)}
                                    </Card.Text>
                                </ListGroupItem>
                                <ListGroupItem disabled>
                                    {representTime(publishing)}
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

    bookOnClick = () => this.showBookDetailViewHandler(this.state.selectedId);

    showBookDetailViewHandler = (e:any): void =>  {
        const {handler} = this.props;
        const {selectedId} = this.state;
        if (handler !== undefined && handler !== null) {
            handler(selectedId);
        }
    }
}