import { motion } from "framer-motion";
import Head from "next/head";
import Date from "../../common/Date";
import { profile } from "../../constants/profile";
import {
  getAllPostIds,
  getPostData,
  getSortedPostsData,
} from "../../lib/MakePosts";
import { PostContentData, PostData } from "../../types/common";

import { GetStaticPropsContext } from "next";
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
  const koPaths = getAllPostIds("ko").map((path) => ({
    params: {
      locale: "ko",
      category: path.params.category,
      id: path.params.id,
    },
  }));
  const enPaths = getAllPostIds("en").map((path) => ({
    params: {
      locale: "en",
      category: path.params.category,
      id: path.params.id,
    },
  }));
  const paths = [...koPaths, ...enPaths];
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  const locale = context.locale ?? "ko"; // 로케일 정보 가져오기
  const { category, id } = params as { category: string; id: string };

  console.log(params);
  const postData = await getPostData(locale, category, id); // 순서 변경
  const allPostsData = getSortedPostsData(locale);
  const allPostsParams = getAllPostIds(locale); // "ko"를 locale로 변경

  const currentIndex = allPostsData.findIndex((post) => post.id === id); // params.id를 id로 변경
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
