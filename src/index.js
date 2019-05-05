import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import fetch from './request/server'
import {Cookies} from 'react-cookie'

import App from './app.jsx';
import * as serviceWorker from './serviceWorker';

window.fetch = fetch
window.$cookie = Cookies

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
