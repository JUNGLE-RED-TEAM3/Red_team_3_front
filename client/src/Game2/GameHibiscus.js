import React from 'react';
import './GameHibiscus.css';
import GameTimer from '../Games_Item/GameTimer';
import { VideoCanvas } from '../Games_Item/videoCanvas';

// 지울 것
import { useNavigate } from 'react-router-dom';
import {Button} from 'react-bootstrap';


const GameHibiscus = () => {

    // 지울 것
    const Navigate = useNavigate();

    return (
        <div className="#">
            <div className='HibiscusHeader'>
                <h2>SQUID-CANVAS 무궁화 꽃을 칠했습니다</h2>
            </div>

            <div className='HibiscusFrame'>
                <div className='HibiscusWebcambox'>
                    <VideoCanvas/>
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