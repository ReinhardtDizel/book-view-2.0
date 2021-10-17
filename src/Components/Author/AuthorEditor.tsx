import * as React from "react";
import {Author} from "../../Models/Author";
import {Button, Card, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";

import {Link} from "react-router-dom";


export const enum AuthorInterface {
    FULL,
    LIGHT
}

interface Props {
    history?: any;
    state?: any
    authorInterface: AuthorInterface;
}

interface State {
    validate: boolean;
    hasError: any;
    author?: Author;
    bookId: string | null;
    arrayId: number | null;
    id?: string;
    bio?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    shortName?: string;
    fullName?: string;
}

export default class AuthorEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            arrayId: null,
            bookId: null,
            validate: false,
            hasError: null,
            author: undefined,
            id: undefined,
            bio: "",
            firstName: "",
            lastName: "",
            middleName: "",
            shortName: "",
            fullName: "",

        }
        this.handleInputNameChange = this.handleInputNameChange.bind(this);
        this.nameCreate = this.nameCreate.bind(this);
        this.saveAuthor = this.saveAuthor.bind(this);
        this.deleteAuthor = this.deleteAuthor.bind(this);
    }
    render() {
        const {bookId} = this.state;
        return (
            <Col xl ='auto' sm = 'auto' lg = '3' md = 'auto' xs = 'auto' xxl = 'auto'>
                <Card className={'AuthorEditorCard-1'}>
                    <Card.Body>
                        <Form.Group>
                            {this.authorCreate()}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            {this.showBio()}
                        </Form.Group>
                        <Button variant="secondary"
                                className='BackButton'
                                size="sm"
                        >
                            <Link
                                to={{
                                    pathname:`/b/edit/${bookId}`,
                                    search:`?id=${bookId}`,
                                    state:  { activateLink: true }
                                }}
                               className = "backLink"
                            >
                                Back
                            </Link>
                        </Button>&nbsp;&nbsp;
                        <Button variant="secondary"
                                className='SaveButton'
                                size="sm"
                        >
                            <Link
                                onClick={this.saveAuthor}
                                to = {this.props}
                                className = "saveLink"
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
                                onClick={this.deleteAuthor}
                                to = {this.props}
                                className = "deleteLink"
                            >
                                Delete
                            </Link>
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        );
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: error };
    }


    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        if(prevState != this.state) {
        }
    }

    componentDidMount() {
        const {state} = this.props;
        if(state.author) {
            try {
                this.setState({
                    author: state.author,
                    id: state.author.id,
                    bio: state.author.bio,
                    firstName: state.author.name?.firstName,
                    lastName: state.author.name?.lastName,
                    middleName: state.author.name?.middleName,
                    shortName: state.author.name?.shortName,
                    fullName: state.author.name?.fullName,
                } as any);
            } catch (error) {
                this.setState({
                    hasError: error,
                });
            }
        }
        if(state.bookId) {
            try {
                this.setState({
                    bookId: state.bookId,
                } as any);
            } catch (error) {
                this.setState({
                    hasError: error,
                });
            }
        }
        if(state.arrayId !== undefined && state.arrayId !== null) {
            try {
                this.setState({
                    arrayId: state.arrayId,
                } as any);
            } catch (error) {
                this.setState({
                    hasError: error,
                });
            }
        }
    }

    saveAuthor = (e:any):any => {
        e.preventDefault();
        const {history, state} = this.props;
        const {firstName, lastName} = this.state;
        let fullName;
        if(firstName !== undefined && lastName !== undefined) {
            if (firstName?.length >= 3 && lastName?.length >= 3) {
                fullName = firstName + " " + lastName;
                this.setState({
                    fullName: fullName,
                });
            }
        }
        const {bookId, middleName, shortName, id, bio, arrayId} = this.state;
        let author: Author = {
            id: id,
            name: {
                fullName: fullName,
                firstName: firstName,
                middleName: middleName,
                shortName: shortName,
                lastName: lastName,
            },
            bio: bio,
        }
        history.push({
            pathname: `/b/edit/${bookId}`,
            hash: "#authorSave",
            state: {
                activateLink: true,
                author: author,
                arrayId: arrayId
            }
        })
    }

    deleteAuthor = (e:any) => {
        e.preventDefault();
        const {history, state} = this.props;
        const {bookId, arrayId} = this.state;
        history.push({
            pathname: `/b/edit/${bookId}`,
            hash: "#authorDelete",
            state: {
                activateLink: true,
                arrayId: arrayId
            }
        })
    }

    handleInputNameChange = (event: any):void => {
        const { name, value } = event.target;
        if (name == 'firstName' || 'middleName' || 'lastName' || 'shortName' || 'bio') {
            try {
                this.setState({
                    [name]: value,
                } as any);
            } catch (error) {
                this.setState({
                    hasError: error,
                });
            }
        }
    }

    nameCreate = () => {
        const {firstName, middleName, shortName, lastName} = this.state;
        const fontSize = 11;
        return (
            <Card style={{backgroundColor:"lightsteelblue"}}>
                <Card.Body>
                    <Form.Label style={{fontSize:fontSize }}>First Name:</Form.Label>
                    <InputGroup hasValidation>
                        <FormControl
                            type="text" required isInvalid={this.nameInValidate(firstName)}
                            placeholder="First Name"
                            value={firstName}
                            onChange={this.handleInputNameChange}
                            name="firstName"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        >
                        </FormControl>
                        <Form.Control.Feedback type="invalid">
                            Please enter a First Name.
                        </Form.Control.Feedback>
                    </InputGroup>
                    <Form.Label style={{fontSize:fontSize }}>Middle Name:</Form.Label>
                    <FormControl
                        placeholder="Middle Name"
                        value={middleName}
                        onChange={this.handleInputNameChange}
                        name="middleName"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                    >
                    </FormControl>
                    <Form.Label style={{fontSize:fontSize }}>Last Name:</Form.Label>
                    <InputGroup hasValidation>
                        <FormControl
                            type="text" required isInvalid={lastName?false:true}
                            placeholder="Last Name"
                            value={lastName}
                            onChange={this.handleInputNameChange}
                            name="lastName"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        >
                        </FormControl>
                        <Form.Control.Feedback type="invalid">
                            Please enter a Last Name.
                        </Form.Control.Feedback>
                    </InputGroup>
                    <Form.Label style={{fontSize:fontSize }}>Short Name:</Form.Label>
                    <FormControl
                        placeholder="Short Name"
                        value={shortName}
                        onChange={this.handleInputNameChange}
                        name="shortName"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                    >
                    </FormControl>

                </Card.Body>
            </Card>
        )
    }

    authorCreate = () => {
        const {author,fullName} = this.state;
        if(author !== undefined && author !== null) {
            return (
                <Card.Text key={author.id}>
                    <InputGroup size="sm" className="mb-1">
                        <Row>
                            <Col xl='auto' sm='auto' lg='3' md='auto' xs='auto' xxl='auto'>
                                <>
                                    <Card style={{backgroundColor:"lightsteelblue"}}>
                                        <Form.Control
                                            type="text"
                                            placeholder={fullName?fullName:"Full Name"}
                                            readOnly />

                                    </Card>
                                </>
                            </Col>
                            <Col xl='auto' sm='auto' lg='3' md='auto' xs='auto' xxl='auto'>
                                {this.nameCreate()}
                            </Col>
                        </Row>
                    </InputGroup>
                </Card.Text>
            )
        }
    }

    bioValidate = (bio: string | undefined):boolean => {
        if(bio) {
            if (bio?.length == 0 || bio?.length > 10)
                return false;
            else
                return true;
        }
        return false;

    }

    nameInValidate = (name: string | undefined):boolean => {
        if(name) {
            if (name?.length > 3 && name.match(/^\s*$/) == null)
                return false;
            else if(name?.length > 30)
                return true;

        }
        return true;
    }

    showBio = () => {
        const fontSize = 13;
        const {authorInterface} = this.props;
        const {bio} = this.state;
        if( authorInterface == AuthorInterface.FULL) {
            return(
                <>
                    <Form.Label style={{fontSize:fontSize }}
                    >
                        About Author:
                    </Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text" required isInvalid={this.bioValidate(bio)}
                            as="textarea" rows={6}
                            defaultValue={bio}
                            onChange={this.handleInputNameChange}
                            name="bio"
                            placeholder={"Information about Author..."}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please entered more Text or nothing!
                        </Form.Control.Feedback>
                    </InputGroup>
                </>
            )
        }
    }
}