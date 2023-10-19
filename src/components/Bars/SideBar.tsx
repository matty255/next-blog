import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import {
  VscHome,
  VscSearch,
  VscFiles,
  VscSourceControl,
  VscDebugAltSmall,
  VscExtensions,
  VscAccount,
  VscSettingsGear,
  VscCommentDiscussion,
} from "react-icons/vsc";

import dynamic from "next/dynamic";
import Search from "../AddOns/Search";
import FolderTree from "../AddOns/FolderTree";
import HistoryComponent from "../AddOns/HistoryBox";
import { PostData, SideBarCategory } from "@/types/common";
import HomeAddOn from "../AddOns/HomeAddOn";
import useObserverGradient from "@/hooks/useObserverGradient";
import { useRouter } from "next/navigation";
import { profile } from "@/constants/profile";
import { useRecoilState } from "recoil";
import { sideBarOpenState } from "@/store/sideBarOpenState";

const FadeInAnimation = dynamic(() => import("@/common/FadeInAnimation"));

export default function SideBar({
  allPostsData,
}: {
  allPostsData?: PostData[];
}) {
  const [sidebarState, setSidebarState] = useRecoilState(sideBarOpenState);
  const router = useRouter();

  function setSidebarOpenCategory(word: SideBarCategory) {
    if (word !== sidebarState.category) {
      setSidebarState({
        isOpen: true,
        category: word,
      });
    } else {
      setSidebarState({
        isOpen: !sidebarState.isOpen,
        category: word,
      });
    }
  }
  function consoleForAdmin() {
    alert("This page is for admin");
  }

  const icons = [
    <VscSearch
      key="search"
      className="w-10 h-auto text-white cursor-pointer dark:text-slate-700 hover:text-blue-500 dark:hover:text-amber-400"
      onClick={() => setSidebarOpenCategory("search")}
    />,
    <VscFiles
      key="folder"
      className="w-10 h-auto text-white cursor-pointer dark:text-slate-700 hover:text-blue-500 dark:hover:text-amber-400"
      onClick={() => setSidebarOpenCategory("folder")}
    />,
    <div
      key="source-control"
      onClick={() => {
        setSidebarOpenCategory("graph");
        router.push("/graph");
      }}
    >
      <VscSourceControl className="w-10 h-auto text-white cursor-pointer dark:text-slate-700 hover:text-blue-500 dark:hover:text-amber-400" />
    </div>,
    <VscDebugAltSmall
      key="debug"
      className="w-10 h-auto text-white cursor-pointer dark:text-slate-700 hover:text-blue-500 dark:hover:text-amber-400"
      onClick={() => setSidebarOpenCategory("trouble-shooting")}
    />,
    <VscExtensions
      key="extensions"
      className="w-10 h-auto text-white cursor-pointer dark:text-slate-700 hover:text-blue-500 dark:hover:text-amber-400"
      onClick={() => setSidebarOpenCategory("recommendation")}
    />,
  ];

  return (
    <div
      className={` hidden md:block md:fixed top-0 left-0 h-screen pb-6 transition-all duration-300 ${
        sidebarState.isOpen ? "md:w-80" : "md:w-20"
      } bg-blue-300 dark:bg-amber-200`}
    >
      <div className="w-full flex h-full relative ">
        <div
          className={`px-[2rem] w-20 scrollbar-hide overflow-y-scroll pt-16 pb-5 flex flex-col h-full items-center justify-between ${"items-start"}`}
        >
          <div className="flex flex-col gap-y-6 items-center w-full">
            <div
              onClick={() => {
                setSidebarState({
                  ...sidebarState,
                  isOpen: !sidebarState.isOpen,
                });
                router.push("/");
              }}
            >
              <VscHome className="w-12 h-auto text-white cursor-pointer dark:text-slate-700  hover:text-blue-500 dark:hover:text-amber-400" />
            </div>
            <FadeInAnimation icons={icons} isShown={sidebarState.isOpen} />
          </div>
          <div className="p-3"></div>
          <div className="flex flex-col gap-y-6 items-center">
            <div></div>
            <VscCommentDiscussion
              key="comment-discussion"
              className="w-10 h-auto text-white cursor-pointer dark:text-slate-700 hover:text-blue-500 dark:hover:text-amber-400"
              onClick={consoleForAdmin}
            />
            <VscAccount
              key="account"
              className="w-10 h-auto text-white cursor-pointer dark:text-slate-700 hover:text-blue-500 dark:hover:text-amber-400"
              onClick={consoleForAdmin}
            />
            <VscSettingsGear
              key="settings"
              className="w-10 h-auto text-white cursor-pointer  dark:text-slate-700 hover:text-blue-500 dark:hover:text-amber-400"
              onClick={consoleForAdmin}
            />
          </div>
        </div>
        {sidebarState.isOpen && (
          <div className="relative bg-white dark:bg-slate-800 pt-16 w-full h-full transition flex flex-col justify-between">
            <div className="absolute shadow-md top-10 h-[1.85rem] w-full bg-blue-200 dark:bg-slate-700 text-slate-700 dark:text-slate-100 font-godo-b uppercase tracking-wider inline-flex items-center pt-1 pl-1 text-sm ">
              <p>{profile.siteTitle}</p>
            </div>
            <div className="pt-3">
              {sidebarState.category === "home" && (
                <HomeAddOn allPostsData={allPostsData} />
              )}
              {sidebarState.category === "search" && (
                <Search allPostsData={allPostsData} />
              )}
              {sidebarState.category === "folder" && (
                <FolderTree allPostsData={allPostsData} />
              )}
            </div>
            <HistoryComponent />
          </div>
        )}
      </div>
    </div>
  );
}
