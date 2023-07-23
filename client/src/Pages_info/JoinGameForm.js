// 1. 홈 화면 : 접속 첫 화면 + 닉네임/입장코드 입력 모달창
import React from 'react';
import useStore from '../store';
import { useNavigate } from 'react-router-dom'; // useHistory 대신 useNavigate를 import

// CSS
import './JoinGameForm.css';

// Images
import logo from "../Images/start-logo.png"
import card from "../Images/main-card.jpeg"

function JoinGameForm(){

  const { mySessionId, myUserName, updateSessionId, updateUserName, 
          session, updateSession
        } = useStore();
  
  const navigate = useNavigate(); // useHistory 대신 useNavigate를 사용
  // WaitingRoom으로 이동하기 위해 useHistory 훅 사용 (history 객체 가져옴)
  // history 객체는 여러 메소드를 통해 라우팅을 변경하거나 조작할 수 있음

  function handleChangeSessionId(e) {
    updateSessionId(e.target.value);
  }

  function handleChangeUserName(e) {
      updateUserName(e.target.value);
  }

  function handleSubmit(e) {
      e.preventDefault();
      // '/WaitingRoom'으로 이동
      // (더 정확히는, 브라우저 URL이 아래와 같이 변경되고, 해당 페이지로 이동)
      updateSession(1);
      navigate('/WaitingRoom');
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
          <button className="neon-button" onClick={(e)=>{$('.container-modal-bg').addClass('show-modal')}}>START</button>
        </div>
      </div>

      {/* 입장 코드, 닉네임 입력 모달창 */}
      <div className='container-modal-bg'>
        <div className='container-modal'>
          <div className="join">
              <div className="img-div">
                  <img src={card} alt="card" />
              </div>
              <div className="join-dialog">
                  <h1> Join Squid Game! </h1>
                  <form className="join-form" onSubmit={handleSubmit}>
                      <p>
                          <label>닉네임 : </label>
                          <input
                              type="text"
                              id="userName"
                              value={myUserName}
                              onChange={handleChangeUserName}
                              required
                          />
                      </p>
                      <p>
                          <label>입장 코드 : </label>
                          <input
                              type="text"
                              id="sessionId"
                              value={mySessionId}
                              onChange={handleChangeSessionId}
                              required
                          />
                      </p>
                      <p>
                        {/* <button onClick={(e)=>{$('.container-modal-bg').removeClass('show-modal')}}>캔슬</button> */}
                        <button>스타뜨</button>
                      </p>                     
                  </form>
              </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// 모달창에서 입력한 Participant, Session 정보는 zustand 상태에 업데이트 됨
// 이후 WaitingRoom.js에서 이 상태를 불러서 사용할 것

export default JoinGameForm;