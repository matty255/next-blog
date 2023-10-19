import Head from "next/head";
import { useEffect } from "react";

import dynamic from "next/dynamic";
import { useRecoilState } from "recoil";
import { darkModeState } from "../store/darkModeState";
import { sideBarOpenState } from "../store/sideBarOpenState";
import { LayoutProps } from "../types/common";
export default function Layout({
  children,
  allPostsData,
  postData,
}: LayoutProps) {
  const [darkMode, setDarkMode] = useRecoilState(darkModeState); // Recoil 상태 사용
  // console.log(allPostsData);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");

    if (storedDarkMode !== null) {
      setDarkMode(storedDarkMode === "true");
    } else {
      const userPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(userPrefersDark);
      localStorage.setItem("darkMode", String(userPrefersDark));
    }
  }, []); // 빈 dependency 배열을 사용하여 마운트 시에만 실행

  useEffect(() => {
    // darkMode 상태가 변경될 때마다 로컬 스토리지를 업데이트
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const [sidebarState, setSidebarState] = useRecoilState(sideBarOpenState);

  const TitleBar = dynamic(() => import("../components/Bars/TitleBar"), {
    ssr: false,
  });

  const SideBar = dynamic(() => import("../components/Bars/SideBar"), {
    ssr: false,
  });

  const AddressBar = dynamic(() => import("../components/Bars/AddressBar"), {
    ssr: false,
  });

  const StatusBar = dynamic(() => import("../components/Bars/StatusBar"), {
    ssr: false,
  });

  return (
    <div
      className={`h-screen fixed w-full font-godo-m ${
        darkMode ? "dark bg-slate-700" : "bg-slate-100"
      }`}
    >
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <SideBar allPostsData={allPostsData} />
      </div>

      <div
        className={`scrollbar-hide h-screen w-full overflow-scroll transition-all duration-300 ${
          sidebarState.isOpen ? "md:ml-80" : "md:ml-20"
        }`}
      >
        <header>
          <TitleBar />
        </header>
        <main className="pt-10 min-h-screen bg-slate-100 dark:bg-slate-700 ">
          <AddressBar allPostsData={allPostsData} postData={postData} />
          <div className="p-10 pt-0">{children}</div>
        </main>
      </div>
      <StatusBar />
    </div>
  );
}
