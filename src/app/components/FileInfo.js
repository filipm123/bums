import WaveSurfer from "wavesurfer.js";
import { useEffect } from "react";
const FileInfo = ({ url }) => {
  useEffect(() => {
    const audio = new Audio();
    audio.controls = true;
    audio.src = url;
    const wavesurfer = WaveSurfer.create({
      container: "#waveform",
      waveColor: "#FAFAFA",
      progressColor: "#383351",
      backend: "WebAudio",
    });
  }, []);
  return <div id="waveform"></div>;
};

export default FileInfo;
