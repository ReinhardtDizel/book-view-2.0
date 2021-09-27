import * as React from "react";
import {Author} from "../Models/Author";

const Link = require("react-router-dom").Link;

interface Props {
    title?: string;
    authors?: Author[];
    description?: string;
    publishing?: Date;
    image?: string;
}
interface State {
    title?: string;
    authors?: Author[];
    publishing?: Date;
    description?: string;
    image?: string;
}


export default class PresentationAuthor extends React.Component<Props, State> {
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
    render() {
        return undefined;
    }
}