import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'

ReactDOM.render( // We use this wrapper format to have App render on top of the background element.
    <div className='wrapper'>
        <div className='bottom-layer'>
            <div className='background'/>
        </div>
        <div className='top-layer'>
            <App/>
        </div>
    </div>
    , document.getElementById('root')
);