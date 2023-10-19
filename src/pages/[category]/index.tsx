import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PostData, PostFilteredArray } from "../../types/common";
import Layout from "@/layout";
import {
  getAllCategories,
  getPostsByCategory,
  getSortedPostsData,
} from "@/lib/MakePosts"; // getSortedPostsData 추가
import Link from "next/link";
import { withDataFetch } from "../../../hoc/withDataFetch"; // HOC import

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

export async function getStaticPaths() {
  const categories = getAllCategories();
  const paths = categories.map((category) => ({
    params: { category: category.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: PostData) {
  const posts = getPostsByCategory(params.category);
  const allPostsData = getSortedPostsData(); // allPostsData 생성

  return { props: { posts, allPostsData } }; // allPostsData 추가
}
