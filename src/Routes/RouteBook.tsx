import * as React from "react";
import PresentationBook from "../Components/Presentation-book";
import {Route, RouteComponentProps, Switch} from "react-router-dom";
import EditorBook from "../Components/Editor-book";
import {Book} from "../Models/Book";

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



    render() {
        const {
            book,
            handler,
        } = this.props;
        return(

            <Switch>
                <Route exact={true} path="/b/:id">
                    <PresentationBook
                        book={book}
                        handler={handler}
                        history={this.props.history}
                    >
                    </PresentationBook>
                </Route>
                <Route exact={true} path="/b/to-edit/:id" >
                    <EditorBook
                        book={book}
                        handler={handler}
                    >
                    </EditorBook>
                    <Route path="/b/to-save/:id"></Route>
                </Route>
            </Switch>
        )
    }
}