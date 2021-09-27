import * as React from "react";
import {Card, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import {Author} from "../Models/Author";

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


export default class EditorBook extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            title: '',
            authors: [] as Author[],
            description: '',
            publishing: undefined,
            image: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (event: any):void => {
        const { name, value } = event.target;
        if( name == 'title' || 'author' || 'description' || 'publishing' ||  'image') {
            this.setState({
                [name]: value,
            });
        }
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

    authorCreate = (authors?:Author[]) => {
        return (
            authors!== null && authors !== undefined)
            ? authors.map(
                (author) => {
                    return(
                        <Card.Text key={author.id}>
                            <InputGroup size="sm" className="mb-1">
                                <InputGroup.Text id="inputGroup-sizing-default">{author.name?.lastName}</InputGroup.Text>
                                <FormControl
                                    value={author.name?.fullName}
                                    onChange={this.handleInputChange}
                                    name="author"
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                />
                            </InputGroup>
                        </Card.Text>
                    )
                }
            ):null
    }

    componentWillMount() {
        const value = this.props;
        console.log(value)
        if (value !== undefined && value !== null ) {
            this.setState({
                title: value.title,
                authors: value.authors,
                publishing: value.publishing,
                description: value.description,
                image: value.image,
            });
        }
    }

    componentDidMount() {
        const value = this.props;
        if (value !== undefined && value !== null ) {
            this.setState({
                title: value.title,
                authors: value.authors,
                publishing: value.publishing,
                description: value.description,
                image: value.image,
            });
        }
    }

    render() {
        const {
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
                    <Card className={'EditorCard-1'}>
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
                            <Card.Text key={"publishing"}>
                                {this.authorCreate(authors)}
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
                            <Card.Text key={"Description"}>
                                <InputGroup size="sm" className="mb-4">
                                    <InputGroup.Text id="inputGroup-sizing-default">Description</InputGroup.Text>
                                    <FormControl
                                        value={description}
                                        onChange={this.handleInputChange}
                                        name="description"
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
                            <Card.Text key={"Back"}>
                                <Link to={`/b/:title`} style={{ textDecoration: 'none' }}>Back</Link>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}