// 상태 관리 라이브러리로 'zustand' 사용
import {create} from "zustand";
import axios from "axios";

const APPLICATION_SERVER_URL = 'https://mysquidcanvas.shop/';

const useStore = create((set) => ({
    // 상태와 관련된 변수와 함수들을 정의 : create 함수
    // 상태를 변경하는 함수(상태 갱신 시, 리액티브하게 컴포넌트 업데이트 됨) : set 함수
    
    // 상태 변수, 함수들
    mySessionId: 'SessionA',
    updateSessionId: (sessionId) => set({ mySessionId: sessionId }),

    myUserName: 'Participant' + Math.floor(Math.random() * 100),
    updateUserName: (userName) => set({ myUserName: userName }),

    session: undefined,
    updateSession: (session) => set({ session: session }),

    mainStreamManager: undefined, 
    updateMainStreamManager: (mainStreamManager) => set({ mainStreamManager: mainStreamManager }),
    
    //💡 publisher, subscribers는 gamers가 있으니까 필요 없을 듯..?
    publisher: undefined,
    updatePublisher: (publisher) => set({ publisher: publisher }),

    subscribers: [],
    updateSubscribers: (subscribers) => set({ subscribers: subscribers }),

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

    // 토큰 및 세션 생성 관리 함수들
    getToken: async () => {
      const sessionId = await useStore.getState().createSession(useStore.getState().mySessionId);
      return await useStore.getState().createToken(sessionId);
    },

    createSession: async (sessionId) => {
      const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
          headers: { 'Content-Type': 'application/json', },
      });
      return response.data; // The sessionId
    },

    createToken: async (sessionId) => {
      const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
          headers: { 'Content-Type': 'application/json', },
      });
      return response.data; // The token
    }


}));

export default useStore;