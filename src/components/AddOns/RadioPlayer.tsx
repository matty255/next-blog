import React, { useEffect, useRef } from 'react';

interface RadioProps {
  radioFiles: string[];
}

const RadioPlayer: React.FC<RadioProps> = ({ radioFiles }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
  
    useEffect(() => {
      if (radioFiles.length > 0 && audioRef.current) {
        // 라디오 파일이 있고 오디오 요소가 준비되었을 때
        audioRef.current.src = `/${encodeURIComponent(radioFiles[1])}`; // public/radio/ 경로로 수정
        audioRef.current.load(); // 오디오를 로드합니다.
      }
    }, [radioFiles]);

  const playRadio = () => {
    if (audioRef.current) {
      audioRef.current.play(); // 오디오를 재생합니다.
    }
  };

  const pauseRadio = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // 오디오를 일시 정지합니다.
    }
  };

  return (
    <div>
      <button onClick={playRadio}>Play</button>
      <button onClick={pauseRadio}>Pause</button>
      <audio ref={audioRef} controls />
    </div>
  );
};

export default RadioPlayer;
