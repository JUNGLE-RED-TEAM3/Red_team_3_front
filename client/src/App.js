import React, { Component, useState, useRef, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom'; 

// react-bootstrap
import { Button } from "react-bootstrap";

// zustand
import useStore from './store';

// openvidu 
import { OpenVidu } from "openvidu-browser";
import UserVideoComponent from "./Openvidu/UserVideoComponent";

// page_info → ★ 추후 디렉토리 구조 정리 필요!
// import JoinGameForm from './Pages_info/JoinGameForm';
// import WaitingRoom from './Pages_info/WaitingRoom';
// import GameBoard from './Pages_info/GameBoard';
// import ResultScreen from './Pages_info/ResultScreen';

// Game1,2,3 → ★ 추후 디렉토리 구조 정리 필요!
// import GameDalgona from './Game1/GameDalgona';
// import GameHibiscus from './Game2/GameHibiscus';

// 1. JoinGameForm.js - Images
import logo from "./Images/start-logo.png";
import card from "./Images/main-card.jpeg";

// 2. WaitingRoom.js
import WaitingRoom from "./Pages_info/WaitingRoom";

// Game 1,2,(3)
import GameDalgona from './Game1/GameDalgona';
import GameHibiscus from './Game2/GameHibiscus';

// ★ url 주소 건드리지 않기!
const APPLICATION_SERVER_URL = 'https://mysquidcanvas.shop/';

class App extends Component {

  // useEffect(() => {
  //     fetch("/").then(
  //       // response 객체의 json() 이용하여 json 데이터를 객체로 변화
  //       res => res.json()
  //     )
  //   },[])

  constructor(props) {
    super(props);

    let currentTime = new Date().getTime();

    this.state = {
      mySessionId: "Session" + Math.floor(Math.random() * 100),
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      session: undefined,
      publisher: undefined,
      subscribers: [],
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
  }

  componentDidMount() { 
    window.addEventListener("beforeunload", this.onbeforeunload);
    const url = new URL(window.location.href);
    const sessionId = url.searchParams.get("sessionId");
    if (sessionId) {
      this.setState({
        myUserName: "Participant" + new Date().getTime(),
        mySessionId: sessionId,
      });
      this.joinSession();
    }
  }

  componentDidUpdate() {
      // ★ 게임 기능 참고해서 채워넣기
      if (this.state.session !== undefined) {

        // 1) 타이머 시작

        // 2) 게임1 (GameDalgona)
        this.state.session.on("signal:game1", (event) => {
          useStore.getState().set_cur_round(0);
          this.forceUpdate();
        });

        // 3) 게임2 (GameHibiscus)
        this.state.session.on("signal:game2", (event) => {
          useStore.getState().set_cur_round(1);
          this.forceUpdate();
        });

      }
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
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
    this.OV = new OpenVidu();
    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;
        useStore.getState().set_session_change(this.state.session);
        mySession.on("streamCreated", (event) => {
          var subscriber = mySession.subscribe(event.stream, undefined); 
          var subscribers = this.state.subscribers; 

          const addSubscriber = (subscriber, subscribers) => {
            subscribers.push(subscriber); 
            useStore.getState().setGamers({
              name: JSON.parse(event.stream.connection.data).clientData,
              streamManager: subscriber,
            });
            return subscribers;
          };

          this.setState({
            subscribers: addSubscriber(subscriber, subscribers),
          });
        });

        mySession.on("streamDestroyed", (event) => {
          var subscribers = this.state.subscribers;
          const deleteSubscriber = (streamManager, subscribers) => {
            let index = subscribers.indexOf(streamManager, 0);
            useStore
              .getState()
              .deleteGamer(JSON.parse(event.stream.connection.data).clientData);
            useStore
              .getState()
              .set_player_count(useStore.getState().gamers.length);
            if (index > -1) {
              subscribers.splice(index, 1);
              return subscribers;
            }
          };

          this.setState({
            subscribers: deleteSubscriber(
              event.stream.streamManager,
              this.state.subscribers
            ),
          });
        });

        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        this.getToken().then((token) => {
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {

              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, 
                videoSource: undefined,
                publishAudio: true, 
                publishVideo: true, 
                resolution: "640x480", 
                frameRate: 30,
                insertMode: "APPEND", 
                mirror: false,
              });
              mySession.publish(publisher);

              useStore.getState().setGamers({
                name: this.state.myUserName,
                streamManager: publisher,
              });

              useStore.getState().set_myUserID(this.state.myUserName);
              this.setState({
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  }

  leaveSession() {
    const mySession = this.state.session;
    if (mySession) {
      mySession.disconnect();
    }
    useStore.getState().clearGamer();

    this.OV = null;
    this.setState({
      mySessionId: "Session" + Math.floor(Math.random() * 100),
      myUserName: "Participant",
      session: undefined,
      publisher: undefined,
      subscribers: [],
    });
    location.replace("https://mysquidcanvas.shop/");
  }

  render(){
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;

    return (
      <>
        {this.state.session === undefined ? (
          // step1 : undefined (시작 화면, 모달창) => JoinGameForm.js
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
                          <form className="join-form" onSubmit={this.joinSession}>
                              <p>
                                  <label>닉네임 : </label>
                                  <input
                                      type="text"
                                      id="userName"
                                      value={myUserName}
                                      onChange={this.handleChangeUserName}
                                      required
                                  />
                              </p>
                              <p>
                                  <label>입장 코드 : </label>
                                  <input
                                      type="text"
                                      id="sessionId"
                                      value={mySessionId}
                                      onChange={this.handleChangeSessionId}
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
        ) : (
          // step2 : 대기방 => WaitingRoom.js
          <>
          {useStore.getState().cur_round === -1 ? (
              <div className="main_wait_room">
                <div className="container_main_wait_room">
                  <div className="btn_div">
                    <Button
                      className="exit_button"
                      onClick={this.leaveSession}
                      value="Exit"
                    >
                      Exit
                    </Button>
                    <Button
                      type="submit"
                      className="gameStart_button"
                      // onClick={() => this.sendTimer()} -> ★ 우리 타이머에 맞추기!
                      onClick={() => {
                          this.state.session.signal({
                              type: "game1",
                            });
                      }}
                    >
                      Start
                    </Button>
                  </div>
                  <WaitingRoom />
                </div>
              </div>
            ): useStore.getState().cur_round === 0 ? (
              <div className="Game_Board">
                <Button
                      type="submit"
                      className="gameStart_button"
                      onClick={() => {
                          this.state.session.signal({
                              type: "game2",
                            });
                      }}
                    >
                      다음 게임
                </Button>
                {/* <Card_Game_Boad
                  sessionId={this.state.mySessionId}
                  participantName={this.state.myUserName}
                /> */}
                <GameDalgona />
              </div>
            ) : (
              <div className="Game_Board">
                <GameHibiscus />
              </div>
            )
          }
          </>
    // return 끝
  )}
  </>
  // render 끝
    )
{/* class 끝 */}
}

/**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
async getToken() {
  const sessionId = await this.createSession(this.state.mySessionId);
  return await this.createToken(sessionId);
}

async createSession(sessionId) {
  const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
      headers: { 'Content-Type': 'application/json', },
  });
  return response.data; // The sessionId
}

async createToken(sessionId) {
  const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
      headers: { 'Content-Type': 'application/json', },
  });
  return response.data; // The token
}
}


export default App;