import type { NextPage } from 'next'
import Link from "next/link";
import React from "react";
import {Props, Posts } from "../types/types"
import styled from "styled-components";
import useSWR, { SWRConfig } from 'swr';
import axios from 'axios';
import { fetcher } from '../lib/fetcher';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';


const Home: NextPage<Props> = ({ allPosts }:Props) => {
  
  const { data, error } = useSWR(`/api/post`, fetcher, {fallbackData: allPosts});

  return (
    <Layout>
    <SWRConfig
    value={{
      fetcher,
      dedupingInterval: 10000,
    }}
  >
    <Box>
        <header><h1>Posts</h1></header>
        {data?.allPosts !== undefined ? data.allPosts.map((post:Posts) => (
        <div
          key={post.slug}
          className=""
        >
          <PostCard {...post} />
        </div>
      )) : <><div>로딩중입니다...</div></>}
</Box>
</SWRConfig>
</Layout>
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
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: auto;
gap: 3rem;
margin-bottom: 0.5rem;
`

