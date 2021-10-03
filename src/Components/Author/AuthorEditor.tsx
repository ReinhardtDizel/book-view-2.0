import * as React from "react";
import {Author} from "../../Models/Author";
import {Card, Col, FormControl, InputGroup, Row, Button} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ISaveButton from "../SaveButton";
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
    }

    saveAuthor = (e:any):any => {
        e.preventDefault();
        const {history} = this.props;
        const {bookId, fullName, firstName, middleName, shortName, lastName, id, bio} = this.state;
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
            search: `?id=${bookId}`,
            state: {
                activateLink: true,
                author: author
            }
        })
    }


    componentWillMount() {
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
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: error };
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
            const {firstName, lastName} = this.state;
            if(firstName !== undefined && lastName !== undefined) {
                if (firstName?.length >= 3 && lastName?.length >= 3) {
                    const fullName = firstName + " " + lastName;
                    this.setState({
                        fullName: fullName,
                    });
                }
            }
        }
    }
    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        if(prevState != this.state) {
        }
    }

    nameCreate = () => {
        const {firstName, middleName, shortName, lastName} = this.state;
        const fontSize = 11;
            return (
                    <Card style={{backgroundColor:"lightsteelblue"}} >
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
                        as="textarea" rows={5}
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

    render() {
        const {bookId} = this.state;
        return (
            <Col xl ='auto' sm = 'auto' lg = '3' md = 'auto' xs = 'auto' xxl = 'auto'>
                <Card className={'EditorCard-1'}  style={{backgroundColor:"lightgray"}}>
                    <Card.Body>
                        <Form.Group>
                            {this.authorCreate()}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            {this.showBio()}
                        </Form.Group>
                        <Button variant="link"
                                className='BackButton'
                                size="sm"
                        >
                            <Link

                                to={{
                                    pathname:`/b/edit/${bookId}`,
                                    search:`?id=${bookId}`,
                                    state:  { activateLink: true }
                                }}
                                style={{ textDecoration: 'none' }}
                            >
                                Back
                            </Link>
                        </Button>
                        <Button variant="link"
                                className='SaveButton'
                                size="sm"
                        >
                            <Link
                                onClick={this.saveAuthor}
                                to = {this.props}
                                style={{ textDecoration: 'none' }}
                            >
                                Save
                            </Link>
                        </Button>

                    </Card.Body>

                </Card>

            </Col>
        );
    }
}