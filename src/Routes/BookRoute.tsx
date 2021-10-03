import * as React from "react";
import {Card, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import BookView from "../Components/Book/BookView";
import {Route, RouteComponentProps, Switch} from "react-router-dom";
import BookEditor from "../Components/Book/BookEditor";
import {Book} from "../Models/Book";
import AuthorEditor, {AuthorInterface} from "../Components/Author/AuthorEditor";

const Link = require("react-router-dom").Link;

interface Props {
    save?: () => any;
    handler?: (e:any) => void;
    book?: Book;
}
interface State {
}


export default class RouteBook extends React.Component<Props & RouteComponentProps, State>{
    constructor(props: Props & RouteComponentProps) {
        super(props);
        this.state = {
        };
    }

    getState = ():any => {
        const {state} = this.props.location;
        if(state) {
            return state as any;
        }
    }

    render() {
        const {
            book,
            handler,
            history,
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

                <Row>
                    <Route path="/b/edit/">
                        <Col>
                            <Route path="/b/edit/:id" >
                            <BookEditor
                                book={book}
                                handler={handler}
                                state={this.props.location.state}
                            >
                            </BookEditor>
                            </Route>
                        </Col>
                        <Col>
                            <Route path="/b/edit/author/:fullName">
                                <AuthorEditor authorInterface={AuthorInterface.FULL}
                                              state={this.props.location.state}
                                              history={history}
                                />
                            </Route>
                        </Col>
                            <Route path="/b/edit/save/:id"></Route>
                    </Route>
                </Row>

            </Switch>
        )
    }
}