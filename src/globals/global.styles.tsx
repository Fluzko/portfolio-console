import { createGlobalStyle } from "styled-components";
import { GlobalFonts } from "./fonts/font.styles";

export const GlobalStyles = createGlobalStyle`
    ${GlobalFonts}

    body {
        margin: 0;
    }
    #root{
        height: 100vh;

    }
`;
