import * as React from "react";
import {Button, Card, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import {Author} from "../../Models/Author";
import {Book} from "../../Models/Book";
import {AuthorInterface} from "../Author/AuthorEditor";
import AuthorView from "../Author/AuthorView";
import {Image} from "../../Models/Image";
import {arrayToBase64, getBookCover, JPEG_IMAGE_DATA, JPEG_NO_IMAGE} from "../../Tools/ImageTools";


const Link = require("react-router-dom").Link;


interface Props {
    put?: (e:any) => void;
    deleteBook?: (e:any) => void;
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
            book: undefined,
            id: undefined,
            title: '',
            authors: [] as Author[],
            description: '',
            publishing: undefined,
            pic: [] as Image[],
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.PutBook = this.PutBook.bind(this);
    }
    render() {
        const {
            book,
            title,
            publishing,
            description,
            pic,
        } = this.state;

        let backPath = `/b/${book?.id}`;

        if(book?.id === undefined) {
            backPath = `/`;
        }

        const{activateLink, showPopUp} = this.props.state;
        const base64Image = getBookCover(pic);
        return(
            <Card className={'BookEditorCard'} style={{backgroundColor:"ghostwhite"}}>
                <Card.Body>
                    <Link
                        className="ImageEditorLink"
                        to={{
                            pathname: `/b/edit/image/${book?.id}`,
                            state: {
                                activateLink: false,
                                bookId: book?.id,
                            }
                        }}
                    >
                        <Card.Img className={"BookCover"} variant="top" src={`${JPEG_IMAGE_DATA},${base64Image?base64Image:JPEG_NO_IMAGE}`}>
                        </Card.Img>
                    </Link>
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
                                disabled = {!activateLink}
                        >
                            <Link key={"backLink"+book?.id}
                                  to={{
                                      pathname: backPath,
                                      state: {
                                          book: book,
                                      }
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
                            disabled = {(!(activateLink && !showPopUp))}
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
        )
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        if(prevProps !== this.props) {
            const {history,state} = this.props;
            if(history !== undefined) {
                if(history.location !== undefined) {
                    if(history.location.hash !== undefined && history.location.hash !== null && history.location.hash !== "") {
                        if(history.location.hash === "#authorSave") {
                            this.authorChange(state.arrayId);
                        }
                        else if(history.location.hash === "#authorDelete") {
                            this.authorRemove(state.arrayId);
                        }
                        else if(history.location.hash === "#imageSave") {
                            this.imageSave(state.pic);
                        }
                        else if(history.location.hash === "#addBook") {
                            this.addBookChangeState(history);
                        }
                    }
                }
            }
        }
    }

    componentDidMount() {
        const {history, state} = this.props;
        const book = state.book;
        if (book !== undefined && book !== null ) {
            this.setState({
                book: book,
                id: book.id,
                title: book.title,
                authors: book.authors,
                publishing: book.publishing,
                description: book.description,
                pic: book.images,
            });
        }
        this.addBookChangeState(history);
    }

    addBookChangeState = (history:any) => {
        if(history !== undefined) {
            if(history.location !== undefined) {
                if(history.location.hash !== undefined && history.location.hash !== null && history.location.hash !== "") {
                    if(history.location.hash === "#addBook") {
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

    imageSave = (i:Image) => {
        let image: Image[] = [];
        let pic = arrayToBase64(i.pic);
        i.pic = pic;
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
        if( name === 'title' || 'description') {
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
        console.log(id)
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
        if(authors !== undefined && authors.length <= 10) {
            authors.push(author);
            this.setState({
                authors: authors,
            });
        }
    }

    authorRemove = (id: number) => {
        let authors: Author[] | undefined = this.state.authors;
        if(authors !== undefined && authors.length > 0) {
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
                    const author_key:string = author.id?author.id:"noId" + arrayId;
                    return(
                        <AuthorView
                            key={author_key}
                            authorInterface={AuthorInterface.LIGHT}
                            author={author}
                            state={state}
                            arrayId={arrayId++}
                        />

                    )
                }
            ):null
    }
}