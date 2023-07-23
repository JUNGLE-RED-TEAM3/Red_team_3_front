import React from 'react';
import './GameDalgona.css';


const GameDalgona = () => {
    return( 
    <div className="tt">
        <div className='DalgonaHeader'>
            <h1>SQUID-CANVAS 달고나 게임</h1>
        </div>
        <div className='DalgonaNav'>
            <div className='DalgonaNavTimer'>타이머</div>
            <div className='DalgonaNavStartCount'>시작인원 수</div>
            <div className='DalgonaNavSurviveCount'>생존인원 수</div>
        </div>
        <div className="DalgonaFrame">
            <div className='DalgonaBox'>
                <h2>달고나 이미지화면</h2>
            </div>
            <div className='WebcamBox'>
                <h2>웹캠</h2>
            </div>
        </div>
    </div>)
}

export default GameDalgona;
