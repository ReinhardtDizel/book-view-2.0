import * as React from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import Form from 'react-bootstrap/Form'

import {Link} from "react-router-dom";
import {Image} from "../../Models/Image";
import {base64ToArray, JPEG_IMAGE_DATA, JPEG_NO_IMAGE} from "../../Tools/ImageTools";

const enum ImageNames {
    COVER = 'COVER',
    BACK_COVER = 'BACK_COVER',
    OTHER = 'OTHER'
}
const ImageName = [
    ImageNames.COVER,
    ImageNames.BACK_COVER,
    ImageNames.OTHER
]

interface Props {
    state?: any;
    history?: any;
}

interface State {
    pic: string;
    cover?: boolean;
    name?: string;
}

export default class ImageEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            pic: '',
            cover: false,
            name: '',
        };
        this.saveImage = this.saveImage.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.selectName = this.selectName.bind(this);
    }
    render() {
        const{bookId} = this.props.state;
        const{pic} = this.state;
        return (
            <>
                <Card className={'EditorCard-1'}  style={{backgroundColor:"lightgray"}} >
                    <Card.Body>
                        <Row>
                            <Card.Text>
                                <Card.Img className={"BookCover"} variant="top"
                                          src={`${pic?pic:JPEG_IMAGE_DATA + ','+ JPEG_NO_IMAGE}`}
                                />
                            </Card.Text>
                            <Card.Text>
                                <Form.Group className="mb-3" controlId="formFile">
                                    <Form.Label></Form.Label>
                                    <Form.Control type="file" onChange = {this.fromFile}/>
                                </Form.Group>
                            </Card.Text>
                            <Card.Text>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Select onChange = {this.selectName}>
                                        <option value={ImageName[0]}>{ImageName[0]}</option>
                                        <option value={ImageName[1]}>{ImageName[1]}</option>
                                        <option value={ImageName[2]}>{ImageName[2]}</option>
                                    </Form.Select>
                                </Form.Group>
                            </Card.Text>
                        </Row>
                        <Card.Text className = "buttonCard">
                            <Button variant="secondary"
                                    className='BackButton'
                                    size="sm"
                            >
                                <Link
                                    to={{
                                        pathname:`/b/edit/${bookId}`,
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
                                    className = "saveLink"
                                    onClick={this.saveImage}
                                    to = {this.props}
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
                                    className = "deleteLink"
                                    onClick={this.deleteImage}
                                    to = {this.props}
                                >
                                    Delete
                                </Link>
                            </Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>

        )
    }

    saveImage = (e:any) => {
        e.preventDefault();
        const {history, state} = this.props;
        const {pic, cover, name} = this.state;
        if(pic !== undefined && pic !== null && name !== undefined && name !== null) {
            const base64 = base64ToArray(pic);
            const image: Image = {
                cover: cover,
                name:  name,
                pic: base64,
            }
            history.push({
                pathname: `/b/edit/${state.bookId}`,
                hash: "#imageSave",
                state: {
                    activateLink: true,
                    pic: image,
                }
            })
        }
    }

    deleteImage = (e:any) => {
        e.preventDefault();
    }

    fromFile = (e:any) => {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            if(reader.result !== undefined && reader.result !== null) {
                this.setState({
                    pic: reader.result.toString(),
                });
            }
        }
        reader.readAsDataURL(file);
    }

    selectName = (e:any) => {
        const name = e.target.value;
        if(name !== undefined && name !== null) {
            this.setState({
                name: name,
            });
        }
        if( name == ImageName[0]) {
            this.setState({
                cover: true,
            });
        }
    }
}