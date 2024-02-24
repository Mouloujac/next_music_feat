import React, { useState, useEffect } from "react";

const AudioPlayer = ({ previewUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(previewUrl));
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, audio]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audio]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (event) => {
    const seekTime = event.target.value;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  return (
    <div>
      <button onClick={togglePlay}>
        {isPlaying ? (
          <img src="/pause.svg" alt="Pause" className="pauseIcon"/>
        ) : (
          <img src="/play.svg" alt="Play" className="playIcon"/>
        )}
      </button>
      <input
        type="range"
        value={currentTime}
        max={duration}
        onChange={handleSeek}
      />
    </div>
  );
};

export default AudioPlayer;
