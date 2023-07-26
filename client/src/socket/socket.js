import io from "socket.io-client";
// TODO: 연결 확인은 아직, 클라이언트 정리 끝나면 연결 확인 해보기 (07/27 00:37)

const socket = io("https://mysquidcanvas.shop/");

socket.on("connect", () => {
    console.log("socket test!");
});
socket.on("connect_error", (error) => {
    console.log("error : ", error);
});

export default socket;