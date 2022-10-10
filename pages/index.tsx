import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import React from "react";
import {Props, Posts} from "../types/types"
import fs from "fs";
import matter from "gray-matter"
import styled from "styled-components";

const Home: NextPage<Props> = ({posts}:Props) => {

  return (
    <div>
      <Header>Blog.</Header>
    <Box>
        {/* <Image src={process.env.BACKEND_URL + '/pikaa.webp'} alt="" width={400} height={400} /> */}
        {posts.map(({ slug, frontmatter }) => (
        <div
          key={slug}
          className=""
        >
          <Link href={`/${slug}`}>
            <a>
              <h2 className='title'>{frontmatter.title}</h2>
            </a>
          </Link>
        </div>
      ))}
</Box>
    </div>
  )
}

export default Home





export async function getStaticProps() {

  const files = fs.readdirSync('__posts');

  const posts: Posts[] = files.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const readFile = fs.readFileSync(`__posts/${fileName}`, 'utf-8');
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

const Box = styled.div`
max-width: 768px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: auto;
gap: 3rem;
`

const Header = styled.header`
background-color: aliceblue;
font-size: 5rem;
margin-bottom: 2rem;
padding: 2rem;
`
