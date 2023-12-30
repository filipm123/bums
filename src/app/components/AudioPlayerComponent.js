import React, { useState, useRef } from 'react';
import { Howl } from 'howler';
import '../globals.css'

const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const sound = useRef(
    new Howl({
      src: [src],
      volume: volume,
      loop: false,
      onend: function () {
        console.log('Finished playing');
      },
    })
  );

  const handlePlayPause = () => {
    if (isPlaying) {
      sound.current.pause();
    } else {
      sound.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    sound.current.volume(newVolume);
  };

  return (
    <div className="audio-player">
      <h1>Howler.js Audio Player</h1>
      <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default AudioPlayer;