import * as React from "react";
import {Card, Col, Row, Button, Container} from "react-bootstrap";
import {Author} from "../../Models/Author";
import {representTime} from "../../Functions/representTime";
import {Book} from "../../Models/Book";
import {Image} from "../../Models/Image";
import {arrayToBase64, getBookCover, JPEG_IMAGE_DATA} from "../Image/ImageTools";

const Link = require("react-router-dom").Link;

interface Props {
    handler?: (e:any) => void;
    history: any;
    book?: Book;
}
interface State {
    book?: Book;
    image?: string;
}


export default class BookView extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            book: undefined,
        };
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
     /*   if (this.props.book == undefined) {
            let search = this.props.history.location.search;
            this.getData(search.replaceAll('?id=', ''));
        }
      */
    }

    componentWillMount() {
        let search = this.props.history.location.search;
        this.getData(search.replaceAll('?id=', ''));
    }

    getData = (query:any) =>  {
        query = query.replaceAll('/b/', '');
        const {handler} = this.props;
        if(handler !== undefined && handler != null) {
            handler(query);
        }
    }

    authorsShow = () => {
        const {book} = this.props

        return (
            book?.authors!== null && book?.authors !== undefined)
            ? book?.authors.map(
                (author) => {
                    return(
                        <td>
                            <Link
                                to={{
                                    pathname:`/b/author/${author.id}`,
                                    state: {
                                        author: author,
                                        bookId: book?.id,
                                    }
                                }}
                                style = {{textDecoration: 'none'}}
                                className = "authorLink"
                            >
                                {author.name?.fullName}
                            </Link> &nbsp;&nbsp;
                        </td>
                    )
                }
            ):null
    }

    render() {
        const {
          book,
        } = this.props;

        const base64Image = getBookCover(book);
        return(
            <Container fluid className={'bookViewContainer'}>
                <Row>
                    <Col className={'bookViewImage'} xl ='auto' sm = 'auto' lg = 'auto' md = 'auto' xs = 'auto' xxl = 'auto'>
                        <Card.Img variant="top" src={`${JPEG_IMAGE_DATA},${base64Image?base64Image:''}`}/>
                    </Col>
                    <Col>
                        <Card className={'bookViewCard-1'}>
                            <Card.Body>
                                <Card.Text key={"Title"}>
                                    {book?.title}
                                </Card.Text>
                                <Card.Text key={"Author"}>
                                    {this.authorsShow()}
                                </Card.Text>
                                <Card.Text key={"PublishingDate"}>
                                    {representTime(book?.publishing)}
                                </Card.Text>
                                <Card.Text key={"Description"}>
                                    {book?.description}
                                </Card.Text>
                                <Card.Text key={"ImageURL"}>
                                </Card.Text>
                                <Card.Text key={"links"}>
                                    <Button variant="secondary"
                                            className='BackButton'
                                            size="sm"
                                    >
                                        <Link
                                            to={`/`}
                                            className = "backLink"
                                        >
                                            Back
                                        </Link>
                                    </Button>
                                    <Button style = {{marginLeft: 10}}
                                            variant="secondary"
                                            className='EditButton'
                                            size="sm"
                                    >
                                        <Link
                                            to={{
                                                pathname:`/b/edit/${book?.id}`,
                                                search:`?id=${book?.id}`,
                                                state:  { activateLink: true, bookId:book?.id}
                                            }}
                                            className = "editLink"
                                        >
                                            Edit
                                        </Link>
                                    </Button>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                </Row>
            </Container>
        )
    }
}