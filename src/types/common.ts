import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  home?: boolean;
  dark?: boolean;
  allPostsData?: PostData[];
  postData?: PostData;
}

interface PostData {
  id: string;
  category: string;
  title: string;
  description: string;
  date: string;
  [key: string]: any;
}

interface PostContentData {
  id: string;
  contentHtml: string;
  [key: string]: any;
}
interface PostIdParams {
  params: {
    category: string;
    id: string;
  };
}

interface PostFilteredArray {
  posts: PostData[];
}

interface PostArray {
  postData: PostData[];
}

interface PostSortedArray {
  allPostsData: PostData[];
  allCategories: string[];
}
type Size = "sm" | "md" | "lg";

type SideBarCategory =
  | "home"
  | "search"
  | "folder"
  | "contact"
  | "graph"
  | "trouble-shooting"
  | "presentation"
  | "recommendation";
type PostCategory = "all" | "react" | "nextjs" | "typescript" | "javascript";

export type {
  LayoutProps,
  PostArray,
  PostCategory,
  PostContentData,
  PostData,
  PostFilteredArray,
  PostIdParams,
  PostSortedArray,
  SideBarCategory,
  Size,
};
