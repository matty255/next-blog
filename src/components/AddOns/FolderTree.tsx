import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { historyStackState } from "@/store/historyStackState";
import { PostData } from "@/types/common";
import { motion } from "framer-motion";
import Link from "next/link";
import { VscChevronDown } from "react-icons/vsc";
import TSIcon from "../../../assets/icons/typescript-svgrepo-com.svg";
import { folderOpenState } from "../../store/folderTreeOpenState";

interface FolderTreeProps {
  folder: string;
  title: string;
  path: string;
  posts: PostData[]; // 변경된 부분
  children: FolderTreeProps[];
  isPost: boolean;
}

function createFolderTree(posts: PostData[]): FolderTreeProps[] {
  const folderTree: FolderTreeProps[] = [];

  for (const post of posts) {
    const parts = post.category.split("/");
    let currentFolder = folderTree;
    let currentPath = "";
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      currentPath += `/${part}`;
      let folder = currentFolder.find((folder) => folder.folder === part);
      if (!folder) {
        folder = {
          folder: part,
          title: i === parts.length - 1 ? post.title : "",
          path: currentPath,
          posts: [],
          children: [],
          isPost: i === parts.length - 1,
        };
        currentFolder.push(folder);
      }
      if (i === parts.length - 1) {
        folder.posts.push(post);
      } else {
        currentFolder = folder.children;
      }
    }
  }

  return folderTree;
}

const RenderFolderTree = ({
  node,
  isOpenState,
  setIsOpenState,
  initialRender,
}: {
  node: FolderTreeProps;
  isOpenState: Record<string, boolean>;
  setIsOpenState: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  initialRender: boolean;
}) => {
  const toggleIsOpen = (folder: string) => {
    setIsOpenState((prev: Record<string, boolean>) => ({
      ...prev,
      [folder]: !prev[folder],
    }));
  };
  return (
    <div className="pl-5">
      <div
        className="w-full text-slate-400 hover:underline hover:text-blue-300 dark:hover:text-slate-100 font-bold inline-flex cursor-pointer"
        onClick={() => toggleIsOpen(node.folder)}
      >
        <motion.div
          initial={initialRender ? { rotate: -90 } : false}
          animate={{ rotate: isOpenState[node.folder] ? 0 : -90 }}
          transition={{ duration: 0.4 }}
          style={{ originX: 0.4, originY: 0.5 }}
        >
          <VscChevronDown className="w-5 h-5 mr-1" />
        </motion.div>
        <Link href={`${node.path}`}>{node.folder}</Link>
      </div>
      {node.isPost && isOpenState[node.folder] && (
        <div className="">
          {node.posts.map((post, index) => (
            <Link
              href={`${node.path}/${post.id}`}
              key={index}
              className="my-1 group relative block"
            >
              <div className="pl-5 text-gray-500 hover:underline z-10 relative flex items-center gap-x-1 group-hover:bg-slate-100 group-hover:bg-opacity-10 ">
                <TSIcon className="w-5 h-5" /> {post.title}.tsx
              </div>
            </Link>
          ))}
        </div>
      )}
      {node.children.map((child, index) => (
        <RenderFolderTree
          initialRender={initialRender}
          key={index}
          node={child}
          isOpenState={isOpenState}
          setIsOpenState={setIsOpenState}
        />
      ))}
    </div>
  );
};

const FolderTree = ({ allPostsData }: { allPostsData?: PostData[] }) => {
  const [isOpenState, setIsOpenState] = useRecoilState(folderOpenState);

  const [isOpen, setIsOpen] = useRecoilState(historyStackState);
  const [folderTree, setFolderTree] = useState<FolderTreeProps[]>([]);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    const newFolderTree = allPostsData ? createFolderTree(allPostsData) : [];
    setFolderTree(newFolderTree);
    setInitialRender(false);
  }, [allPostsData]);

  return (
    <div
      className={`overflow-y-scroll ${
        isOpen ? "h-[23rem]" : ""
      } scrollbar-hide`}
    >
      {folderTree.map((node, index) => (
        <RenderFolderTree
          key={index}
          node={node}
          isOpenState={isOpenState}
          setIsOpenState={setIsOpenState}
          initialRender={initialRender}
        />
      ))}
    </div>
  );
};

export default FolderTree;
