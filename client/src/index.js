import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // BrowserRouter로 App.js에서 컴포넌트별로 렌더링 할 것
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter> 
            <App />
        </BrowserRouter>
    </React.StrictMode>,    
    document.getElementById('root')
);
registerServiceWorker();
