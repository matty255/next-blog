// scripts/copyFile.js

const fs = require('fs');
const path = require('path');

const copyFile = () => {
  const sourcePath = path.join(__dirname, '../posts/radio/I Want To Live.mp3');
  const destPath = path.join(__dirname, '../public/song.mp3');

  try {
    fs.copyFileSync(sourcePath, destPath);
    console.log('파일이 성공적으로 복사되었습니다.');
  } catch (error) {
    console.error('파일 복사 중 오류 발생:', error);
  }
};

copyFile();
