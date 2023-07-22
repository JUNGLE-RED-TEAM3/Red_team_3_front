import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// 테스트 하기
import GameDalgona from './Game1/GameDalgona';
import GameHibiscus from './Game2/GameHibiscus';
import WaitingRoom from './Pages_info/WaitingRoom';
import Webcam from './Openvidu/Webcam';

ReactDOM.render(<WaitingRoom />, document.getElementById('root'));
registerServiceWorker();
