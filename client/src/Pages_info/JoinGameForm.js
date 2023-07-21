// 1) 게임 참여 전 화면 : 사용자 이름과 세션 ID 입력 받는 폼 컴포넌트
// 사용자 이름과 세선 ID를 입력 받는 form

import React from 'react';
import './JoinGameForm.css';

const JoinGameForm = (props) => {
    // TODO: Implement form handlers and form submit
    return (
      // codepen 사용
      <div id="container">
        <div className="card-container">
            <img src="https://see.fontimg.com/api/renderfont4/1GMVL/eyJyIjoiZnMiLCJoIjo2NSwidyI6MTAwMCwiZnMiOjY1LCJmZ2MiOiIjRkZGRkZGIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/U3F1aWQgR2FtZSBDYXJk/game-of-squids.png"
            alt="Squid fonts" id="squid-title"/>
            <img width="200" height="100"src="https://www.pngplay.com/wp-content/uploads/13/Squid-Game-Play-Card-Circle-Triangle-Sqaure-PNG.png" alt=""
            id="logo" />
        </div>
        <div className="start-button">
          <a href="#" className="neon-button">START</a>
        </div>

        {/* <div className="container_before_game">
            <div id="join">
              <form className="form-group" onSubmit={this.joinSession}>
                <p>
                  <input
                    className="form-control"
                    className="participant"
                    type="text"
                    id="userName"
                    value={myUserName}
                    onChange={this.handleChangeUserName}
                    required
                  />
                </p>
                <p>
                  <input
                    className="form-control"
                    className="roomname"
                    type="text"
                    id="sessionId"
                    value={mySessionId}
                    onChange={this.handleChangeSessionId}
                    required
                  />
                </p>
                <p className="text-center">
                  <input
                    className="enter_button"
                    name="commit"
                    type="submit"
                    value=""
                  />
                </p>
              </form>
            </div>
          </div>
        </div> */}
      </div>
    );
}

export default JoinGameForm;