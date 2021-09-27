import * as React from "react";
import {Card, Col, Row} from "react-bootstrap";
import {Author} from "../Models/Author";
import {representTime} from "../Functions/representTime";

const Link = require("react-router-dom").Link;

interface Props {
    id?:string;
    title?: string;
    authors?: Author[];
    description?: string;
    publishing?: Date;
    image?: string;
}
interface State {
    id?:string;
    title?: string;
    authors?: Author[];
    publishing?: Date;
    description?: string;
    image?: string;
}


export default class PresentationBook extends React.Component<Props, State>{
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
                            <Link to={`/`} style={{ textDecoration: 'none' }}>{author.name?.fullName}</Link> &nbsp;&nbsp;
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
        } = this.props;

        return(
            <Row className={'PresentationContainer'}>
                <Col className={'Presentation-bookImage'} xl ='auto' sm = 'auto' lg = '3' md = 'auto' xs = 'auto' xxl = 'auto'>
                    <Card.Img variant="top" src={image}>
                    </Card.Img>
                    <Card.Body>
                    </Card.Body>
                </Col>
                <Col xl ='auto' sm = 'auto' lg = '3' md = 'auto' xs = 'auto' xxl = 'auto'>
                    <Card className={'PresentationCard-1'}>
                        <Card.Body>
                            <Card.Text key={"Title"}>
                                {title}
                            </Card.Text>
                            <Card.Text key={"Author"}>
                                {this.authorsShow(authors)}
                            </Card.Text>
                            <Card.Text key={"Publishing Date"}>
                                {representTime(publishing)}
                            </Card.Text>
                            <Card.Text key={"Description"}>
                                {description}
                            </Card.Text>
                            <Card.Text key={"Image URL"}>
                                {image}
                            </Card.Text>
                            <Card.Text key={"Back"}>
                                <Link to={`/`} style={{ textDecoration: 'none' }}>Back</Link> &nbsp;&nbsp;
                                <Link to={{pathname:`/b/to-edit/${id}`, search:`?id=${id}`}}
                                      style={{ textDecoration: 'none' }}
                                >
                                    Edit
                                </Link>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}