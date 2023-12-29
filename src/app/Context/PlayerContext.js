"use client";
import React, { createContext, useContext } from "react";
import { useState } from "react";
import { useTrack } from "../Context/TracksContext";
const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {

  const { trackData } = useTrack();

  const [playingTrack, setPlayingTrack] = useState("");
  
  const initializePlayer = (prop) => {
    setPlayingTrack(
      prop
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
