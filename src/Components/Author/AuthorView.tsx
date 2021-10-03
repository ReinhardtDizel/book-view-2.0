import * as React from "react";
import {Button, Card, Col} from "react-bootstrap";
import {Author} from "../../Models/Author";
import {AuthorInterface} from "./AuthorEditor";

const Link = require("react-router-dom").Link;

interface Props {
    author?: Author;
    authorInterface: AuthorInterface;
    state?: any;
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
            const {state} = this.props;
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
        }
    }

    activateLink = () => {
        const fontSize = 13;
        const {author, activateLink, bookId} = this.state;
        const {fullName} = this.state;
        if(author !== undefined && author !== null && activateLink) {
            return (
                <Button variant="link"
                        className='EditButton'
                        size="sm"
                >
                    <Link key={author.id}
                          to={{
                              pathname: `/b/edit/author/${(fullName)?fullName:"new"}`,
                              state: {author: author, activateLink: false, bookId: bookId}
                          }}
                          style={{textDecoration: 'none'}}
                          className="linkAuthor"
                    >
                        <Card.Text style={{fontSize: fontSize}}>
                            Edit
                        </Card.Text>
                    </Link>
                </Button>

            )
        }
        if(!activateLink) {
            return (
                <Button
                    variant="link"
                    className='EditButton'
                    size="sm"
                    disabled
                >
                    <Card.Text style={{fontSize: fontSize}}>
                        Edit
                    </Card.Text>
                </Button>
            )
        }
    }

    render() {
        const {author,fullName} = this.state;
        if(author !== undefined && author !== null) {
            return (
                <Col className={'PresentationContainer'} style={{backgroundColor:"lightsteelblue"}}>
                    <Col className={'Presentation-AuthorImage'} xl ='auto' sm = 'auto' lg = '3' md = 'auto' xs = 'auto' xxl = 'auto'>
                        <Card.Img  variant="top" >
                        </Card.Img>
                    </Col>
                    <Card.Body>
                        <Col xl ='auto' sm = 'auto' lg = '3' md = 'auto' xs = 'auto' xxl = 'auto'>
                            <Card className={'PresentationCard-1'}>
                                <Card.Body>
                                    <Card.Text >
                                        {fullName}
                                    </Card.Text>


                                    <Card.Text >
                                        {this.activateLink()}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Card.Body>
                </Col>

            )
        }
    }

}