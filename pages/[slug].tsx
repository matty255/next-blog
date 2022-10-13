import {Detail, ctx} from "../types/types"
import { getPostBySlug, getAllPosts } from '../lib/api'
import {PostType} from "../types/types"
import { fetcher } from '../lib/fetcher';
import useSWR, { SWRConfig } from 'swr';
import { useRouter } from 'next/router'
import axios, { AxiosError } from 'axios';
import PostHeader from "../components/PostHeader";
import PostBody from "../components/PostBody";
import Layout from '../components/Layout';

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}


export const getStaticProps = async ({ params: { slug } }: ctx) => {
  try {
    const res = await axios.get(`/api/${slug}`);
    return {
      props: {
        post:  res.data,
      },
    };
  } catch (error) {
    return {props: {props:"error"}}
  }
};

export default function Post({ post }: PostType) {
  const { query } = useRouter()
  const { data, error } = useSWR(() => query.slug && `/api/${query.slug}`, fetcher, {fallbackData: post});
  // console.log(data)

  return (
    <Layout>
    <SWRConfig
    value={{
      fetcher,
      dedupingInterval: 10000,
    }}
  >
    {data?.post !== undefined && 
    <div>
    <PostHeader title={data.post.title} date={data.post.date} />
    <PostBody content={data.post.content} />
  </div>
   }   
    </SWRConfig>
    </Layout>
  )
}


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