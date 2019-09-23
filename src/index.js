import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App/App';
import logo from './images/logo-mpsp.png'
import * as serviceWorker from './serviceWorker';
import { Divider } from 'antd';

ReactDOM.render(
<>
    <header>
    <img style={{width: "18%"}} alt={"picture"} src={logo}/>
    <hr style={{borderColor: '#fff'}} />
    </header> 
    <App />
</>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
