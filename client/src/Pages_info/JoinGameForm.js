// 1. 홈 화면 : 접속 첫 화면 + 닉네임/입장코드 입력 모달창
import React, { useState, Component } from 'react';
import './JoinGameForm.css';

// import Images
import logo from "../Images/start-logo.png"

class JoinGameForm extends Component {

  constructor(props) {
    super(props);

    // These properties are in the state's component in order to re-render the HTML whenever their values change
    this.state = {
        mySessionId: 'SessionA',
        myUserName: 'Participant' + Math.floor(Math.random() * 100),
        session: undefined,
        mainStreamManager: undefined,  // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
        publisher: undefined,
        subscribers: [],
    };

    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
  }

  handleChangeSessionId(e) {
      this.setState({
          mySessionId: e.target.value,
      });
  }

  handleChangeUserName(e) {
      this.setState({
          myUserName: e.target.value,
      });
  }


  joinSession() {
      // JOIN 버튼 눌렀을 때, 실행되는 함수로
      // WaitingRoom으로 이동하게 해야 함
      
  }

  render() {
      const mySessionId = this.state.mySessionId;
      const myUserName = this.state.myUserName;


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
          <div className="container-modal-bg">
            <div className="container-modal">
                    <div id="join">
                        <div id="join-dialog" className="jumbotron vertical-center">
                            <h1> Join Game </h1>
                            <form className="join-form" onSubmit={this.joinSession}>
                                <p>
                                    <label> 닉네임 : </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="userName"
                                        value={myUserName}
                                        onChange={this.handleChangeUserName}
                                        required
                                    />
                                </p>
                                <p>
                                    <label> 입장 코드 : </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="sessionId"
                                        value={mySessionId}
                                        onChange={this.handleChangeSessionId}
                                        required
                                    />
                                </p>
                                <p className="text-center">
                                  <button onClick={(e)=>{$('.container-modal-bg').removeClass('show-modal')}}>CANCEL</button>
                                  <button>시작하기</button>
                                </p>
                            </form>
                        </div>
                    </div>
            </div>
          </div>

        </div>
      );
    }
}

// 저기서 JOIN 누르면 -> WaitingRoom으로 이동



export default JoinGameForm;