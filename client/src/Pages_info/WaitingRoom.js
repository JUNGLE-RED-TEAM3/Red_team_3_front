// 2) 대기방 화면 : 대기방 화면을 담당하는 컴포넌트
// 게임 시작 버튼과 초대 생성 기능
import React from 'react';
import './WaitingRoom.css';
import useStore from '../store';
import userVideoComponent from '../Openvidu/UserVideoComponent';


function WaitingRoom() {

    // const { gamers } = useStore();

    // 임시로 만듦 (버릴 거!)
    const gamers = [
        { name: "사용자 1", streamManager: "streamManager1" },
        { name: "사용자 2", streamManager: "streamManager2" },
        { name: "사용자 3", streamManager: "streamManager3" },
        { name: "사용자 4", streamManager: "streamManager4" },
        { name: "사용자 5", streamManager: "streamManager5" },
        { name: "사용자 6", streamManager: "streamManager6" },
    ];

    return (
        <div className="temp">

            <header className="title">
                <h1>Squid Canvas</h1>    
            </header>
                    
            <section className='users'>
                <div className="video_box">
                    {gamers.map((gamer, index) => (
                        <div key={index} className="video_frame1">
                        {gamer && (
                            <div className="video_frame2">
                            {/* <UserVideoComponent
                                streamManager={gamer.streamManager}
                                my_name={gamer.name}
                            /> */}
                            </div>
                        )}
                        </div>
                    ))}
                </div>

             </section>

             <div className="button">
                <button className="start-button">시작</button>
            </div>
            
        </div>
    );
}

export default WaitingRoom;
