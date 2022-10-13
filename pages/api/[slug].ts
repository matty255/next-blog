import { NextApiRequest, NextApiResponse } from 'next'
import {Props, PostType} from "../../types/types"
import { getPostBySlug, getAllPosts } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'

type ResponseError = {
  message: string
}

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse<PostType | ResponseError>
) {

  const { query } = req
  const { slug } = query
  if (typeof slug === 'string') {
    const post = getPostBySlug( slug, [
        'slug',
        'title',
        'image',
        'description',
        'date',
        'featured',
        'content'
      ])
    const content = await markdownToHtml(post.content || '')
    return content !== undefined
    ? res.status(200).json({post: {
        ...post,
        content,
      },})
    : res.status(404).json({ message: `User with id: not found.` })
  }

}