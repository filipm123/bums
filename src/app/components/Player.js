"use client";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import React from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import FastForwardRoundedIcon from "@mui/icons-material/FastForwardRounded";
import FastRewindRoundedIcon from "@mui/icons-material/FastRewindRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";
import "../../app/globals.css";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";

const Player = ({ url }) => {
  return (
    <footer className=" bg-black border-t-[1px] border-br fixed w-full bottom-0 right-0">
      <AudioPlayer
        showSkipControls
        footer
        layout="stacked-reverse"
        src={url}
        onPlay={(e) => console.log("onPlay")}
        className="w-full"
        customIcons={{
          play: <PlayArrowRoundedIcon />,
          pause: <PauseRoundedIcon />,
          volume: <VolumeDownRoundedIcon />,
          volumeMute: <VolumeOffRoundedIcon />,
          rewind: <FastRewindRoundedIcon />,
          forward: <FastForwardRoundedIcon />,
          next: <SkipNextRoundedIcon />,
          previous: <SkipPreviousRoundedIcon />,
          shuffle: <ShuffleRoundedIcon />,
        }}
      />
    </footer>
  );
};
export default Player;
