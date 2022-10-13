// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Posts} from "../../types/types"
import axios from 'axios';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>
) {
  res.status(200).json({post: res})
}
