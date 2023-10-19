import Head from "next/head";
import Layout from "@/layout";
import Date from "../../common/Date";
import {
  getAllPostIds,
  getPostData,
  getSortedPostsData,
} from "../../lib/MakePosts";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { PostContentData, PostData, PostIdParams } from "../../types/common";
import { profile } from "../../constants/profile";
import { useRecoilState } from "recoil";

import Link from "next/link";
import { withDataFetch } from "../../../hoc/withDataFetch";

function Post({
  postData,
  prevPost,
  nextPost,
  allPostsData, // 추가된 부분
}: PostContentData & { allPostsData: PostData[] }) {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={postData.title} />

        <meta property="description" content={postData.description} />
        <meta property="og:description" content={postData.description} />

        <meta property="og:image" content={postData.image} />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image" content={postData.image} />

        <meta property="og:url" content={postData.url} />
        <meta property="og:site_name" content={profile.siteTitle} />
      </Head>
      <motion.div
        className="prose dark:prose-invert"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md pt-10 mt-4"
        >
          <h1 className="text-2xl font-bold mb-2">{postData.title}</h1>
          <div className="flex justify-between text-sm">
            {prevPost !== undefined ? (
              <Link href={`/${prevPost.category}/${prevPost.id}`} passHref>
                <span className="text-slate-500 dark:text-slate-400 hover:underline  cursor-pointer">
                  이전 글: {prevPost.title}
                </span>
              </Link>
            ) : (
              <span className="text-gray-400 dark:text-gray-600">
                이전 글 없음
              </span>
            )}
            {nextPost !== undefined ? (
              <Link href={`/${nextPost.category}/${nextPost.id}`} passHref>
                <span className="text-slate-500 dark:text-slate-400 hover:underline  cursor-pointer">
                  다음 글: {nextPost.title}
                </span>
              </Link>
            ) : (
              <span className="text-gray-400 dark:text-gray-600">
                다음 글 없음
              </span>
            )}
          </div>
        </motion.div>
        <p>{postData.description}</p>
        <br />
        <Date dateString={postData.date} />
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </motion.div>
    </>
  );
}
export default withDataFetch(Post);

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: PostIdParams) {
  const postData = await getPostData(params.category, params.id);
  const allPostsData = getSortedPostsData();
  const allPostsParams = getAllPostIds();

  const currentIndex = allPostsData.findIndex((post) => post.id === params.id);
  const prevPost = allPostsData[currentIndex - 1] || null;
  const nextPost = allPostsData[currentIndex + 1] || null;

  const props: {
    postData: typeof postData;
    prevPost?: typeof prevPost;
    nextPost?: typeof nextPost;
    allPostsData: typeof allPostsData;
  } = {
    postData,
    allPostsData,
  };

  if (prevPost) {
    props.prevPost = prevPost;
  }

  if (nextPost) {
    props.nextPost = nextPost;
  }

  return {
    props,
  };
}

// // getStaticPaths와 getStaticProps를 제거하고 getServerSideProps를 사용
// export async function getServerSideProps(context: PostIdParams) {
//   const { params } = context;
//   const postData = await getPostData(params.category, params.id);

//   // 페이지가 존재하지 않는 경우 404 페이지를 보여줍니다.
//   if (!postData) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       postData,
//     },
//   };
// }
