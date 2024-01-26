import {
  getAllCategories,
  getPostsByCategory,
  getSortedPostsData,
} from "@/lib/MakePosts"; // getSortedPostsData 추가
import { GetStaticPropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { categoryList } from "../../../constants/category";
import { withDataFetch } from "../../../hoc/withDataFetch"; // HOC import
import {
  BlogContextProps,
  CategoryLocale,
  Locale,
  PostData,
  PostFilteredArray,
} from "../../types/common";

interface CategoryPageProps extends PostFilteredArray {
  allPostsData: PostData[]; // 추가된 부분
  locale: Locale; // 추가된 부분
}

const CategoryPage: React.FC<CategoryPageProps> = ({ posts, allPostsData }) => {
  const router = useRouter();
  const { locale } = router;
  const { category } = router.query;
  const [currentPosts, setPosts] = useState<PostData[]>(posts ?? []);

  const translateCategory = (
    category: string | undefined,
    locale: string | undefined
  ) => {
    // Ensure locale is one of the keys in CategoryMapping
    const safeLocale: keyof CategoryLocale =
      locale === "ko-KR" || locale === "en-US" ? locale : "ko-KR";

    const translated = categoryList.find(
      (cat) => cat[safeLocale] === category || cat["ko-KR"] === category
    );
    return translated ? translated[safeLocale] : category;
  };

  console.log(posts, allPostsData);

  return (
    <>
      <div className="prose dark:prose-invert pt-10">
        <h1>
          POST in{" "}
          <span className="uppercase tracking-wider">
            {translateCategory(category?.toString(), locale)}
          </span>
        </h1>
        <ul>
          {currentPosts.length &&
            currentPosts.map((post, index) => (
              <li key={index}>
                <Link
                  href={`${translateCategory(category?.toString(), locale)}/${
                    post.id
                  }`}
                >
                  {post.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default withDataFetch(CategoryPage); // HOC 적용

export async function getStaticPaths(context: BlogContextProps) {
  const koCategories = await getAllCategories(
    context.locale ? context.locale : "ko-KR"
  );

  const koPaths = koCategories.map((category: string) => ({
    params: { locale: "ko-KR", category },
  }));
  const enPaths = koCategories.map((category: string) => ({
    params: { locale: "en-EN", category },
  }));

  const paths = [...koPaths, ...enPaths];
  return { paths, fallback: false };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale, params } = context;
  const category = params?.category as string;

  // 현재 로케일과 카테고리에 맞는 게시글을 가져옴
  const posts = await getPostsByCategory(locale, category);
  // 추가: 모든 로케일에 대한 데이터를 불러옴
  const allPostsData = {
    "ko-KR": await getSortedPostsData("ko-KR"),
    "en-US": await getSortedPostsData("en-US"),
  };

  return {
    props: {
      posts,
      allPostsData, // 모든 로케일의 데이터를 props로 전달
      locale,
    },
  };
}
