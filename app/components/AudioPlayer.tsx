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
    <div className="playButton absolute opacity-0 hover:opacity-1 z-50 transition-all">
      <button onClick={togglePlay} className="">
        {isPlaying ? (
          <img src="/pause.svg" alt="Pause" className="pauseIcon w-14 absolute transition-all"/>
        ) : (
          <img src="/play.svg" alt="Play" className="playIcon w-14 absolute transition-all"/>
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;
