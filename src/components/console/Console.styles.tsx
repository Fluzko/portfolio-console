import styled from "styled-components";
import { Colors } from "../../globals/colors";

export const ConsoleContainer = styled.div`
  font-family: "Meslo Mono";
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 0.75em;
`;

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${Colors.DEEP_BLUE};
`;
