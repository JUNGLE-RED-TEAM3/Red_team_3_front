import React from 'react';
import './App.css';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom'; 

// zustand
import useStore from './store';

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
const APPLICATION_SERVER_URL = 'https://demos.openvidu.io/';

function App() {

    return (
        <Routes>
            <Route path="/" element={<JoinGameForm />} />             {/* "/" 경로에 JoinGameForm 컴포넌트 설정 */}
            <Route path="/WaitingRoom" element={<WaitingRoom />} />   {/* "/WaitingRoom" 경로에 WaitingRoom 컴포넌트 설정 */}
            <Route path="/Game1" element={<GameDalgona />} />         {/* "/Game1" 경로에 GameDalgona 컴포넌트 설정 */}
            <Route path="/Game2" element={<GameHibiscus />} />        {/* "/Game2" 경로에 GameHibiscus 컴포넌트 설정 */}

            {/* <Route path="/gameboard" component={GameBoard} />
            <Route path="/resultscreen" component={ResultScreen} /> */}
        </Routes>
    );

}

export default App;
