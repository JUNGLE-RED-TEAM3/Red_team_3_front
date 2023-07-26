import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom'; 

// zustand
import useStore from './store';

// openvidu (임시로 라우팅 함) -> 월요일 데모 이후 지울 것!
import Webcam from './Openvidu/Webcam';

// page_info
import JoinGameForm from './Pages_info/JoinGameForm';
import WaitingRoom from './Pages_info/WaitingRoom';
// import GameBoard from './Pages_info/GameBoard';
// import ResultScreen from './Pages_info/ResultScreen';

// Game1,2,3
import GameDalgona from './Game1/GameDalgona';
import GameHibiscus from './Game2/GameHibiscus';

import './Pages_info/JoinGameForm.css';

// ★ TODO : 서버 url 변경 필요
const APPLICATION_SERVER_URL = 'https://mysquidcanvas.shop/';

function App() {

    useEffect(() => {
        fetch("/").then(
          // response 객체의 json() 이용하여 json 데이터를 객체로 변화
          res => res.json()
        )
      },[])

    return (
        <Routes>
            {/* 월요일 데모 이후 지울 것! */}
            <Route path="/" element={<Webcam />} />
            {/* <Route path="/" element={<JoinGameForm />} />             
            <Route path="/WaitingRoom" element={<WaitingRoom />} />    */}
        
            <Route path="/Game1" element={<GameDalgona />} />         {/* "/Game1" 경로에 GameDalgona 컴포넌트 설정 */}
            <Route path="/Game2" element={<GameHibiscus />} />        {/* "/Game2" 경로에 GameHibiscus 컴포넌트 설정 */}

            {/* <Route path="/gameboard" component={GameBoard} />
            <Route path="/resultscreen" component={ResultScreen} /> */}
        </Routes>
    );

}

export default App;
