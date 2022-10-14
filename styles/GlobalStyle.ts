import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import { device } from "./theme";

export const GlobalStyle = createGlobalStyle`
    /* ${reset} */
    body {
        box-sizing: border-box;
        width: 100%;
        margin:0;
    }
    :focus {
        outline: none;
        border: none;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    /* h1 {
        font-size: 4rem;
    }
    h2 {
        font-size: 3rem;
    } */

    html{
        -webkit-text-size-adjust: none;
        font-family: -apple-system,BlinkMacSystemFont,helvetica,Apple SD Gothic Neo,sans-serif;       
        font-display: fallback;

        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    button {
        background: none;
        padding: 0;
        border: none;
        cursor: pointer;
        &:disabled {
            cursor: default;
            fill: #f2f3f4;
        }
    }
    .pc-tablet-only {
        display:none;
        @media ${device.tablet} { 
        display: block;
    }
    } 

    
`;