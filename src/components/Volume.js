import { useContext } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { MyContext } from "../App";

import volume from "../assets/volume.png";

export default function Volume() {
  const showControls = useSelector((state) => state.controls).controls;

  const { volume, handleVolume } = useContext(MyContext);

  return (
    <VolumeContainer className={`controls ${showControls ? "show" : "hide"}`}>
      <VolumeInput
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolume}
      />
      <VolumeIcon />
    </VolumeContainer>
  );
}

const VolumeContainer = styled.div`
  position: absolute;
  top: 15%;
  left: 92%;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 10px 10px 10px;
  border: 0.7px solid white;
  border-radius: 10px;
`;

const VolumeInput = styled.input`
  appearance: none;
  writing-mode: bt-lr;

  -webkit-appearance: slider-vertical;

  background: white;
  width: 10px;
  height: 110px;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid purple;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background-color: #5e94da;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    outline: none;
  }
`;

const VolumeIcon = styled.div`
  background-image: url(${volume});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 24px;
  height: 24px;
  margin-top: 10px;
`;
