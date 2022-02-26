import React from 'react';

import App from './App';
import './index.css'
import './components/Screens/signup.css'

import * as ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom"

ReactDOM.render( // We use this wrapper format to have App render on top of the background element.
    // <div className='wrapper'>
    //     <div className='bottom-layer'>
    //         <div className='background'/>
    //     </div>
    //     <div className='top-layer'>
    //         <App/>
    //     </div>
    // </div>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    
    , document.getElementById('root')
);