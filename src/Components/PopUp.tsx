import React from "react";
import Modal from "react-bootstrap/Modal";

interface Props {
    showPopUp: boolean;
    history?: any;
    id?: string;
}

interface State {
    showPopUp: boolean;
}

export default class PopUp extends React.Component<Props,State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            showPopUp: false,
        };
    }

    hide = (e:any)  => {
        e.preventDefault();
        this.setState({
            showPopUp:false,
        });
        const {history,id} = this.props;
        if(history !== undefined && history !== null) {
            if(id !== undefined && id !== null) {
                history.push({
                    pathname: `/b/${id}`,
                    search: `?id=${id}`,
                    state: {showPopUp: false}
                })
            }
            else
                history.push({
                    pathname: `/`,
                    search: "",
                    state: {showPopUp: false}
                })
        }
    }

    render() {
        const {showPopUp} = this.props;
        return (
            <>
                <Modal
                    show={showPopUp}
                    onHide={showPopUp?false:true}
                    dialogClassName="modal-90w"
                    aria-labelledby="custom-modal-styling-title"
                >
                    <Modal.Header closeButton onClick={this.hide}>
                        <Modal.Title id="custom-modal-styling-title">
                            Saved Successfully
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                        </p>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}