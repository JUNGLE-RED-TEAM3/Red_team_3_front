import React from 'react';
import './App.css';
import axios from 'axios';

// zustand
import useStore from './store';

// // OpenVidu
// import { OpenVidu } from 'openvidu-browser';
// import UserVideoComponent from './UserVideoComponent';

// page_info
import JoinGameForm from './Pages_info/JoinGameForm';
import WaitingRoom from './Pages_info/WaitingRoom';
import GameBoard from './Pages_info/GameBoard';
import ResultScreen from './Pages_info/ResultScreen';

import './Pages_info/JoinGameForm.css';

// ★ TODO : 서버 url 변경 필요
// const APPLICATION_SERVER_URL = "https://seoyoungtest1.shop/"
const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';

// ★ TODO : 단계별 게임 진행이 가능하도록 수정 필요
function App() {

    return (
        <>
        {/* 게임 참여 전 화면 */}
        <JoinGameForm />
        
        {/* 대기방 입장 - 게임 진행(3가지) - 게임 결과 화면 */}
        {/* <WaitingRoom />
        <GameBoard />
        <ResultScreen /> */}
        </>
    );

}

export default App;
