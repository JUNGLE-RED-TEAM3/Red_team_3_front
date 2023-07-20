// 상태 관리 라이브러리로 zustand 사용
import create from "zustand";
import axios from "axios";

// ★ TODO : 서버 url 변경 필요
// const APPLICATION_SERVER_URL = "https://seoyoungtest1.shop/"
const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';

const useStore = create((set) => ({
    

}));

export default useStore;