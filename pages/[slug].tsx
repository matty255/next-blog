import fs from 'fs';
import matter from 'gray-matter';
import md from 'markdown-it';
import {Detail, ctx} from "../types/types"
import { getPostBySlug, getAllPosts } from '../lib/api'
import markdownToHtml from '../lib/markdownToHtml'
import {PostType} from "../types/types"
import markdownStyles from '../styles/markdown-styles.module.css'



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

export async function getStaticProps({ params: { slug } }: ctx) {
  const post = getPostBySlug(slug, [
    'slug',
    'title',
    'image',
    'description',
    'date',
    'featured',
    'content'
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export default function Post({ post }: PostType) {

  return (
    <div>
        <p>{post.title}</p>
        <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  )
}
