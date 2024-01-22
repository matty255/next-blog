import fs from 'fs';
import path from 'path';

const radioDirectory = path.join(process.cwd(), 'posts/radio'); // 라디오 파일이 있는 경로

export async function getRadioData(): Promise<string[]> {
  try {
    const mp3Files = await fs.promises.readdir(radioDirectory); // 라디오 파일 목록 가져오기
    return mp3Files;
  } catch (error) {
    console.error('Failed to read radio directory:', error);
    // 에러 발생 시 빈 배열 반환 또는 에러 처리
    return [];
    // 또는: throw error;
  }
}


// const radioFiles = await getRadioData();
// console.log(radioFiles);
