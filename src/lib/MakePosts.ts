import fs from "fs";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import path from "path";
import { PostContentData, PostData, PostIdParams } from "../types/common";

const postsDirectory = path.join(process.cwd(), "posts");

const md = new MarkdownIt();

export function getSortedPostsData(): PostData[] {
  const categories = fs
    .readdirSync(postsDirectory)
    .filter((dir) => dir !== ".git");
  let allPostsData: PostData[] = [];

  categories.forEach((category) => {
    const categoryDirectory = path.join(postsDirectory, category);
    const fileNames = fs.readdirSync(categoryDirectory);

    const categoryPosts = fileNames.map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(categoryDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);
      return {
        id,
        category,
        ...matterResult.data,
      } as PostData;
    });

    allPostsData = [...allPostsData, ...categoryPosts];
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds(): PostIdParams[] {
  const categories = fs
    .readdirSync(postsDirectory)
    .filter((dir) => dir !== ".git");
  let postParams: PostIdParams[] = [];

  categories.forEach((category) => {
    const categoryDirectory = path.join(postsDirectory, category);
    const fileNames = fs.readdirSync(categoryDirectory);

    const categoryParams = fileNames.map((fileName) => ({
      params: {
        category,
        id: fileName.replace(/\.md$/, ""),
      },
    }));

    postParams = [...postParams, ...categoryParams];
  });

  return postParams;
}

export async function getPostData(
  category: string,
  id: string
): Promise<PostContentData> {
  const fullPath = path.join(postsDirectory, category, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const contentHtml = md.render(matterResult.content);

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

export function getPostsByCategory(category: string): PostData[] {
  const allPosts = getSortedPostsData();
  return allPosts.filter((post) => post.category === category);
}

export function getAllCategories(): string[] {
  const categories = fs
    .readdirSync(postsDirectory)
    .filter((dir) => dir !== ".git");
  return categories;
}
