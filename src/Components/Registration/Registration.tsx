import * as React from "react";
import {Button, Col, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {postBook, submitUser} from "../../Api/Api";
import {Address} from "../../Models/Address";
import {Role} from "../../Models/Role";
import {User} from "../../Models/User";

interface Props {
    location?: any;
    history?: any;
}
interface State {
    id?: string;
    email?: string;
    username?: string;
    password?: string;
    addressLine1?: string;
    addressLine2?: string;
    country?: string;
    city?: string;
    zip_code?: number;
}

export default class Registration extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            id: "",
            email: "",
            username: "",
            password: "",
            addressLine1: "",
            addressLine2: "",
            country: "",
            city: "",
            zip_code: 0,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }
    render() {

        return (
            <Form className ="Registration-Form">
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridUserName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            name="username"
                            onChange={this.handleInputChange}
                            placeholder="Username"
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            name="password"
                            onChange={this.handleInputChange}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        name="email"
                        onChange={this.handleInputChange}
                        type="email"
                        placeholder="Enter email"
                    />
                </Form.Group>

                <Button
                    onClick={this.submitUser}
                    variant="primary"
                >
                    Submit
                </Button>
            </Form>
        )
    }
    handleInputChange = (event:any) => {
        const { name, value } = event.target;
        if(name === 'email' || 'password' || 'username') {
            this.setState({
                [name]: value,
            } as any);
        }
    }
    submitUser = () => {
        const {email, password, username} = this.state;
        const user: User = {
            email: email,
            username: username,
            password: password,
            roles: [
                {
                    name: "USER_ROLE",
                }
            ]
        }
        submitUser(user).then()
    }
}