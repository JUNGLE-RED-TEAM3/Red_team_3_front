import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// 테스트 하기
import Game1 from './Game1/Game1';
import Webcam from './Openvidu/Webcam';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
