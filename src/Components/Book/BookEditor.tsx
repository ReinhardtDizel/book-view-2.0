import * as React from "react";
import {Button, Card, Col, FormControl, InputGroup, Container, Row} from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import {Author} from "../../Models/Author";
import {Book} from "../../Models/Book";
import {AuthorInterface} from "../Author/AuthorEditor";
import AuthorView from "../Author/AuthorView";
import {Image} from "../../Models/Image";
import {getBookCover, JPEG_IMAGE_DATA} from "../Image/ImageTools";
import {deleteBook} from "../../Api/Api";


const Link = require("react-router-dom").Link;


interface Props {
    put?: (e:any) => void;
    deleteBook?: (e:any) => void;
    book?:Book;
    handler?: (e:any) => any;
    state?: any;
    history?: any;
}
interface State {
    book?: Book;
    id?:string;
    title?: string;
    authors?: Author[];
    publishing?: Date
    description?: string;
    pic?: Image[];
}


export default class BookEditor extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            book: this.props.book,
            id: this.props?.book?.id,
            title: '',
            authors: [] as Author[],
            description: '',
            publishing: undefined,
            pic: [] as Image[],
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.PutBook = this.PutBook.bind(this);
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        if(prevProps != this.props) {
            const {history,state} = this.props;
            if(history !== undefined) {
                if(history.location !== undefined) {
                    if(history.location.hash !== undefined && history.location.hash !== null && history.location.hash !== "") {
                        if(history.location.hash == "#authorSave") {
                            this.authorChange(state.arrayId);
                        }
                        else if(history.location.hash == "#authorDelete") {
                            this.authorRemove(state.arrayId);
                        }
                        else if(history.location.hash == "#imageSave") {
                            this.imageSave(state.pic);
                        }
                        else if(history.location.hash == "#addBook") {
                            console.log("addBook")
                        }
                    }
                }
            }
        }
    }

    imageSave = (i:Image) => {
        let image: Image[] = [];
        if(i !== undefined && i !== null) {
            image.push(i);
            this.setState({
               pic:image,
            });
        }
    }

    authorChange = (arrayId: number) => {
        const {authors} = this.state;
        const {state} = this.props;
        if(authors !== undefined && arrayId !== null && arrayId !== undefined) {

            if(state.author !== undefined) {
                authors[arrayId].bio = state.author.bio;
                authors.splice(arrayId,1,state.author);
                this.setState({
                    authors: authors,
                });

            }
        }

    }

    handleInputChange = (event: any):void => {
        const { name, value } = event.target;
        if( name == 'title' || 'description') {
            this.setState({
                [name]: value,
            } as any);
        }
    }



    PutBook = (e:any) => {
        e.preventDefault();
        const {put} = this.props;
        const{id, title, description, publishing , authors, pic} = this.state;
        const book: Book = {
            id: id,
            title: title,
            description: description,
            publishing: publishing,
            images: pic,
            authors: authors,
        }
        if(put !== undefined && put !== null){
            if(book !== undefined) {
                put(book);
            }
        }
    }

    deleteBook = (e:any) => {
        e.preventDefault();
        const{id} = this.state;
        const{deleteBook} = this.props;
        if(id !== undefined && id !== null) {
            if(deleteBook !== undefined && deleteBook !== null) {
                deleteBook(id);
            }
        }
    }

    authorAdd = () => {
       let author: Author = {
           id: "",
           name: {
               fullName: '',
               firstName: '',
               middleName: '',
               shortName: '',
               lastName: '',
           },
           bio: "",
       }
       let authors: Author[] | undefined = this.state.authors;
       if(authors != undefined && authors.length <= 10) {
           authors.push(author);
           this.setState({
               authors: authors,
           });
       }
    }

    authorRemove = (id: number) => {
        let authors: Author[] | undefined = this.state.authors;
        if(authors != undefined && authors.length > 0) {
            authors.splice(id,1);
            this.setState({
                authors: authors,
            });
        }
    }

    authorsCreate = () => {
        const {state} = this.props;
        const {authors} = this.state;
        let arrayId = 0;
        return (
            authors!== null && authors !== undefined)
            ? authors.map(
                (author) => {
                    return(
                        <AuthorView authorInterface={AuthorInterface.LIGHT}
                                    author={author}
                                    state={state}
                                    arrayId={arrayId++}
                        />

                    )
                }
            ):null
    }

    componentDidMount() {
        const {book, history} = this.props;
        if (book !== undefined && book !== null ) {
            this.setState({
                title: book.title,
                authors: book.authors,
                publishing: book.publishing,
                description: book.description,
                pic: book.images,
            });
        }
        if(history !== undefined) {
            if(history.location !== undefined) {
                if(history.location.hash !== undefined && history.location.hash !== null && history.location.hash !== "") {
                    if(history.location.hash == "#addBook") {
                        const book: Book = {
                            id: undefined,
                            title: '',
                            description: '',
                            publishing: undefined,
                            images: undefined,
                            authors: undefined,
                        }
                        this.setState({
                            id: "new",
                            book:book,
                            title: '',
                            authors: [] as Author[],
                            description: '',
                            publishing: undefined,
                            pic: [] as Image[],
                        });
                    }
                }
            }
        }
    }

    render() {
        const {
            book,
            title,
            publishing,
            description,
            authors,
        } = this.state;

        let backPath = `/b/${book?.id}`;
        let backSearch = `?id=${book?.id}`;

        if(book?.id == undefined || book?.id == null) {
            backPath = `/`;
            backSearch = '';
        }

        const{activateLink, showPopUp} = this.props.state;
        const base64Image = getBookCover(book);
        return(
            <Container fluid className={'BookEditorContainer'}>
                <Row>
                    <Col  className={'BookEditorImage'}
                          xl ='auto' sm = 'auto' lg = 'auto' md = 'auto' xs = 'auto' xxl = 'auto'
                    >
                        <Link
                            to={{
                            pathname: `/b/edit/image/${book?.id}`,
                            state: {
                                activateLink: false,
                                bookId: book?.id,
                            }
                        }}
                              className="ImageEditorLink"
                        >
                            <Card.Img variant="top" src={`${JPEG_IMAGE_DATA},${base64Image?base64Image:''}`}>
                            </Card.Img>
                        </Link>
                    </Col>
                    <Col  xl ='auto' sm = 'auto' lg = 'auto' md = 'auto' xs = 'auto' xxl = 'auto'
                    >
                        <Card className={'BookEditorCard-1'} style={{backgroundColor:"ghostwhite"}}>
                            <Card.Body>
                                <Card.Text key={"Title"}>
                                    <InputGroup size="sm" className="BookEditor_mb-0">
                                        <InputGroup.Text id="inputGroup-sizing-default">Title</InputGroup.Text>
                                        <FormControl
                                            value={title}
                                            onChange={this.handleInputChange}
                                            name="title"
                                            aria-label="Default"
                                            aria-describedby="inputGroup-sizing-default"
                                        />
                                    </InputGroup>
                                </Card.Text>
                                <Card.Text key={"Publishing Date"}>
                                    <InputGroup size="sm" className="BookEditor_mb-3">
                                        <InputGroup.Text id="inputGroup-sizing-default">Publishing</InputGroup.Text>
                                        <FormControl
                                            value={publishing?.toString()}
                                            onChange={this.handleInputChange}
                                            name="publishing"
                                            aria-label="Default"
                                            aria-describedby="inputGroup-sizing-default"
                                        />
                                    </InputGroup>
                                </Card.Text>
                                <Card.Text key={"Description"}>
                                    <>
                                        <Form.Group className="BookEditor_mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Book Description:</Form.Label>
                                            <Form.Control as="textarea" rows={3}
                                                          defaultValue={description}
                                                          onChange={this.handleInputChange}
                                                          name="description"
                                            />
                                        </Form.Group>
                                    </>
                                </Card.Text>
                                <Card.Text>
                                    <Col>
                                        <Button
                                            onClick={this.authorAdd}
                                            className='BookEditor_authorAdd'
                                            size="sm"
                                            variant="Secondary"
                                        >
                                            add Author
                                        </Button>
                                    </Col>
                                </Card.Text>
                                {this.authorsCreate()}
                            </Card.Body>
                            <Card.Body>
                                <Card.Text key={"Links"}>
                                    <Button variant="secondary"
                                            className='BookEditor_BackButton'
                                            size="sm"
                                            disabled = {activateLink?false:true}
                                    >
                                        <Link key={"backLink"+book?.id}
                                              to={{
                                                  pathname: backPath,
                                                  search: backSearch,
                                              }}
                                              className="backLink"

                                        >
                                            Back
                                        </Link>
                                    </Button>
                                    <Button
                                        style = {{marginLeft: 10}}
                                        variant="secondary"
                                        size="sm"
                                        disabled = {(activateLink && !showPopUp)?false:true}
                                    >
                                        <Link key={"saveLink"+book?.id}
                                              onClick={this.PutBook}
                                              to = {this.props}
                                              className="saveLink"
                                        >
                                            Save
                                        </Link>
                                    </Button>
                                    <Button style={{float: 'right'}}
                                            variant="secondary"
                                            className='DeleteButton'
                                            size="sm"
                                    >
                                        <Link
                                            onClick={this.deleteBook}
                                            to = {this.props}
                                            className = "deleteLink"
                                        >
                                            Delete
                                        </Link>
                                    </Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}