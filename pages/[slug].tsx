import fs from 'fs';
import matter from 'gray-matter';
import md from 'markdown-it';
import {Detail, ctx} from "../types/types"

export async function getStaticPaths() {
  const files = fs.readdirSync('__posts');
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace('.md', ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }: ctx) {
  const fileName = fs.readFileSync(`__posts/${slug}.md`, 'utf-8');
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}

export default function PostPage({ frontmatter, content }: Detail) {
  return (
    <div>
      <h1>{frontmatter.title}</h1>
      <h1>{frontmatter.description}</h1>
      <h1>{frontmatter.date}</h1>
      <h1>{frontmatter.featured}</h1>
      <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
    </div>
  );
}