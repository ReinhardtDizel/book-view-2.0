import * as React from "react";
import {Card, Col, Row, Table} from "react-bootstrap";
import {Author} from "../Models/Author";
import {representTime} from "../Functions/representTime";
import PresentationBook from "../Components/Presentation-book";
import {Route, Switch} from "react-router-dom";
import EditorBook from "../Components/Editor-book";

const Link = require("react-router-dom").Link;

interface Props {
    id?:string;
    title?: string;
    authors?: Author[];
    description?: string;
    publishing?: Date;
    image?: string;
    handler?: () => void;
}
interface State {
    id?:string;
    title?: string;
    authors?: Author[];
    publishing?: Date;
    description?: string;
    image?: string;
}


export default class RouteBook extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            title: '',
            authors: [] as Author[],
            description: '',
            publishing: undefined,
            image: '',
        };
    }

    authorsShow = (authors?:Author[]) => {
        return (
            authors!== null && authors !== undefined)
            ? authors.map(
                (author) => {
                    return(
                        <td>
                            {author.name?.fullName} &nbsp;&nbsp;
                        </td>
                    )
                }
            ):null
    }

    render() {
        const {
            id,
            title,
            publishing,
            description,
            authors,
            image,
            handler
        } = this.props;
        return(

            <Switch>
                <Route exact={true} path="/b/:title">
                    <PresentationBook
                        id={id}
                        title={title}
                        publishing={publishing}
                        authors={authors}
                        description={description}
                        image={image}
                    >
                    </PresentationBook>
                </Route>
                <Route exact={true} path="/b/to-edit/:id">
                    <EditorBook
                        id={id}
                        title={title}
                        publishing={publishing}
                        authors={authors}
                        description={description}
                        image={image}
                        handler={handler}
                    >
                    </EditorBook>
                </Route>
            </Switch>
        )
    }
}