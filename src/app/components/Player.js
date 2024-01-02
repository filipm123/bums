"use client";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import React from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import FastForwardRoundedIcon from "@mui/icons-material/FastForwardRounded";
import FastRewindRoundedIcon from "@mui/icons-material/FastRewindRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";
import "../../app/globals.css";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { usePlayer } from "../Context/PlayerContext";
import { useTrack } from "../Context/TracksContext";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "black" : "black",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const Player = ({ url }) => {
  const { playingTrack } = usePlayer();
  const { trackData } = useTrack();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [expanded, setExpanded] = React.useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {matches ? (
        <footer
          id="fade-in"
          className="fixed bottom-[0px] right-0 w-full border-t-[1px] bg-black border-br"
        >
          {playingTrack ? (
            <div className="flex justify-between">
              {/*this shit not worky, needs state management*/}
              <div className="p-4">{trackData.id}</div>
              <AudioPlayer
                style={{ width: "50vw", color: "white", background: "black" }}
                autoPlay
                customAdditionalControls={[]}
                footer
                layout="stacked-reverse"
                src={playingTrack}
                onPlay={(e) => console.log("onPlay")}
                customIcons={{
                  play: <PlayArrowRoundedIcon />,
                  pause: <PauseRoundedIcon />,
                  volume: <VolumeDownRoundedIcon />,
                  volumeMute: <VolumeOffRoundedIcon />,
                  rewind: <FastRewindRoundedIcon />,
                  forward: <FastForwardRoundedIcon />,
                  next: <SkipNextRoundedIcon />,
                  previous: <SkipPreviousRoundedIcon />,
                }}
              />
              <div className="p-4">{trackData.id}</div>
            </div>
          ) : (
            <></>
          )}
        </footer>
      ) : (
        <div id="fade-in" className="fixed right-0 top-[64px] w-full p-4">
          {playingTrack ? (
            <Accordion defaultExpanded="true" onChange={handleChange("panel1")}>
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Player</Typography>
              </AccordionSummary>
              <MuiAccordionDetails sx={{ backgroundColor: "black" }}>
                <AudioPlayer
                  style={{ color: "white", background: "black" }}
                  autoPlay
                  customAdditionalControls={[]}
                  layout="stacked-reverse"
                  src={playingTrack}
                  onPlay={(e) => console.log("onPlay")}
                  customIcons={{
                    play: <PlayArrowRoundedIcon />,
                    pause: <PauseRoundedIcon />,
                    volume: <VolumeDownRoundedIcon />,
                    volumeMute: <VolumeOffRoundedIcon />,
                    rewind: <FastRewindRoundedIcon />,
                    forward: <FastForwardRoundedIcon />,
                    next: <SkipNextRoundedIcon />,
                    previous: <SkipPreviousRoundedIcon />,
                  }}
                />
              </MuiAccordionDetails>
            </Accordion>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};
export default Player;
