import {
  VscLayout,
  VscLayoutPanel,
  VscLayoutSidebarLeft,
  VscLayoutSidebarRightOff,
  VscSearch,
} from "react-icons/vsc";

import useMediaQuery from "../../hooks/useMediaquery";

import useToggle from "../../hooks/useToggle";

import Link from "next/link";
import ToggleSwitch from "../AddOns/ToggleSwitch";

export default function TitleBar() {
  const isDesktop = useMediaQuery();
  const { isShown, toggle } = useToggle();

  return (
    <div className="w-full fixed top-0 left-0">
      <div className=" shadow-md md:shadow-none bg-blue-500 dark:bg-amber-300 fixed w-full top-0 z-30">
        <div className="flex space-between items-center w-full">
          {/* {home ? (
          <></>
        ) : (
          <Link href={"/"}>
            <VscLayout />
          </Link>
        )} */}
          {/* <DarkModeToggle /> */}
          <ToggleSwitch />
          {/* <LocaleSwitch /> */}
          <div
            onClick={!isShown ? toggle : () => {}}
            className="group r
          elative items-center cursor-pointer p-1 w-full md:w-1/2 rounded-md col-start-3 col-end-11 dark:hover:bg-slate-900 hover:bg-blue-300  dark:bg-slate-800 flex justify-center content-center m-auto font-semibold"
          >
            <Link href={"/"} className="inline-flex">
              <VscSearch className="text-slate-300  opacity-70 w-5 h-5" />

              <p className="pl-2 text-slate-300 group-hover:text-white dark:text-slate-100">
                vscode-blog
              </p>
            </Link>
          </div>
          <div className="flex gap-x-2 mb-1 mr-4">
            {isDesktop && (
              <>
                <VscLayoutSidebarLeft
                  className="w-6 h-6  dark:text-white"
                  aria-hidden="true"
                />
                <VscLayoutPanel
                  className="w-6 h-6  dark:text-white"
                  aria-hidden="true"
                />
                <VscLayoutSidebarRightOff
                  className="w-6 h-6  dark:text-white"
                  aria-hidden="true"
                />
                <VscLayout
                  className="w-6 h-6  dark:text-white"
                  aria-hidden="true"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
