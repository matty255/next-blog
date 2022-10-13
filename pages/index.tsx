import type { NextPage } from 'next'
import Link from "next/link";
import React from "react";
import {Props, Posts } from "../types/types"
import styled from "styled-components";
import useSWR, { SWRConfig } from 'swr';
import axios from 'axios';
import { fetcher } from '../lib/fetcher';

const basePath = process.env.BACKEND_URL

const Home: NextPage<Props> = ({ allPosts }:Props) => {
  
  const { data, error } = useSWR(`/api/post`, fetcher, {fallbackData: allPosts});
  return (
    <SWRConfig
    value={{
      fetcher,
      dedupingInterval: 10000,
    }}
  >
      <Header>Blog.</Header>
    <Box>
        {/* <Image src={process.env.BACKEND_URL + '/pikaa.webp'} alt="" width={400} height={400} /> */}
        {data?.allPosts !== undefined ? data.allPosts.map(({ slug, title }:Posts) => (
        <div
          key={slug}
          className=""
        >
          <Link href={`/${slug}`} key={title}>
            <a>
              <h2 className='title'>{title}</h2>
            </a>
          </Link>
        </div>
      )) : <><div>데이터</div></>}
</Box>
</SWRConfig>
  )
}

export default Home

export const getStaticProps = async () => {
  try {
    const res = await axios.get(`/api/post`);
    return {
      props: {
        allPosts:  res.data,
      },
    };
  } catch (error) {
    return {props: {props:"error"}}
  }
};


// export async function getStaticProps() {

//   const allPosts = getAllPosts([
//     'slug',
//     'title',
//     'image',
//     'description',
//     'date',
//     'featured'
//   ])

//   return {
//     props: { allPosts },
//   }
// }

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
