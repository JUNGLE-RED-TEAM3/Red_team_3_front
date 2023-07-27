// 2) 대기방 화면 : 대기방 화면을 담당하는 컴포넌트
// 게임 시작 버튼과 초대 생성 기능
import React, {useEffect} from 'react';
import './WaitingRoom.css';
import useStore from '../store';
import UserVideoComponent from '../Openvidu/UserVideoComponent';

function WaitingRoom() {
    const {
      gamers,
      set_player_count,
      player_count,
      myUserID,
      set_my_index,
      my_index,
      cur_session,
      cur_teller,
      sortGamer,
    } = useStore();
  
    useEffect(() => {
      if (cur_session !== undefined) {
        set_player_count(gamers.length);
      }
      sortGamer();
      
    }, [gamers]);
  
    useEffect(() => {
      if (cur_session !== undefined) {
        for (var i = 0; i < player_count; i++) {
          if (gamers[i]) {
            if (myUserID === { gamers }.gamers[i].name) {
              set_my_index(i);
            }
          }
        }
      }
    }, [player_count]);
  
    useEffect(() => {
      console.log("index");
    }, [my_index]);
  
    useEffect(() => {
      console.log("teller");
    }, [cur_teller]);
  
    return (
      <>
      <div className="#">
          
          <header className="title">
              <h1>Squid Canvas</h1>    
          </header>
                  
              <section className='users'>
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
                <div className="video_box1">
                  <div id={1} className="video_frame1">
                    {gamers[1] && (
                      <div className="video_frame2">
                        <UserVideoComponent
                          streamManager={{ gamers }.gamers[1].streamManager}
                          my_name={{ gamers }.gamers[1].name}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="video_box1">
                  <div id={2} className="video_frame1">
                    {gamers[2] && (
                      <div className="video_frame2">
                        <UserVideoComponent
                          streamManager={{ gamers }.gamers[2].streamManager}
                          my_name={{ gamers }.gamers[2].name}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="video_box1">
                  <div id={3} className="video_frame1">
                    {gamers[3] && (
                      <div className="video_frame2">
                        <UserVideoComponent
                  streamManager={{ gamers }.gamers[3].streamManager}
                  my_name={{ gamers }.gamers[3].name}
                />
              </div>
            )}
          </div>
        </div>
        </section>

      </div>
        
      </>
    );
  }
  export default WaitingRoom;
  