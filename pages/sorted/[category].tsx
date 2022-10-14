import { ctx } from "../../types/types"
import { getPostBySlug, getAllPosts } from '../../lib/api'
import {PostType, Props, Posts} from "../../types/types"
import { fetcher } from '../../lib/fetcher';
import useSWR, { SWRConfig } from 'swr';
import { useRouter } from 'next/router'
import axios, { AxiosError } from 'axios';
import Layout from '../../components/Layout';
import styled from "styled-components";
import PostCard from "../../components/PostCard";
import Link from "next/link";

export async function getStaticPaths() {

  const posts = getAllPosts(['slug','category'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
            slug: post.slug,
          category: post.category,
        },
      }
    }),
    fallback: false,
  }
}


export const getStaticProps = async ({ params: { slug, category } }: ctx) => {
  try {
    const res = await axios.get(`/api/category/${category}`);
    return {
      props: {
        allPosts:  res.data,
      },
    };
  } catch (error) {
    return {props: {props:"error"}}
  }
};

export default function ListedCategory({ allPosts }: Props) {
  const { query } = useRouter()
  const { data, error } = useSWR(() => query.category && `/api/category/${query.category}`, fetcher);
  // console.log(data)

  return (
    <Layout>
    <SWRConfig
    value={{
      fetcher,
      dedupingInterval: 10000,
    }}
  >
    
     <Box>
        <header><h1>Search Result : {query.category}</h1> <Link href={"/"}>홈으로 돌아가기☕</Link></header>
        {data?.allPosts !== undefined ? data.allPosts.map((post: Posts) => (
        <div
          key={post.slug}
          className=""
        >
          <PostCard {...post} />
        </div>
      )) : <><div>카테고리가 비어있습니다...</div></>}
</Box>
    </SWRConfig>
    </Layout>
  )
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60rem;
  margin:auto;
  min-height: 100vh;
  display: flex;
  gap: 3rem;
  margin-bottom: 0.5rem;
  /* border: 3px solid #333333; */
`

// export async function getStaticProps({ params: { slug } }: ctx) {
//   const post = getPostBySlug(slug, [
//     'slug',
//     'title',
//     'image',
//     'description',
//     'date',
//     'featured',
//     'content'
//   ])
//   const content = await markdownToHtml(post.content || '')

//   return {
//     props: {
//       post: {
//         ...post,
//         content,
//       },
//     },
//   }
// }