import React from 'react';
import './GameHibiscus.css';
import GameTimer from '../Game1/GameTimer';


const GameHibiscus = () => {
    return (
        <div className="#">
            <div className='HibiscusHeader'>
                <h2>SQUID-CANVAS 무궁화 꽃을 칠했습니다</h2>
            </div>
            <button>

            </button>

            <div className='HibiscusFrame'>
                <div className='HibiscusWebcambox'>
                    <img src='http://localhost:8000/video_feed' alt="video_feed" />
                </div>
                <div className='HIbiscusNavbox'>
                    <div className='HibiscusNavTimer'>
                        <GameTimer />
                    </div>
                    <div className='HibiscusNavStartCount'>시작인원 수</div>
                    <div className='HibiscusNavSurviveCount'>생존인원 수</div>
                </div>
            </div>
        </div>)
}

export default GameHibiscus;