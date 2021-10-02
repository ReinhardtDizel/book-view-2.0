import * as React from "react";
import {Button, Card, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import {Author} from "../Models/Author";
import {Book} from "../Models/Book";
import EditorAuthor, {AuthorInterface} from "./Editor-author";


const Link = require("react-router-dom").Link;


interface Props {
    save?: () => any;
    book?:Book;
    handler?: (e:any) => any;
}
interface State {
    book?: Book;
    id?:string;
    title?: string;
    authors?: Author[];
    publishing?: Date
    description?: string;
    image?: string;
}


export default class EditorBook extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            book: this.props.book,
            title: '',
            authors: [] as Author[],
            description: '',
            publishing: undefined,
            image: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    authorChange = (author: Author) => {
        const {authors} = this.state;
        console.log(author.name?.firstName);
    }

    handleInputChange = (event: any):void => {
        const { name, value } = event.target;
        if( name == 'title' || 'description' || 'image') {
            this.setState({
                [name]: value,
            } as any);
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

    authorRemove = () => {
        let authors: Author[] | undefined = this.state.authors;
        if(authors != undefined && authors.length > 0) {
            authors.pop();
            this.setState({
                authors: authors,
            });
        }
    }

    authorsCreate = (authors?:Author[]) => {
        return (
            authors!== null && authors !== undefined)
            ? authors.map(
                (author) => {
                    return(
                        <EditorAuthor
                            authorInterface={AuthorInterface.FULL}
                            author={author}
                        />

                    )
                }
            ):null
    }

    componentWillMount() {
        const {book} = this.props;
        if (book !== undefined && book !== null ) {
            this.setState({
                title: book.title,
                authors: book.authors,
                publishing: book.publishing,
                description: book.description,
                image: book.image,
            });
        }
    }

    componentDidMount() {
        const {book} = this.props;
        if (book !== undefined && book !== null ) {
            this.setState({
                title: book.title,
                authors: book.authors,
                publishing: book.publishing,
                description: book.description,
                image: book.image,
            });
        }
    }

    render() {
        const {
            book,
            title,
            publishing,
            description,
            authors,
            image,
        } = this.state;

        return(
            <Row className={'EditorContainer'}>
                <Col  className={'Editor-bookImage'} xl ='auto' sm = 'auto' lg = '3' md = 'auto' xs = 'auto' xxl = 'auto'>
                    <Card.Img variant="top" src={image}>
                    </Card.Img>
                </Col>
                <Col xl ='auto' sm = 'auto' lg = '3' md = 'auto' xs = 'auto' xxl = 'auto'>
                    <Card className={'EditorCard-1'} style={{backgroundColor:"ghostwhite"}}>
                        <Card.Body>
                            <Card.Text key={"Title"}>
                                <InputGroup size="sm" className="mb-0">
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
                                <InputGroup size="sm" className="mb-3">
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
                            <Card.Text key={"Image URL"}>
                                <InputGroup size="sm" className="mb-4">
                                    <InputGroup.Text id="inputGroup-sizing-default">Image</InputGroup.Text>
                                    <FormControl
                                        value={image}
                                        onChange={this.handleInputChange}
                                        name="image"
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                    />
                                </InputGroup>
                            </Card.Text>
                            <Card.Text key={"Description"}>
                                <>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
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
                                        onClick={this.authorRemove}
                                        className='removeAdd'
                                        size="sm"
                                        variant="Light"
                                    >
                                        &nbsp;-&nbsp;
                                    </Button>
                                    <Button variant="secondary" size="sm" disabled>
                                        Author
                                    </Button>
                                    <Button
                                        onClick={this.authorAdd}
                                        className='authorAdd'
                                        size="sm"
                                        variant="Light"
                                    >
                                        +
                                    </Button>
                                </Col>
                            </Card.Text>

                            {this.authorsCreate(authors)}

                        </Card.Body>

                        <Card.Body>
                            <Card.Text key={"Links"}>
                                <Link to={`/`} style={{ textDecoration: 'none' }}>Back</Link>
                            </Card.Text>
                        </Card.Body>

                    </Card>
                </Col>
            </Row>
        )
    }
}