import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

        const { file } = req.query;
      
        // file이 배열인 경우 첫 번째 요소를 사용하도록 수정
        const filePath = typeof file === 'string' ? file : Array.isArray(file) ? file[0] : undefined;
      
        if (filePath) {
          const fullPath = path.join(process.cwd(), 'posts/radio', filePath);
      
          try {
            const fileData = await fs.promises.readFile(fullPath);
            res.setHeader('Content-Type', 'audio/mpeg');
            res.status(200).end(fileData);
          } catch (error) {
            console.error('Failed to read radio file:', error);
            res.status(404).end('File not found');
          }
        } else {
          res.status(404).end('File not found');
        }
      }
      