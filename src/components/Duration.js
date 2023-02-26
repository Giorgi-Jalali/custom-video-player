import { useContext } from "react";
import styled from "styled-components";

import formatTime from "../features/formatTime";
import { MyContext } from "../App";

export default function Duration() {
  const { rangePercentage, durationChangeHandler, currentTime, duration } =
    useContext(MyContext);

  return (
    <DurationContainer>
      <TimeDiv>{formatTime(currentTime)}</TimeDiv>

      <DurationInput
        type="range"
        min="0"
        max={duration || 1}
        value={currentTime}
        percentage={rangePercentage}
        onChange={durationChangeHandler}
      />

      <TimeDiv>{formatTime(duration - currentTime)}</TimeDiv>
    </DurationContainer>
  );
}

const DurationContainer = styled.div`
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 21px;
  margin-bottom: 10px;
`;

const TimeDiv = styled.div`
  width: 40px;
`;

const DurationInput = styled.input`
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(
    to right,
    white 0%,
    white ${(props) => props.percentage - 1}%,
    #9e9d9b ${(props) => props.percentage + 1}%,
    #9e9d9b 100%
  );
  width: 600px;
  height: 5px;
  border-radius: 3px;
  cursor: pointer;
  border: 1px solid purple;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background-color: white;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    outline: none;
  }
  &::-moz-range-thumb {
    -webkit-appearance: none;
    appearance: none;
    background-color: white;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    outline: none;
  }
`;
