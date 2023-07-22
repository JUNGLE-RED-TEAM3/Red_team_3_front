import React from 'react';
import './GameHibiscus.css';

const GameHibiscus = () => {
    return (
        <div className="wrapper">
            <div className='HibiscusHeader'>
                <h1>SQUID-CANVAS 무궁화 꽃을 칠했습니다</h1>
            </div>
            {/* <div className='HibiscusNav'>
                
            </div> */}
            <div className='HibiscusFrame'>
                <div className='HibiscusWebcambox'>
                    <h2>웹캠</h2>
                </div>
                <div className='HIbiscusNavbox'>
                    <div className='HibiscusNavTimer'>타이머</div>
                    <div className='HibiscusNavStartCount'>시작인원 수</div>
                    <div className='HibiscusNavSurviveCount'>생존인원 수</div>
                </div>
            </div>
        </div>)
}

export default GameHibiscus;