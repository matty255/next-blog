import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import "./globals.css";

function App({ Component, pageProps }: AppProps) {
  const [cssLoaded, setCssLoaded] = useState(false);
  // console.log(cssLoaded);
  useEffect(() => {
    // Set a timeout to simulate "waiting for CSS to load"
    const timer = setTimeout(() => {
      setCssLoaded(true);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const AnimatedText = dynamic(() => import("../common/AnimatedText"), {
    ssr: false,
  });

  return (
    <RecoilRoot>
      {cssLoaded ? (
        <Component {...pageProps} />
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-700 text-yellow-300">
          <AnimatedText text={"로딩중입니다..."} bold />
        </div>
        // 로딩 스피너
      )}
    </RecoilRoot>
  );
}
export default appWithTranslation(App);
