import fs from 'fs';
import matter from 'gray-matter';
import md from 'markdown-it';
import {Detail, ctx} from "../types/types"
import useSWR, {SWRConfig} from 'swr';
import { useRouter } from 'next/router';
import axios from 'axios';
import {unified} from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import parse from 'html-react-parser';

const fetcher = (url:string) => axios.get(url).then(res => res.data)

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
  // const article = await getPostFromAPI()
  const fileName = fs.readFileSync(`__posts/${slug}.md`, 'utf-8');
  const { data: frontmatter, content } = matter(fileName);

  return {
    props: {
      fallback: {
        [slug] : 
        {frontmatter, content}
      },
    }
  };
}

export default function PostPage({ fallback }:Detail) {
  const router = useRouter();
  const title = router.query.slug as string;
  const { data, error } = useSWR(title, fetcher)
  const a = data || ""

  return (
    <SWRConfig value={{ fallback, refreshInterval: 3000 }}>
      {fallback !== undefined ? 
       <div>
       <h1>{fallback[title].frontmatter.title}</h1>
       <h1>{fallback[title].frontmatter.description}</h1>
       <h1>{fallback[title].frontmatter.date}</h1>
       <h1>{fallback[title].frontmatter.featured}</h1>
       <div dangerouslySetInnerHTML={{ __html: md().render(fallback[title].content) }} />
       </div> : <>{parse(a)}</>
      }
     
    </SWRConfig>
  );
}