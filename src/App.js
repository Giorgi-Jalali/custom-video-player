import { useEffect, useRef, useState, createContext } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { qualityAction } from "./app/store";
import { showControlsAction } from "./app/store";
import { videoPlayingAction } from "./app/store";

import video360 from "./videos/360.mp4";
import video720 from "./videos/720.mp4";

import Volume from "./components/Volume";
import ControlsContainer from "./components/ControlsContainer";

export const MyContext = createContext(null);

function App() {
  const dispatch = useDispatch();
  const quality = useSelector((state) => state.quality).quality;
  const playing = useSelector((state) => state.playing).playing;

  const videoRef = useRef(null);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [rangePercentage, setRangePercentage] = useState(1);

  const [volume, setVolume] = useState(0.5);

  const [playbackRate, setPlaybackRate] = useState("1");

  useEffect(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, []);

  const handleMouseOverOut = () => {
    dispatch(showControlsAction.toggleControls());
  };

  const handleProgress = (e) => {
    setCurrentTime(e.target.currentTime);
    setRangePercentage((currentTime * 100) / duration);
    if (currentTime !== 0 && duration !== 0 && currentTime === duration) {
      dispatch(videoPlayingAction.togglePlaying());
    }
  };

  const handleEnded = () => {
    dispatch(videoPlayingAction.setPlayingFalse);
  };

  const handleVolume = (e) => {
    setVolume(e.target.value);
    videoRef.current.volume = e.target.value;
  };

  const durationChangeHandler = (e) => {
    videoRef.current.currentTime = e.target.value;
  };

  const playPauseHandler = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    dispatch(videoPlayingAction.togglePlaying());
  };

  const handleQuality = () => {
    dispatch(qualityAction.toggleQuality());

    videoRef.current.src = quality ? video720 : video360;
    videoRef.current.currentTime = currentTime;
    videoRef.current.play();
    if (playing) {
      dispatch(videoPlayingAction.togglePlaying());
    }
  };

  const forward = () => {
    videoRef.current.currentTime += 10;
  };

  const backward = () => {
    videoRef.current.currentTime -= 10;
  };

  const handleFullScreen = () => {
    videoRef.current.requestFullscreen();
  };

  const handlePlaybackSpeed = (e) => {
    setPlaybackRate(e.target.value);
    videoRef.current.playbackRate = Number(e.target.value);
  };

  const context = {
    volume,
    handleVolume,
    rangePercentage,
    durationChangeHandler,
    currentTime,
    duration,
    playbackRate,
    handlePlaybackSpeed,
    backward,
    playPauseHandler,
    forward,
    quality,
    handleQuality,
    handleFullScreen,
  };

  return (
    <MyContext.Provider value={context}>
      <Main onMouseOver={handleMouseOverOut} onMouseOut={handleMouseOverOut}>
        <GlobalStyle />
        <Video
          ref={videoRef}
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
          onTimeUpdate={handleProgress}
          playbackRate={playbackRate}
          onEnded={handleEnded}
        >
          <source src={video360} type="video/mp4"></source>
        </Video>
        <Volume />
        <ControlsContainer />
      </Main>
    </MyContext.Provider>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #E5E5E5;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .controls {
    transition: opacity 1s;
    opacity: 0;
  }

  .controls.show {
    opacity: 1;
  }
`;

const Main = styled.main`
  position: relative;
  width: 800px;
  height: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  overflow: hidden;
`;

const Video = styled.video`
  background-color: black;
  width: 800px;
  height: 440px;
`;
