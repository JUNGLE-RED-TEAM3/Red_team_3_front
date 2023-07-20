import React, { useEffect } from "react";
import UserVideoComponent from "../UserVideoComponent";
// import useStore from "../for_game/store";
import "./GamePlay.css";

function GamePlay() {
  const { state, dispatch } = useStore();

  useEffect(() => {
    dispatch({ type: "SET_GAMEPLAY" });
  }, []);

  return (
    <div className="main_screen">
      <div className="main_screen_left">
        <UserVideoComponent
          video={state.userVideo}
          name={state.userName}
          muted="muted"
        />
      </div>
      <div className="main_screen_right">
        <UserVideoComponent
          video={state.partnerVideo}
          name={state.partnerName}
        />
      </div>
    </div>
  );
}