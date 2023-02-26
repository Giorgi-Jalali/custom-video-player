import { useContext } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { MyContext } from "../App";

import play from "../assets/play.png";
import pause from "../assets/pause.png";
import backward from "../assets/backward.png";
import forward from "../assets/forward.png";
import settings from "../assets/settings.png";
import fullscreen from "../assets/fullscreen.png";

export default function Buttons() {
  const playing = useSelector((state) => state.playing).playing;

  const {
    playbackRate,
    handlePlaybackSpeed,
    backward,
    playPauseHandler,
    forward,
    quality,
    handleQuality,
    handleFullScreen,
  } = useContext(MyContext);

  return (
    <Controls>
      <Select
        title="playback rate"
        value={playbackRate}
        onChange={handlePlaybackSpeed}
      >
        <option value="0.5">0.5x</option>
        <option value="1">1x</option>
        <option value="1.5">1.5x</option>
        <option value="2">2x</option>
      </Select>
      <Rewind title="backward" onClick={backward} />
      <PlayPause
        onClick={playPauseHandler}
        playing={playing}
        title={playing ? "play" : "pause"}
      />
      <FastForward title="forward" onClick={forward} />
      <Settings title={quality ? "720p" : "360p"} onClick={handleQuality} />

      <Fullscreen onClick={handleFullScreen} />
    </Controls>
  );
}

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
`;

const Select = styled.select`
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const ButtonStyle = styled.div`
  background-color: white;
  background-repeat: no-repeat;
  background-size: 20px 20px;
  background-position: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    transform: scale(1.1);
  }
  &[title]:hover::after {
    content: attr(title);
    background-color: #3b473e;
    color: white;
    font-style: italic;
    font-size: 12px;
    padding: 2px 5px;
    position: absolute;
    top: -65%;
    left: 0;
    border-radius: 3px;
    opacity: 0.8;
  }
`;

const Rewind = styled(ButtonStyle)`
  background-image: url(${backward});
  background-size: 22px 22px;
  width: 36px;
  height: 36px;
`;

const PlayPause = styled(ButtonStyle)`
  background-image: url(${(props) => (props.playing ? play : pause)});
  background-size: 25px 25px;
  width: 45px;
  height: 45px;
`;

const FastForward = styled(ButtonStyle)`
  background-image: url(${forward});
  background-size: 22px 22px;
  width: 36px;
  height: 36px;
`;

const Settings = styled(ButtonStyle)`
  background-image: url(${settings});
`;

const Fullscreen = styled.div`
  position: absolute;
  top: 50%;
  left: 95%;
  background-image: url(${fullscreen});
  background-size: 28px 28px;
  background-repeat: no-repeat;
  width: 28px;
  height: 28px;

  cursor: pointer;
  transition: 0.4s;
  &:hover {
    transform: scale(1.2);
  }
`;
