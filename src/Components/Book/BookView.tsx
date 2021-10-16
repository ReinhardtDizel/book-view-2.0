import * as React from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {Author} from "../../Models/Author";
import {representTime} from "../../Functions/representTime";
import {Book} from "../../Models/Book";
import {getBookCover, JPEG_IMAGE_DATA} from "../Image/ImageTools";

const Link = require("react-router-dom").Link;

interface Props {
    handler?: (e:any) => void;
    history: any;
    book?: Book;
}
interface State {
    id?: string;
    authors?: Author[];
    title?: string;
    publishing?: Date;
    description?: string;
    image?: string;
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
            image: '',
        };
    }
    render() {
        const {
            id,
            title,
            publishing,
            description,
            image,
        } = this.state;
        return(
            <Container fluid className={'bookViewContainer'}>
                <Row>
                    <Col className={'bookViewImage'} xl ='auto' sm = 'auto' lg = 'auto' md = 'auto' xs = 'auto' xxl = 'auto'>
                        <Card.Img key={"ImageURL"} variant="top" src={`${JPEG_IMAGE_DATA},${image?image:''}`}/>
                    </Col>
                    <Col>
                        <Card className={'bookViewCard-1'}>
                            <Card.Body>
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
                                        representTime(publishing)
                                    }
                                </Card.Text>
                                <Card.Text key={"Description"}>
                                    {
                                        description ? description : "noDescription"
                                    }
                                </Card.Text>
                                <Card.Text key={"links"}>
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
                                    <Button
                                        className='EditButton'
                                        variant="secondary"
                                        size="sm"
                                    >
                                        <Link
                                            className = "editLink"
                                            to={{
                                                pathname:`/b/edit/${id}`,
                                                search:`?id=${id}`,
                                                state:  { activateLink: true, bookId:id}
                                            }}
                                        >
                                            Edit
                                        </Link>
                                    </Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }

    componentDidMount() {
        let search = this.props.history.location.search;
        this.getData(search.replaceAll('?id=', ''));
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        if(prevProps !== this.props) {
            const {book} = this.props
            if(book !== undefined && book !== null) {
                this.setState({
                    id: book.id,
                    authors: book.authors,
                    title: book.title,
                    publishing: book.publishing,
                    description: book.description,
                    image: getBookCover(book),
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

    authorViewLink = () => {
        const {authors, id} = this.state;
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