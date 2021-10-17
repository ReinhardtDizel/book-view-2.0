import * as React from "react";
import {Button, Card, Col} from "react-bootstrap";
import {Author} from "../../Models/Author";
import {AuthorInterface} from "./AuthorEditor";

const Link = require("react-router-dom").Link;

interface Props {
    author?: Author;
    authorInterface: AuthorInterface;
    state?: any;
    arrayId: number;
}
interface State {
    activateLink: boolean;
    bookId: string | null;
    hasError: any;
    author?: Author;
    id?: string;
    bio?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    shortName?: string;
    fullName?: string;
}


export default class AuthorView extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            bookId: null,
            activateLink: true,
            hasError: null,
            author: this.props.author,
            id: "new",
            bio: "new",
            firstName: "new",
            lastName: "new",
            middleName: "new",
            shortName: "new",
            fullName: "new",
        };
    }
    render() {
        const {
            author,
            fullName,
            bio,
            activateLink,
            bookId,
        } = this.state;
        const {arrayId, authorInterface} = this.props;
        const fontSize = 13;
        if(author !== undefined && author !== null) {
            return (
                <Col className={'PresentationContainer'} style={{backgroundColor:"lightsteelblue"}}>
                    <Col className={'Presentation-AuthorImage'} xl ='auto' sm = 'auto' lg = '3' md = 'auto' xs = 'auto' xxl = 'auto'>
                        <Card.Img  variant="top" >
                        </Card.Img>
                    </Col>
                    <Card.Body>
                        <Col>
                            <Card className={'PresentationCard-1'}>
                                <Card.Body>
                                    <Card.Text >
                                        {fullName}
                                    </Card.Text>
                                    {(authorInterface == AuthorInterface.FULL)?bio:''}
                                    <Card.Text >
                                        {this.interface()}
                                        <Button style = {{marginLeft: 10}}
                                                variant="secondary"
                                                className='EditButton'
                                                size="sm"
                                                disabled={activateLink?false:true}
                                        >
                                            <Link key={author.id}
                                                  to={{
                                                      pathname: `/b/edit/author/${(fullName)?fullName:"new"}`,
                                                      state: {
                                                          author: author,
                                                          activateLink: false,
                                                          bookId: bookId,
                                                          arrayId: arrayId,
                                                      }
                                                  }}
                                                  className="editLink"
                                            >
                                                <Card.Text style={{fontSize: fontSize}}>
                                                    Edit
                                                </Card.Text>
                                            </Link>
                                        </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Card.Body>
                </Col>

            )
        }
    }
    componentWillMount() {
        const {author,state} = this.props;
        if(author) {
            try {
                this.setState({
                    author: author,
                    id: author.id,
                    bio: author.bio,
                    firstName: author.name?.firstName,
                    lastName: author.name?.lastName,
                    middleName: author.name?.middleName,
                    shortName: author.name?.shortName,
                    fullName: author.name?.fullName,
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

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        if(prevProps != this.props) {
            const {state, author} = this.props;
            if (state !== undefined) {
                if (state.activateLink == false) {
                    this.setState({
                        activateLink: false,
                    });
                } else {
                    this.setState({
                        activateLink: true,
                    });
                }
            }
            if(author !== undefined && author !== this.state.author) {
                try {
                    this.setState({
                        author: author,
                        bio: author.bio,
                        firstName: author.name?.firstName,
                        lastName: author.name?.lastName,
                        middleName: author.name?.middleName,
                        shortName: author.name?.shortName,
                        fullName: author.name?.fullName,
                    } as any);
                } catch (error) {
                    this.setState({
                        hasError: error,
                    });
                }
            }
        }
    }

    interface = () => {
        const {authorInterface} = this.props;
        const {bookId} = this.state;
        if(authorInterface == AuthorInterface.FULL)  {
            return (
                <Button variant="secondary"
                        className='BookEditor_BackButton'
                        size="sm"
                >
                    <Link key={"backLink"+bookId}
                          to={{
                              pathname: `/b/${bookId}`,
                              search: `?id=${bookId}`
                          }}
                          className="backLink"

                    >
                        Back
                    </Link>
                </Button>
            )
        }
    }
}