// 상태 관리 라이브러리로 'zustand' 사용
import {create} from "zustand";
import axios from "axios";

const APPLICATION_SERVER_URL = 'https://mysquidcanvas.shop/';

const useStore = create((set) => ({
    // 상태와 관련된 변수와 함수들을 정의 : create 함수
    // 상태를 변경하는 함수(상태 갱신 시, 리액티브하게 컴포넌트 업데이트 됨) : set 함수
    
    // 상태 변수, 함수들
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

  red_gamers: [],
  red_setGamers: (gamer) => {
    set((state) => ({
      red_gamers: [...state.gamers, gamer],
    }));
  },

  red_deleteGamer: (name) => {
    set((state) => ({
      red_gamers: state.gamers.filter((a) => a.name !== name),
    }));
  },
  red_clearGamer: () => {
    set((state) => ({
      red_gamers: [],
    }));
  },

  bluegamers: [],
  bluesetGamers: (gamer) => {
    set((state) => ({
      bluegamers: [...state.gamers, gamer],
    }));
  },

  bluedeleteGamer: (name) => {
    set((state) => ({
      bluegamers: state.gamers.filter((a) => a.name !== name),
    }));
  },
  blueclearGamer: () => {
    set((state) => ({
      bluegamers: [],
    }));
  },

  setPublishAudio: (name, newValue) => {
    set((state) => {
      const gamer = state.gamers.find((x) => x.name === name);
      gamer.streamManager.publishAudio = newValue;
      return { gamers: state.gamers };
    });
  },

  myUserID: "none",
  set_myUserID: (input) => set({ myUserID: input }),
  
  cur_time: 1000000,
  set_Curtime: (input) => set({ cur_time: input }),

  time_state: "no_change",
  set_time_change: (input) => set({ time_state: input }),

  cnt_answer: 0,
  set_CntAns: (input) => set(() => ({ cnt_answer: input })),

  curRed_cnt: 0,
  set_CurRed_cnt: (input) => set(() => ({ curRed_cnt: input })),
  curBlue_cnt: 0,
  set_CurBlue_cnt: (input) => set(() => ({ curBlue_cnt: input })),
  curRed_total: 0,
  set_CurRed_total: (input) => set(() => ({ curRed_total: input })),
  curBlue_total: 0,
  set_CurBlue_total: (input) => set(() => ({ curBlue_total: input })),

  cur_session: undefined,
  set_session_change: (input) => set({ cur_session: input }),

  cur_turn_states: "room",
  set_turn_state_change: (input) => set({ cur_turn_states: input }),

  cur_who_turn: "none",
  set_who_turn: (input) => set({ cur_who_turn: input }),

  cur_round: -1,
  set_cur_round: (input) => set({ cur_round: input }),

  cur_teller: -1,
  set_cur_teller: (input) => set({ cur_teller: input }),

  is_my_turn: false,
  set_my_turn: (input) => set({ is_my_turn: input }),

  is_my_team_turn: false,
  set_myteam_turn: (input) => set({ is_my_team_turn: input }),

  my_index: 10000,
  set_my_index: (input) => set({ my_index: input }),

  player_count: 0,
  set_player_count: (input) => set({ player_count: input }),


}));

export default useStore;