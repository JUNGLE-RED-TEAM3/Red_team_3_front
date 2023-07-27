// Song.js로 수정
import React, { useEffect, useRef } from "react";

export const AudioPlayer = () => {
  const audioRef = useRef();

  useEffect(() => {
    // 오디오 재생 시작
    audioRef.current.play();

    // 정해진 시간 후에 오디오 재생 중단
    const timer = setTimeout(() => {
      audioRef.current.pause();
    }, 5000); // 5초 후에 오디오 중단

    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머를 제거
  }, []);

  return (
    <div>
        {/* 랜더링 될 때 랜덤으로 음성이 자동 재생 */}
      <audio ref={audioRef} src="Hibiscus_song.mp3" controls autoPlay />
    </div>
  );
};

