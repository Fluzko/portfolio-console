import styled from "styled-components";
import { Colors } from "../../globals/colors";

export const Input = styled.input`
  background-color: transparent;
  border: none;
  color: ${Colors.GREY};
  font-family: "Meslo Mono";
  font-size: 1em;
  width: 100%;
  :focus {
    outline: none;
  }
  ::selection {
    color: ${Colors.DEEP_BLUE};
    background-color: ${Colors.GREY};
  }
`;
