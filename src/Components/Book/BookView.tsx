import * as React from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import {getBookCover, JPEG_IMAGE_DATA, JPEG_NO_IMAGE} from "../../Tools/ImageTools";
import {DateTools} from "../../Tools/DateTools";
import {Author} from "../../Models/Author";
import {Book} from "../../Models/Book";
import {Image} from "../../Models/Image";
import {userLoginRole} from "../../Api/Api";


const Link = require("react-router-dom").Link;

interface Props {
    handler?: (e:any) => void;
    history: any;
    state?: any;
}
interface State {
    id?: string;
    authors?: Author[];
    title?: string;
    publishing?: Date;
    description?: string;
    pic?: Image[];
}

export default class BookView extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            id: '',
            authors: [],
            title: '',
            publishing: undefined,
            description: '',
            pic: [] as Image[],
        };
    }
    render() {
        const {
            id,
            title,
            publishing,
            description,
            pic,
        } = this.state;
        const base64Image = getBookCover(pic);
        return(
            <Card className={'bookViewCard'}>
                <Card.Body>
                    <Row className={'bookViewContainer'}>
                        <Col className={"bookViewImage"}>
                            <Card.Img
                                className={"BookCover"}
                                key={"ImageURL"}
                                variant="top"
                                src={`${JPEG_IMAGE_DATA},${base64Image?base64Image:JPEG_NO_IMAGE}`}
                            />
                        </Col>
                        <Col className={"bookViewInfo"}>
                            <Card.Text key={"Title"}>
                                {
                                    title ? title : "noTitle"
                                }
                            </Card.Text>
                            <Card.Text key={"Author"}>
                                {this.authorViewLink()}
                            </Card.Text>
                            <Card.Text key={"PublishingDate"}>
                                {
                                    DateTools(publishing)
                                }
                            </Card.Text>
                            <Card.Text key={"Description"}>
                                {
                                    description ? description : "noDescription"
                                }
                            </Card.Text>
                            <Card.Text
                                key={"links"}
                            >
                                <Button
                                    className='BackButton'
                                    variant="secondary"
                                    size="sm"
                                >
                                    <Link
                                        className = "backLink"
                                        to={`/`}
                                    >
                                        Back
                                    </Link>
                                </Button>
                                {this.adminToolEditBook()}
                            </Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }

    componentDidMount() {
        const {state} = this.props;
        if(state !== undefined && state !== null) {
            const book = state.book;
            if(book !== undefined && book !== null){
                this.setState({
                    id: book.id,
                    authors: book.authors,
                    title: book.title,
                    publishing: book.publishing,
                    description: book.description,
                    pic: book.images,
                });
            }
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        if(prevProps !== this.props) {
            const {state} = this.props
            const book = state.book;
            if(book !== undefined && book !== null) {
                this.setState({
                    id: book.id,
                    authors: book.authors,
                    title: book.title,
                    publishing: book.publishing,
                    description: book.description,
                    pic: book.images,
                });
            }
        }
    }

    getData = (query:any) =>  {
        query = query.replaceAll('/b/', '');
        const {handler} = this.props;
        if(handler !== undefined && handler != null) {
            handler(query);
        }
    }

    adminToolEditBook = () => {
        if (userLoginRole() === "admin") {
            const {state} = this.props;
            const book = state.book;
            const id = book.id;
            if (id !== undefined && id !== null && book !== undefined && book !== null) {
                return (
                    <Button
                        className='AdminEditButton'
                        variant="secondary"
                        size="sm"
                    >
                        <Link
                            className="editLink"
                            to={{
                                pathname: `/b/edit/${id}`,
                                state: {
                                    activateLink: true,
                                    bookId: id,
                                    book: book,
                                }
                            }}
                        >
                            edit this book
                        </Link>
                    </Button>
                )
            }
        }
    }

    authorViewLink = () => {
        const {authors, id} = this.state;
        const {state} = this.props;
        const book = state.book;
        return (
            authors!== null && authors !== undefined)
            ? authors.map(
                (author) => {
                    const {name} = author;
                    if(author !== undefined) {
                        const fullName = name?.fullName ? name?.fullName : "noFullName";
                        return (
                            <td>
                                <Link
                                    className="authorLink"
                                    to={{
                                        pathname: `/b/author/${author.id}`,
                                        state: {
                                            author: author,
                                            bookId: id ? id : "undefined_authorView",
                                            book: book,
                                        }
                                    }}
                                >
                                    {
                                        fullName
                                    }
                                </Link> &nbsp;&nbsp;
                            </td>
                        )
                    }
                }
            ):null
    }
}