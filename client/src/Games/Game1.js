// Game 1 : 달고나 게임
import React, { useState, useEffect, useRef } from 'react';
import './Game1.css';

// components
import UserVideoComponent from '../UserVideoComponent';

// store
import { useStore } from '../store';

// sound

export default function Game1({ sessionId, participantName }) {

    const {
        gamers
    } = useStore();

    return (
    <>
    {/* 상단 우측에는 오징어게임 로고 */}
    <div className="logo"/>
    <div className="logo2"/>
    <div className="logo3"/>

    {/* 좌측에는 달고나 (캔버스) */}
    <div className="left-dalgona">

    </div>

    {/* 우측에는 유저 웹캠 화면 */}
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