
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
// import matter from 'gray-matter';

export default function Handler(
  title:string, req: NextApiRequest,
  res: NextApiResponse
) {

  const filePath = path.join('./__post', `${title}.md`);
  const fileData = fs.readFileSync(filePath);
  const data = JSON.stringify(fileData);
  return res.status(200).json({ message: "Success!", feedback: data })}
