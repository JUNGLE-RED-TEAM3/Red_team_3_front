// 상태 관리 라이브러리로 'zustand' 사용
import {create} from "zustand";
import axios from "axios";

// ★ TODO : 서버 url 변경 필요
const APPLICATION_SERVER_URL ='https://mysquidcanvas.shop/';

const useStore = create((set) => ({
    // 상태와 관련된 변수와 함수들을 정의 : create 함수
    // 상태를 변경하는 함수(상태 갱신 시, 리액티브하게 컴포넌트 업데이트 됨) : set 함수
    
    // 상태 변수들 (+ 상태 변경 함수들 - set 함수로 상태 갱신)
    // gamers: [],
    // myUserID: "none",
    // cur_time: 1000000,
    // time_state: "no_change",
    // cnt_answer: 0,
    
    gamers: [],
    setGamers: (gamer) => {
      set((state) => ({
        gamers: [...state.gamers, gamer],
      }));
    },
    deleteGamer: (name) => {
      set((state) => ({
        gamers: state.gamers.filter((a) => a.name !== name),
      }));
    },
    clearGamer: () => {
      set((state) => ({
        gamers: [],
      }));
    },
    sortGamer: () => {
      set((state) => ({
        gamers: state.gamers.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        }),
      }));
    },
  
    // 생략

}));

export default useStore;