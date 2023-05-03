import { createGlobalStyle } from "styled-components";
import { GlobalFonts } from "./fonts/font.styles";
import { Colors } from "./colors";

export const GlobalStyles = createGlobalStyle`
    ${GlobalFonts}

    body {
        margin: 0;
    }
    #root{
        height: 100vh;

    }

   ::-webkit-scrollbar {
    background-color: ${Colors.DEEP_BLUE};
    }
    
    ::-webkit-scrollbar-thumb {
        background: ${Colors.GREY};
        border-radius: 10px;
    }
`;
