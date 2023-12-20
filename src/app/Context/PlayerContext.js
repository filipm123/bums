"use client";
import React, { createContext, useContext } from "react";
import { useState } from "react";
import { useTrack } from "../Context/TracksContext";
const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const { trackData } = useTrack();
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [playingTrack, setPlayingTrack] = useState("");
  const initializePlayer = () => {
    setPlayingTrack(
      trackData[selectedTrack] && trackData[selectedTrack].audioFiles[0],
    );
    console.log(playingTrack);
  };

  return (
    <PlayerContext.Provider value={{ initializePlayer, playingTrack }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  return useContext(PlayerContext);
};
