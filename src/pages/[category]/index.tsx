import {
  getAllCategories,
  getPostsByCategory,
  getSortedPostsData,
} from "@/lib/MakePosts"; // getSortedPostsData 추가
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { categoryList } from "../../../constants/category";
import { withDataFetch } from "../../../hoc/withDataFetch"; // HOC import
import {
  BlogContextProps,
  CategoryLocale,
  PostData,
  PostFilteredArray,
} from "../../types/common";

interface CategoryPageProps extends PostFilteredArray {
  allPostsData: PostData[]; // 추가된 부분
}

const CategoryPage: React.FC<CategoryPageProps> = ({ posts, allPostsData }) => {
  const router = useRouter();
  const { category } = router.query
  const [currentPosts, setPosts] = useState<PostData[]>(posts ?? []);

  const locale = (router.locale === 'ko-KR' || router.locale === 'en-US') ? router.locale : 'ko-KR';  
 
  const translateCategory = (category: string | undefined, locale: string) => {
    // Ensure locale is one of the keys in CategoryMapping
    const safeLocale: keyof CategoryLocale = (locale === 'ko-KR' || locale === 'en-US') ? locale : 'ko-KR';
  
    const translated = categoryList.find(cat => cat[safeLocale] === category || cat['ko-KR'] === category);
    return translated ? translated[safeLocale] : category;
  };


  return (
    <>
      <div className="prose dark:prose-invert pt-10">
        <h1>
          POST in <span className="uppercase tracking-wider">{translateCategory(category?.toString(), locale)}</span>
        </h1>
        <ul>
          {currentPosts.length &&
            currentPosts.map((post, index) => (
              <li key={index}>
                <Link href={`${translateCategory(category?.toString(), locale)}/${post.id}`}>{post.title}</Link>
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
export async function getStaticProps(context: BlogContextProps) {
  const { params } = context;
  const locale = context.locale ?? "ko-KR"; // 로케일 정보 가져오기
  const category = params?.category as string;

  const posts = await getPostsByCategory(locale, category); // await 키워드 추가
  const allPostsData = await getSortedPostsData(locale); // await 키워드 추가

  return { props: { posts, allPostsData } }; // allPostsData 추가
}
