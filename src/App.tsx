import * as React from "react";
import {Route, RouteComponentProps, Switch} from "react-router-dom";

import {Book} from "./Models/Book";

import {Col, Container, Row} from "react-bootstrap";
import RouteBook from "./Routes/BookRoute"
import {getBookById, getBooks} from "./Api/Api";
import BooksTable from "./Components/Book/BooksTable";




export interface Props {
}
export interface State {
    book?: Book;
    books?: Book[];
}

export default class App extends React.Component<Props & RouteComponentProps , State> {
    constructor(props: Props & RouteComponentProps) {
        super(props);
        //console.dir(props);
        this.state = {
            books: [] as Book[],
            book: undefined,
        };
    }

    findSelectedRow =(id:string | undefined): Book | undefined => {
        let {books}  = this.state;
        let selected: Book | undefined;
        if(books!== undefined && books !== null) {
            selected = books.find(e => e.id === id);
            if (selected !== undefined && selected !== null) {
                return selected;
            }
            else
                return undefined;
        }
        else
            return undefined;
    }

    setBook = (ID:string | undefined) => {
        const id: string | undefined = ID;
        if (id !== undefined && id !== null) {
            getBookById(id).then(res => {
                if (res !== null && res !== undefined) {
                    this.setState({
                        book: res.data,
                    });
                }
                else
                    alert("res == null && res == undefined")
            });
        }
    }

    updateBooks = () => {
        getBooks().then(res => {
            if (res!== null && res !== undefined) {
                this.setState({
                    books: res.data,
                });
            }
        });
    }

    openBookDetailsView = (): void => {
        const id:string | undefined = this.searchLink();
        this.setBook(id);
    }

    searchLink = ():string | undefined=> {
        let search = this.props.history.location.search || undefined;
        if(search != undefined && search != null) {
            search = search.replaceAll('?id=', '');
            search = search.replaceAll('to-edit/', '');
            return search as string;
        }
    }

    getData = (id:string) => {
        this.setBook(id);
    }

    componentDidUpdate() {

    }

    componentWillMount() {
        this.updateBooks();

    }

    render() {

        const {
            book,
            books,
        } = this.state;
        return (
                <Switch>
                    <Container fluid={true} className="container">
                        <Row className="headRow">
                            <Col className="headCol1"></Col>
                            <Col className="headCol2"></Col>
                        </Row>
                        <Row className="BooksRow">
                            <Col className="BooksCol1" xs={1}></Col>
                                <Route exact={true} path="/" render={ () => (
                                    <Col className="BooksCol2" xs={6}>
                                        <BooksTable
                                            books={books}
                                            handler={this.openBookDetailsView}
                                        >
                                        </BooksTable>
                                    </Col>
                                )}/>
                            <Route path="/b/:id"
                                             render={ () => (
                                                 <RouteBook
                                                     book={book}
                                                     handler={this.getData}
                                                     history={this.props.history}
                                                     location={this.props.location}
                                                     match={this.props.match}>
                                                 </RouteBook>
                                             )}/>
                            <Col className="BooksCol3"xs={"auto"}>
                            </Col>
                        </Row>
                    </Container>
                </Switch>
        )
    }
}