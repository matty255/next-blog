import { NextApiResponse, NextApiRequest } from 'next'
import {Props, Posts} from "../../types/types"
import { getAllPosts } from '../../lib/api'

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Props>
) {
    const allPosts = getAllPosts([
    'slug',
    'title',
    'image',
    'description',
    'date',
    'featured'
  ])
  return res.status(200).json({allPosts})
}