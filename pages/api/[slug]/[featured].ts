import { NextApiResponse, NextApiRequest } from 'next'
import {Props, Posts} from "../../../types/types"
import { getAllPosts, getMorePosts } from '../../../lib/api'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Props>
) {
  const { query } = req;
  const { slug, featured } = query
  if (typeof featured === 'string' && typeof slug === 'string') {
    const allPosts = getMorePosts(slug, featured, [
    'slug',
    'title',
    'image',
    'description',
    'date',
    'featured'
  ])
  return res.status(200).json({allPosts})
}
}