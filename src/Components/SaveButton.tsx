import React from "react";
import {Button} from "react-bootstrap";

interface State {
}
interface Props {
    saveOnClick?: (e:any) => void;
    saved: boolean;
    isLoading: boolean;
}

class ISaveButton extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.saveButtonHandler = this.saveButtonHandler.bind(this);
    }

    simulateNetworkRequest() {
        return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    saveButtonHandler = (e:any):void => {
        const {saveOnClick} = this.props;
        if (saveOnClick !== undefined && saveOnClick !== null) {
            saveOnClick(true);
        }
    }

    render() {
        const {isLoading} = this.props;
        return (
            <Button
                disabled={isLoading as boolean ? true : false}
                onClick={this.saveButtonHandler}
                className='saveBtn'
                size="sm"
                variant="dark"
            >
                {isLoading ? 'Loading…' : 'Save'}
            </Button>
        )
    }
}

export default ISaveButton;