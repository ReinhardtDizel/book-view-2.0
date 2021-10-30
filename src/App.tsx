import * as React from "react";
import {Link, Route, Switch} from "react-router-dom";

import {Book} from "./Models/Book";

import {Col, Container, Row, Button} from "react-bootstrap";
import RouteBook from "./Routes/BookRoute"
import {deleteBook, getBookById, getBooks, postBook, putBook, userLoginRole} from "./Api/Api";
import BooksTable from "./Components/Book/BooksTable";
import Registration from "./Components/Registration/Registration";

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
    render() {
        const {
            book,
            books,
        } = this.state;
        return (
                <Switch>
                    <Container className="AppContainer">
                        <Row className="AppHeadRow">
                            <Col className="AdminTools">
                                {
                                    this.adminTools()
                                }
                            </Col>
                            <Col className="UserTools">
                                {
                                    this.userTools()
                                }
                            </Col>
                        </Row>
                        <Row className="AppBooksRow">
                            <Route exact={true} path="/"
                                   render={ () => (
                                        <Col className="AppBooksTable" xs={6}>
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
                            <Route exact={true} path="/registration"
                                   render={ () => (
                                       <Registration
                                           history={this.props.history}
                                           location={this.props.location}
                                       >
                                       </Registration>
                                   )}/>
                        </Row>
                    </Container>
                </Switch>
        )
    }

    componentDidMount() {
        this.updateBooks();
    }

    adminTools = () => {
        if (userLoginRole() === "admin") {
            return (
                <Button
                    className='AdminAddBook'
                    size="sm"
                    variant="Secondary"
                >
                    <Link
                        to={{
                            pathname: `/b/edit/new`,
                            state: {activateLink: true, bookId: undefined},
                            hash: 'addBook',
                        }}
                        className="addLink"
                    >
                        add new Book
                    </Link>
                </Button>
            )
        }
    }

    userTools = () => {
        return (
            <Button
                style={{float: 'right'}}
                className='RegistrationButton'
                size="sm"
                variant="Secondary"
            >
                <Link
                    to={{
                        pathname: `/registration`
                    }}
                    className="addLink"
                >
                    Submit
                </Link>
            </Button>
        )
    }

    setBook = (id:string | undefined) => {
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
                            if (res.status === 200) {
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
                            if (res.status === 200) {
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
                if (res.status === 200) {
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

    getData = (id:string) => {
        this.setBook(id);
    }
}