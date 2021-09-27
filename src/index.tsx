import React from 'react'
import ReactDOM from 'react-dom'

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import {Router, Route} from "react-router-dom";

import {createBrowserHistory} from 'history'
import RouteBook from "./Routes/RouteBook";

const history = createBrowserHistory()

ReactDOM.render(
    <Router history={history} >
        <Route path = "/" component = {App}/>
    </Router>,
    document.getElementById('root')
);
