import * as React from "react";
import {Route, Switch} from "react-router-dom";

import {Book} from "./Models/Book";

import {Col, Container, Row} from "react-bootstrap";
import RouteBook from "./Routes/BookRoute"
import {deleteBook, getBookById, getBooks, postBook, putBook} from "./Api/Api";
import BooksTable from "./Components/Book/BooksTable";

export interface Props {
    history?:any;
    location?:any;
}
export interface State {
    book?: Book;
    books?: Book[];
}

export default class App extends React.Component<Props , State> {
    constructor(props: Props) {
        super(props);
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

    PutBook = (e:any) => {
        const {history} = this.props;
        const book = e as any;
        if (history !== undefined && history !== null) {
            if (book !== undefined) {
                if (book.id !== undefined && book.id !== null && book.id !== "new") {
                    putBook(
                        book.id,
                        book
                    ).then(res => {
                        if(res !== undefined && res !== null && res !== "ERROR") {
                            if (res.status == 200) {
                                history.push({
                                    pathname: `/b/edit/save/${book?.id}`,
                                    state: {showPopUp: true}
                                })
                            }
                        }
                    });
                }
                else
                    postBook(
                        book
                    ).then(res => {
                        if(res !== undefined && res !== null && res !== "ERROR") {
                            if (res.status == 200) {
                                history.push({
                                    pathname: `/b/edit/save/:new`,
                                    state: {showPopUp: true}
                                })
                            }
                        }
                    });
            }
        }
    }

    deleteBook = (e:any) => {
        const id = e as any;
        const {history} = this.props;
        deleteBook(
            id
        ).then(res => {
            if(res !== undefined && res !== null && res !== "ERROR") {
                if (res.status == 200) {
                    history.push({
                        pathname: `/`,
                        state: {showPopUp: true}
                    })
                }
            }
        });
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

    componentDidMount() {
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
                                        >
                                        </BooksTable>
                                    </Col>
                                )}/>
                            <Route path="/b/"
                                             render={ () => (
                                                 <RouteBook
                                                     book={book}
                                                     handler={this.getData}
                                                     deleteBook={this.deleteBook}
                                                     put={this.PutBook}
                                                     history={this.props.history}
                                                     location={this.props.location}
                                                     >
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