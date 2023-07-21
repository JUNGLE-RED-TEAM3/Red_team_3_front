import React from 'react';
import './App.css';
import axios from 'axios';

// zustand
import useStore from './store';

// // OpenVidu
// import { OpenVidu } from 'openvidu-browser';
// import UserVideoComponent from './UserVideoComponent';

// page_info
import JoinGameForm from './page_info/JoinGameForm';
import WaitingRoom from './page_info/WaitingRoom';
import GameBoard from './page_info/GameBoard';
import ResultScreen from './page_info/ResultScreen';

// ★ TODO : 서버 url 변경 필요
// const APPLICATION_SERVER_URL = "https://seoyoungtest1.shop/"
const APPLICATION_SERVER_URL = 'https://squidcanvas.shop/';

// ★ TODO : 단계별 게임 진행이 가능하도록 수정 필요
function App() {

    return (
        <>
        <h1>게임 참여 전 화면</h1>
        {/* 게임 참여 전 화면 */}
        <JoinGameForm />

        {/* 대기방 입장 - 게임 진행(3가지) - 게임 결과 화면 */}
        <WaitingRoom />
        <GameBoard />
        <ResultScreen />
        </>
    );

}

export default App;
