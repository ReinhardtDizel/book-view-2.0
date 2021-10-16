import * as React from "react";
import {Col, Row} from "react-bootstrap";
import BookView from "../Components/Book/BookView";
import {Route, Switch} from "react-router-dom";
import BookEditor from "../Components/Book/BookEditor";
import {Book} from "../Models/Book";
import AuthorEditor, {AuthorInterface} from "../Components/Author/AuthorEditor";
import AuthorView from "../Components/Author/AuthorView";
import PopUp from "../Components/PopUp";
import ImageEditor from "../Components/Image/ImageEditor";


interface Props {
    history?:any;
    location?:any;
    put?: (e:any) => void;
    deleteBook?: (e:any) => void;
    handler?: (e:any) => void;
    book?: Book;
}
interface State {
}

export default class RouteBook extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
        };
    }

    author = () => {
        const {
            location,
        } = this.props;
        if(location.state) {
            const {author} = location.state as any;
            return author;
        }
    }

    render() {
        const {
            book,
            handler,
            history,
            location,
            deleteBook,
            put,
        } = this.props;
        return(
            <Switch>
                <Route exact={true} path="/b/:id">
                    <BookView
                        book={book}
                        handler={handler}
                        history={history}
                    >
                    </BookView>
                </Route>
                <Route path="/b/author/:id">
                    <AuthorView
                        author={this.author()}
                        state={location.state}
                        authorInterface={AuthorInterface.FULL}
                        arrayId={0}
                    >
                        Tra
                    </AuthorView>
                </Route>
                <Row>
                    <Route path="/b/edit/">
                        <Col>
                            <Route path="/b/edit/:id" >
                            <BookEditor
                                book={book}
                                deleteBook={deleteBook}
                                put={put}
                                handler={handler}
                                state={location.state}
                                history={history}
                            >
                            </BookEditor>
                            </Route>
                        </Col>
                        <Col>
                            <Route path="/b/edit/author/:fullName">
                                <AuthorEditor authorInterface={AuthorInterface.FULL}
                                              state={location.state}
                                              history={history}
                                />
                            </Route>
                            <Route path="/b/edit/image/:id">
                                <ImageEditor state={location.state}
                                             history={history}
                                />
                            </Route>
                        </Col>
                            <Route path="/b/edit/save/:id">
                                <PopUp
                                    id={book?.id}
                                    history={history}
                                    showPopUp={location.state as any}
                                >
                                </PopUp>
                            </Route>
                    </Route>
                </Row>
            </Switch>
        )
    }
}