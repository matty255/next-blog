import { promises as fsPromises } from "fs";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import path from "path";
import {
  Locale,
  PostContentData,
  PostData,
  PostIdParams,
} from "../types/common";
import { localeToFolderName } from "./utils";

const postsDirectory = path.join(process.cwd(), "posts");

const md = new MarkdownIt();

export async function getSortedPostsData(locale: string | undefined): Promise<PostData[]> {
  const folderName = localeToFolderName(locale);
  const localeDirectory = path.join(postsDirectory, folderName);
  let allPostsData: PostData[] = [];

  try {
    const categories = await fsPromises.readdir(localeDirectory);
    for (const category of categories) {
      const categoryDirectory = path.join(localeDirectory, category);
      const fileNames = await fsPromises.readdir(categoryDirectory);
      const categoryPosts = await Promise.all(
        fileNames.map(async (fileName) => {
          const id = fileName.replace(/\.md$/, "");
          const fullPath = path.join(categoryDirectory, fileName);
          const fileContents = await fsPromises.readFile(fullPath, "utf8");
          const matterResult = matter(fileContents);
          return {
            id,
            category,
            ...matterResult.data,
          } as PostData;
        })
      );
      allPostsData = [...allPostsData, ...categoryPosts];
    }
  } catch (error) {
    console.error("Failed to read directory:", error);
    // ... further error handling
  }

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getAllPostIds(): Promise<PostIdParams[]> {
  const locales: Locale[] = ["ko-KR", "en-US"]; // 사용 가능한 locale 목록
  let postParams: PostIdParams[] = [];

  try {
    for (const locale of locales) {
      const folderName = localeToFolderName(locale);
      const localeDirectory = path.join(postsDirectory, folderName);
      const categories = await fsPromises.readdir(localeDirectory);
      for (const category of categories) {
        const categoryDirectory = path.join(localeDirectory, category);
        const fileNames = await fsPromises.readdir(categoryDirectory);
        const categoryParams = fileNames.map((fileName) => ({
          params: {
            category,
            id: fileName.replace(/\.md$/, ""),
          },
          query: {
            locale,
          },
        }));
        postParams = [...postParams, ...categoryParams];
      }
    }
  } catch (error) {
    console.error("Failed to read directory:", error);
    // ... further error handling
  }

  return postParams;
}

export async function getPostData(
  locale: Locale,
  category: string,
  id: string
): Promise<PostContentData | null> {
  const folderName = localeToFolderName(locale);
  const fullPath = path.join(postsDirectory, folderName, category, `${id}.md`); // folderName 사용

  try {
    const fileContents = await fsPromises.readFile(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const contentHtml = md.render(matterResult.content);
    return {
      id,
      contentHtml,
      ...matterResult.data,
    };
  } catch (error) {
    console.error("Failed to read file:", error);
    // 에러 발생 시 null 반환
    return null;
    // 또는 에러를 던질 수 있습니다: throw error;
  }
}

export async function getPostsByCategory(
  locale: string | undefined,
  category: string
): Promise<PostData[]> {
  const allPosts = await getSortedPostsData(locale);
  return allPosts.filter((post) => post.category === category);
}

export async function getAllCategories(locale: Locale): Promise<string[]> {
  const folderName = localeToFolderName(locale);
  const localeDirectory = path.join(postsDirectory, folderName);

  try {
    const categories = await fsPromises.readdir(localeDirectory);
    return categories.filter((dir) => dir !== ".git");
  } catch (error) {
    console.error("Failed to read directory:", error);
    // 빈 배열을 반환하거나, 에러를 던질 수 있습니다.
    return [];
    // 또는: throw error;
  }
}
