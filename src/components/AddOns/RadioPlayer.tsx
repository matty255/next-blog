import React, { useEffect, useRef, useState } from 'react';

interface RadioProps {
  radioFiles: string[];
}

const RadioPlayer: React.FC<RadioProps> = ({ radioFiles }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isUserInteracted, setIsUserInteracted] = useState(false);

  useEffect(() => {
    if (radioFiles.length > 0 && audioRef.current) {
      audioRef.current.src = `/${encodeURIComponent(radioFiles[1])}`;
      audioRef.current.load();
    }
  }, [radioFiles]);

  const handleUserInteraction = () => {
    setIsUserInteracted(true);
  };

  const handleMouseOver = () => {
    if (isUserInteracted && audioRef.current) {
      audioRef.current.play()
        .catch(e => console.error('오디오 재생 오류:', e));
    }
  };

  return (
    <div onClick={handleUserInteraction} onMouseOver={handleMouseOver}>
      <audio ref={audioRef} controls />
    </div>
  );
};

export default RadioPlayer;
