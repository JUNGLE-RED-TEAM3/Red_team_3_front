// 1) 게임 참여 전 화면 : 사용자 이름과 세션 ID 입력 받는 폼 컴포넌트
// 사용자 이름과 세선 ID를 입력 받는 form

import React from 'react';

function JoinGameForm(props) {
    // TODO: Implement form handlers and form submit
    return (
        <div className="container_before_game">
            <div id="join">
              <form className="form-group" onSubmit={this.joinSession}>
                <p>
                  <input
                    className="form-control"
                    class="participant"
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
                    class="roomname"
                    type="text"
                    id="sessionId"
                    value={mySessionId}
                    onChange={this.handleChangeSessionId}
                    required
                  />
                </p>
                <p className="text-center">
                  <input
                    class="enter_button"
                    name="commit"
                    type="submit"
                    value=""
                  />
                </p>
              </form>
            </div>
          </div>
    );
}

export default JoinGameForm;