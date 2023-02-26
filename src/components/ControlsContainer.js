import { useSelector } from "react-redux";
import styled from "styled-components";

import Duration from "./Duration";
import Buttons from "./Buttons";

export default function ControlsContainer() {
  const controls = useSelector((state) => state.controls).controls;

  return (
    <Container className={`controls ${controls ? "show" : "hide"}`}>
      <Duration />
      <Buttons />
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 82%;
  left: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
