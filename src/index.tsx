import React from 'react'
import ReactDOM from 'react-dom'

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import './index.css'
import {Route, Router} from "react-router-dom";

import {createBrowserHistory} from 'history'


const history = createBrowserHistory()


ReactDOM.render(
    <Router history={history} >
        <Route path = "/"
               render={ () => (
                   <App
                       history={history}
                       location={history.location}
                   />
               )}
        />
    </Router>,
    document.getElementById('root')
);
