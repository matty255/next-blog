import React from "react";
import "./globals.css";
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
// import { DarkModeProvider } from "../lib/DarkModeContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
