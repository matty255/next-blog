import { GetStaticPropsContext } from "next";
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
  query: {
    locale: Locale;
  };
}

interface PostFilteredArray {
  posts: PostData[];
}

interface PostArray {
  postData: PostData[];
}

type CategoryLocale = {
  [key in Locale]: string;
};
interface PostSortedArray {
  allPostsData: PostData[];
  allCategories: string[];
}


interface RadioList {
  radioFiles : string[];
}
type Size = "sm" | "md" | "lg";

type Locale = "en-US" | "ko-KR";


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

interface BlogContextProps extends GetStaticPropsContext {
  locale: Locale;
}

export type {
  BlogContextProps, CategoryLocale, LayoutProps,
  Locale,
  PostArray,
  PostCategory,
  PostContentData,
  PostData,
  PostFilteredArray,
  PostIdParams,
  PostSortedArray, RadioList, SideBarCategory,
  Size
};

