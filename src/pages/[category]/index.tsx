import {
  getAllCategories,
  getPostsByCategory,
  getSortedPostsData,
} from "@/lib/MakePosts"; // getSortedPostsData 추가
import { GetStaticPropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { withDataFetch } from "../../../hoc/withDataFetch"; // HOC import
import { PostData, PostFilteredArray } from "../../types/common";

interface CategoryPageProps extends PostFilteredArray {
  allPostsData: PostData[]; // 추가된 부분
}

const CategoryPage: React.FC<CategoryPageProps> = ({ posts, allPostsData }) => {
  const router = useRouter();
  const { category } = router.query;
  const [currentPosts, setPosts] = useState<PostData[]>(posts ?? []);

  return (
    <>
      <div className="prose dark:prose-invert pt-10">
        <h1>
          POST in <span className="uppercase tracking-wider">{category}</span>
        </h1>
        <ul>
          {currentPosts.length &&
            currentPosts.map((post, index) => (
              <li key={index}>
                <Link href={`${post.category}/${post.id}`}>{post.title}</Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default withDataFetch(CategoryPage); // HOC 적용

export async function getStaticPaths(context: GetStaticPropsContext) {
  const koCategories = getAllCategories(context.locale ? context.locale : "ko");
  const koPaths = koCategories.map((category) => ({
    params: { locale: "ko", category },
  }));
  const enPaths = koCategories.map((category) => ({
    params: { locale: "en", category },
  }));

  const paths = [...koPaths, ...enPaths];
  return { paths, fallback: false };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  const locale = context.locale ?? "ko"; // 로케일 정보 가져오기
  const category = params?.category as string;

  const posts = getPostsByCategory(locale, category);
  const allPostsData = getSortedPostsData(locale); // allPostsData 생성

  return { props: { posts, allPostsData } }; // allPostsData 추가
}
