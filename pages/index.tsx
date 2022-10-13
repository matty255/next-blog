import type { NextPage } from 'next'
import Link from "next/link";
import React from "react";
import {Props, Posts} from "../types/types"
import styled from "styled-components";
import { getAllPosts } from '../lib/api'
import useSWR, {SWRConfig} from 'swr';
import axios from 'axios';

const fetcher = (url:string) => axios.get(url).then(res => res.data)

const Home: NextPage<Props> = ({ allPosts }:Props) => {
  // console.log(allPosts)
  const { data, error } = useSWR('/', fetcher)

  return (
    <div>
      <Header>Blog.</Header>
    <Box>
        {/* <Image src={process.env.BACKEND_URL + '/pikaa.webp'} alt="" width={400} height={400} /> */}
        {allPosts?.map(({ slug, title }) => (
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
      ))}
</Box>
    </div>
  )
}

export default Home

export async function getStaticProps() {

  const allPosts = getAllPosts([
    'slug',
    'title',
    'image',
    'description',
    'date',
    'featured'
  ])

  return {
    props: { allPosts },
  }
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
