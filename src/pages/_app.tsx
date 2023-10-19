import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "splitting/dist/splitting-cells.css";
import "splitting/dist/splitting.css";
import "./globals.css";
// import { DarkModeProvider } from "../lib/DarkModeContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
