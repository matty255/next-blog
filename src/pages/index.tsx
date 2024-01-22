import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import Date from "../common/Date";

import { getSortedPostsData } from "../lib/MakePosts";

import { motion } from "framer-motion";
import { profile } from "../constants/profile";

import { BlogContextProps, PostData, PostSortedArray, RadioList } from "@/types/common";

import RadioPlayer from "@/components/AddOns/RadioPlayer";
import { getRadioData } from "@/lib/MakeRadios";
import dynamic from "next/dynamic";
import { withDataFetch } from "../../hoc/withDataFetch";

function Home({ allPostsData, allCategories, radioFiles }: PostSortedArray & RadioList) {
  const { siteTitle, description, url, banner } = profile;
  const [viewCategory, setCategory] = useState("all");
  const [wordIndex, setWordIndex] = useState(0);

  // console.log(allPostsData);
  const AnimatedText = dynamic(() => import("../common/AnimatedText"), {
    ssr: false,
  });

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={siteTitle} />

        <meta property="description" content={description} />
        <meta property="og:description" content={description} />

        <meta property="og:image" content={banner} />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image" content={banner} />

        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={siteTitle} />
      </Head>

      <div className="prose dark:prose-invert ">
        <section>
          <h1 className="text-3xl font-bold underline"></h1>
        </section>

        <section>
          {/* <TypingAnimationText
            words={TypingAnimationArray}
            wordIndex={wordIndex}
            setWordIndex={setWordIndex}
          /> */}
        </section>
        {/* <section className="inline-flex gap-3">
          {allCategories.map((category: string) => (
            <Chip
              key={category}
              onClick={() => setCategory(category)}
              content={category}
            />
          ))}
        </section> */}

        <section>
          <div className="h-24 flex">
            <RadioPlayer radioFiles={radioFiles} />
          radioFiles
         <AnimatedText text={"블로그에 오신 것을 환영합니다."} />
          </div>
          <ul>
            {allPostsData.map(
              ({ id, category, date, title, image }: PostData) => (
                <motion.article
                  key={id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <li
                    style={{
                      display:
                        viewCategory === category || viewCategory === "all"
                          ? "block"
                          : "none",
                    }}
                  >
                    <Link href={`/[category]/[id]`} as={`/${category}/${id}`}>
                      {title}
                    </Link>
                    <br />
                    <small>
                      <Date dateString={date} />
                    </small>
                    <br />
                    {/* <Image src={image} alt={id} layout="fill" objectFit="cover" /> */}
                  </li>
                </motion.article>
              )
            )}
          </ul>
        </section>
      </div>
    </>
  );
}

export default withDataFetch(Home);

export async function getStaticProps(context: BlogContextProps) {
  const locale = context.locale ?? "ko-KR"; // context에서 locale 가져오기
  const allPostsData = await getSortedPostsData(locale); // await 키워드 추가
  const allCategories: string[] = Array.from(
    new Set(allPostsData.map((post) => post.category))
  );

  const radioFiles = await getRadioData();

  return {
    props: {
      allPostsData,
      allCategories,
      radioFiles
    },
  };
}

// getStaticProps를 getServerSideProps로 변경
// export async function getServerSideProps() {
//   const allPostsData = getSortedPostsData();
//   const allCategories = Array.from(
//     new Set(allPostsData.map((post) => post.category))
//   );

//   return {
//     props: {
//       allPostsData,
//       allCategories,
//     },
//   };
// }
