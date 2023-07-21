// Game2 : 무궁화 꽃이 칠했습니다 게임
import React, { useState, useEffect, useRef } from 'react';
import './Game2.css';

// components
import UserVideoComponent from '../Openvidu/UserVideoComponent';

// store
import useStore from '../store';

// sound

export default function Game2({ sessionId, participantName }) {

    const {
        gamers
    } = useStore();

    return (
    <>
    {/* 상단 우측에는 오징어게임 로고 */}
    <div className="logo"/>
    <div className="logo2"/>
    <div className="logo3"/>

    {/* 가운데는 유저 웹캠 화면 */}
    <div className="video_box1">
        <div id={0} className="video_frame1">
        {gamers[0] && (
            <div className="video_frame2">
            <UserVideoComponent
                streamManager={{ gamers }.gamers[0].streamManager}
                my_name={{ gamers }.gamers[0].name}
            />
            </div>
        )}
        </div>
    </div>
    </>
    )
}