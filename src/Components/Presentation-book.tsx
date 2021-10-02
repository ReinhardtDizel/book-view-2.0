import * as React from "react";
import {Card, Col, Row} from "react-bootstrap";
import {Author} from "../Models/Author";
import {representTime} from "../Functions/representTime";
import {Book} from "../Models/Book";

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


export default class PresentationBook extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            book: undefined,
        };
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        if (this.props.book == undefined) {
            let search = this.props.history.location.search;
            this.getData(search.replaceAll('?id=', ''));
        }
    }

    componentWillMount() {
    }

    getData = (query:any) =>  {
        query = query.replaceAll('/b/', '');
        const {handler} = this.props;
        if(handler !== undefined && handler != null) {
            handler(query);
        }
    }

    authorsShow = (authors?:Author[]) => {
        return (
            authors!== null && authors !== undefined)
            ? authors.map(
                (author) => {
                    return(
                        <td>
                            <Link to={`/`} style={{ textDecoration: 'none' }}>{author.name?.fullName}</Link> &nbsp;&nbsp;
                        </td>
                    )
                }
            ):null
    }

    render() {
        const {
          book,
        } = this.props;
        return(
            <Row className={'PresentationContainer'}>
                <Col className={'Presentation-bookImage'} xl ='auto' sm = 'auto' lg = '3' md = 'auto' xs = 'auto' xxl = 'auto'>
                    <Card.Img variant="top" src={book?.image}>
                    </Card.Img>
                </Col>
                <Col xl ='auto' sm = 'auto' lg = '3' md = 'auto' xs = 'auto' xxl = 'auto'>
                    <Card className={'PresentationCard-1'}>
                        <Card.Body>
                            <Card.Text key={"Title"}>
                                {book?.title}
                            </Card.Text>
                            <Card.Text key={"Author"}>
                                {this.authorsShow(book?.authors)}
                            </Card.Text>
                            <Card.Text key={"Publishing Date"}>
                                {representTime(book?.publishing)}
                            </Card.Text>
                            <Card.Text key={"Description"}>
                                {book?.description}
                            </Card.Text>
                            <Card.Text key={"Image URL"}>
                                {book?.image}
                            </Card.Text>
                            <Card.Text key={"Back"}>
                                <Link to={`/`} style={{ textDecoration: 'none' }}>Back</Link> &nbsp;&nbsp;
                                <Link to={{pathname:`/b/to-edit/${book?.id}`, search:`?id=${book?.id}`}}
                                      style={{ textDecoration: 'none' }}
                                >
                                    Edit
                                </Link>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}