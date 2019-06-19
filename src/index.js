import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import fetch from './request/server'
import utils from './utils/index'
import {Provider} from 'react-redux'
import configureStore from './redux'

import App from './app.jsx';
import * as serviceWorker from './serviceWorker';

const store = configureStore

window.fetch = fetch
window.$utils = utils


ReactDOM.render(<Provider store={store}><App /></Provider> , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
