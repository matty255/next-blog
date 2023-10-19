import { statusInfo } from "@/constants/profile";
import { copyToClipboard } from "@/lib/utils";
import { darkModeState } from "@/store/darkModeState";

import {
  VscRemote,
  VscSourceControl,
  VscSync,
  VscError,
  VscWarning,
  VscInfo,
  VscRadioTower,
  VscPaintcan,
  VscOctoface,
  VscJson,
  VscCheckAll,
  VscTerminalLinux,
  VscGithubInverted,
} from "react-icons/vsc";
import { useRecoilState } from "recoil";

export default function StatusBar() {
  const { theme } = statusInfo;
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);
  return (
    <div className="fixed h-6 bg-blue-500 dark:bg-amber-300 w-full bottom-0 z-10">
      <div className="flex items-center w-full h-full justify-between">
        <div className="flex items-center">
          <div className="pl-1 pr-3 hidden md:block">
            <VscRemote className="w-5 h-5 text-white cursor-pointer dark:text-slate-700" />
          </div>
          <div className=" items-center pr-3 gap-x-1 hidden md:flex">
            <VscSourceControl className="w-5 h-5 text-white cursor-pointer dark:text-slate-700" />
            <p className="text-white dark:text-slate-700">main*</p>
            <VscSync className="w-5 h-5 text-white cursor-pointer dark:text-slate-700" />
          </div>
          <div className="flex items-center">
            <VscRadioTower className="w-5 h-5 text-white cursor-pointer dark:text-slate-700" />
            <p className="text-white dark:text-slate-700">1</p>
          </div>
          <div className="pl-4 pr-4 hidden md:block">
            <p className="text-white dark:text-slate-700">Git Graph</p>
          </div>

          <div
            className="md:pl-0 pl-4 flex item-center pr-3 sm:pr-16 hover:bg-blue-700 dark:hover:bg-amber-400 cursor-pointer"
            onClick={() => copyToClipboard(darkMode ? theme.dark : theme.light)}
          >
            <VscPaintcan className="mt-0.5 w-5 h-5 text-white cursor-pointer dark:text-slate-700" />
            <p className="text-white dark:text-slate-700">
              {darkMode ? theme.dark : theme.light}
            </p>
          </div>
          <div className="flex items-center pr-4">
            <VscJson className="w-5 h-5 text-white cursor-pointer dark:text-slate-700" />
            <p className="text-white dark:text-slate-700 whitespace-nowrap hidden sm:block">
              TypeScript JSX
            </p>
          </div>
          <div className="pr-4">
            <VscOctoface className="w-5 h-5 text-white cursor-pointer dark:text-slate-700" />
          </div>
          <div className="flex item-center">
            <VscCheckAll className="mt-0.5 w-5 h-5 text-white cursor-pointer dark:text-slate-700 hidden sm:block" />
            <p className="text-white dark:text-slate-700 hidden sm:block">
              Prettier
            </p>
          </div>
        </div>

        <div className="flex item-center gap-x-3 pr-3">
          <VscTerminalLinux className="w-5 h-5 text-white cursor-pointer dark:text-slate-700" />
          <VscGithubInverted className="w-5 h-5 text-white cursor-pointer dark:text-slate-700" />
        </div>
      </div>
    </div>
  );
}
