import { NextApiResponse, NextApiRequest } from 'next'
import {Props, Posts} from "../../../types/types"
import { getPostsByCategory } from '../../../lib/api'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Props>
) {
  const { query } = req;
  const { category } = query
  if (typeof category === 'string') {
    const allPosts = getPostsByCategory(category, [
    'slug',
    'title',
    'image',
    'description',
    'date',
    'featured',
    'category'
  ])
  return res.status(200).json({allPosts})
}
}