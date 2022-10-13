import {Detail, ctx} from "../types/types"
import { getPostBySlug, getAllPosts } from '../lib/api'
import {PostType} from "../types/types"
import markdownStyles from '../styles/markdown-styles.module.css'
import { fetcher } from '../lib/fetcher';
import useSWR, { SWRConfig } from 'swr';
import { useRouter } from 'next/router'
import axios, { AxiosError } from 'axios';

const basePath = process.env.BACKEND_URL


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
    const res = await axios.get(`${basePath}/api/${slug}`);
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
  const { data, error } = useSWR(() => query.slug && `${basePath}/api/${query.slug}`, fetcher, {fallbackData: post});
  // console.log(data)

  return (
    <SWRConfig
    value={{
      fetcher,
      dedupingInterval: 10000,
    }}
  >
    {data?.post !== undefined && 
    <div>
    <p>{data.post.title}</p>
    <div
    className={markdownStyles['markdown']}
    dangerouslySetInnerHTML={{ __html: data.post.content }}
  />
  </div>
   }   
    </SWRConfig>
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