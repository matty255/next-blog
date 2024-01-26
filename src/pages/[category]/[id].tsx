import { motion } from "framer-motion";
import Head from "next/head";
import Date from "../../common/Date";
import { profile } from "../../constants/profile";
import {
  getAllPostIds,
  getPostData,
  getSortedPostsData,
} from "../../lib/MakePosts";
import {
  BlogContextProps,
  PostContentData,
  PostData,
} from "../../types/common";

import Link from "next/link";
import { withDataFetch } from "../../../hoc/withDataFetch";

function Post({
  postData,
  prevPost,
  nextPost,
  allPostsData, // 추가된 부분
}: PostContentData & { allPostsData: PostData[] }) {
  console.log(postData, "postData");
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
        className="prose dark:prose-invert max-w-none"
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
        <div dangerouslySetInnerHTML={{ __html: postData.description }}></div>
        <br /> <Date dateString={postData.date} />
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </motion.div>
    </>
  );
}
export default withDataFetch(Post);

export async function getStaticPaths() {
  // getAllPostIds 함수는 이제 locale 매개변수를 받지 않으므로 아래와 같이 수정
  const allPaths = await getAllPostIds();
  const paths = allPaths.map((path) => ({
    params: {
      category: path.params.category,
      id: path.params.id,
    },
    locale: path.query.locale,
  }));
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps(context: BlogContextProps) {
  const { params, locale } = context;
  const { category, id } = params as { category: string; id: string };

  console.log(params);
  const postData = await getPostData(locale, category, id); // locale 정보를 context에서 가져옴
  const allPostsData = await getSortedPostsData(locale); // await 키워드 추가
  const allPostsParams = await getAllPostIds(); // await 키워드 추가, locale 매개변수 제거

  const currentIndex = allPostsData.findIndex((post) => post.id === id);
  const prevPost = allPostsData[currentIndex - 1] || null;
  const nextPost = allPostsData[currentIndex + 1] || null;

  const props: {
    postData: typeof postData;
    prevPost?: typeof prevPost;
    nextPost?: typeof nextPost;
    allPostsData: typeof allPostsData;
    allPostsParams: typeof allPostsParams; // 이 줄을 추가
  } = {
    postData,
    allPostsData,
    allPostsParams, // 이 줄을 추가
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
