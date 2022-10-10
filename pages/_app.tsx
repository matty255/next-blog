import '../styles/GlobalStyle.ts'
import type { AppProps } from 'next/app'
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/GlobalStyle";
import { theme } from "../styles/theme";
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>boilerplate</title>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp
