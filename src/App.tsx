import * as React from "react";
import {Route, RouteComponentProps, Switch} from "react-router-dom";

import {Author} from "./Models/Author";
import {Book} from "./Models/Book";

import {Col, Container, Row} from "react-bootstrap";
import RouteBook from "./Routes/RouteBook"
import {getBooks} from "./Api/Api";
import BooksTable from "./Components/BooksTable";


export interface Props {
    id?:string;
    title?: string;
    authors?: Author[];
    publishing?: Date;
    imageSource?: string;
}
export interface State {
    id?:string;
    title?: string;
    authors?: Author[];
    publishing?: Date;
    description?: string;
    image?: string;
    books?: Book[] | null;
    isLoading: boolean;
}

export default class App extends React.Component<Props & RouteComponentProps , State> {
    constructor(props: Props & RouteComponentProps) {
        super(props);
        //console.dir(props);
        this.state = {
            id: this.searchLink(),
            title: '',
            authors: [] as Author[],
            publishing: undefined,
            description: '',
            image: '',
            books: [] as Book[],
            isLoading: false,
        };
    }

    findSelectedRow =(event:any): any => {
        let {books}  = this.state;
        let selected: Book | undefined;
        if(books!== undefined && books !== null) {
            selected = books.find(e => e.id === event);
            if (selected !== undefined && selected !== null) {
                return selected;
            }
            else
                return undefined;
        }
        else
            return undefined;
    }

    updateBooks(e:boolean) {
        getBooks().then(res => {
            if (res!== null && res !== undefined) {
                this.setState({
                    books: res.data,
                });

                if(e || this.state.id != undefined){
                    const {id} = this.state;
                    const selected: Book = res.data.find( (r: { id: string | undefined; }) => r.id === id );
                    this.setState({
                        title: selected.title,
                        publishing: selected.publishing,
                        image: selected.image,
                        authors: selected.authors,
                        description: selected.description,
                    });
                }
            }
        } );
    }

    openBookDetailsView = (): void => {
            let search = this.searchLink();
            const selected = this.findSelectedRow(search);
            this.setState({
                title: selected.title,
                publishing: selected.publishing,
                image: selected.image,
                authors: selected.authors,
                description: selected.description,
            });
    }

    searchLink = () => {
        let search = this.props.history.location.search || undefined;
        if(search != undefined && search != null) {
            search = search.replaceAll('?id=', '');
            this.setState({
               id: search,
            });
            return search;
        }
    }

    componentWillMount() {
        if(this.props.history.location.pathname != "/") {
            console.log(this.props.history.location.pathname)
            this.searchLink();
        }
        this.updateBooks(false);

    }

    render() {

        const {
            id,
            books,
            description,
            title,
            publishing,
            authors,
            image,
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
                                                     id={id}
                                                     title={title}
                                                     publishing={publishing}
                                                     authors={authors}
                                                     image={image}
                                                     description={description}
                                                     handler={() => {}}
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