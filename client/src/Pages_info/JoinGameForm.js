// 1. 홈 화면 : 접속 첫 화면 + 닉네임/입장코드 입력 모달창

import React, { useState } from 'react';
import './JoinGameForm.css';

// import Images
import logo from "../Images/start-logo.png"

const JoinGameForm = () => {

  let [myUserName, setMyUserName] = useState(''); // 사용자 이름
  let [mySessionId, setMySessionId] = useState(''); // 세션 ID

  const joinSession = (e) => {
    e.preventDefault();
    // form 입력 내용을 받아서, 서버로 전송
    // 서버에서는 해당 세션에 참여하는 사용자 목록에 추가
    // 이후에 유저는 방 입장 (WaitingRoom.js로 라우트)
  }
  
  const handleChangeUserName = (e) => {
    // 사용자 이름 입력란에 입력된 내용을 state에 저장
  }
  
  const handleChangeSessionId = (e) => {
    // 세션 ID 입력란에 입력된 내용을 state에 저장
  }

  return (
    <div className = "wrapper">
      {/* 접속 시, 첫 화면 */}
      <div className="container-main">
        <div className="container-main-left">
            <h1 className="game-title">Squid Canvas</h1>
            <img className="logo" width="200" height="100"
              src={logo} 
              alt=""/>
        </div>
        <div className="start-button">
          <button className="neon-button">START</button>
        </div>
      </div>
      
      {/* 버튼 클릭하면, 닉네임/입장코드 입력 모달창 뜸 */}
      {/* <div className="container-modal-bg">
        <div className="container-modal">

          <div>
            <form className="join-form" onSubmit={joinSession}>
              <p>
                <input
                  type="text"
                  id="userName"
                  placeholder='닉네임'
                  value={myUserName}
                  onChange={handleChangeUserName}
                  required
                />
              </p>
              <p>
                <input
                  type="text"
                  id="sessionId"
                  placeholder='입장 코드'
                  value={mySessionId}
                  onChange={handleChangeSessionId}
                  required
                />
              </p>
              <button>Join</button>
            </form>
          </div>

        </div>
      </div> */}
      
      {/* <script>
        $('.neon-button').on('click', function(){
          $('.container-modal-bg').addClass('show-modal')
        });
      </script> */}


    </div>
  );
}

export default JoinGameForm;