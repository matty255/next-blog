import React from 'react';
import styled from 'styled-components';
import Link from "next/link";
import {Posts} from "../types/types"
import Image from "next/image"
import useSWR, { SWRConfig } from 'swr';
import { fetcher } from '../lib/fetcher';
import { useRouter } from 'next/router';
import {uid} from 'react-uid';

type Props = {
    slug: string;
    featured: number
}

const MorePosts = ({ slug, featured }:Props) => {
    const route = useRouter();
    const { data, error } = useSWR(() => featured && `/api/${slug}/${featured}`, fetcher);

    return (<>
    <CardBox>
    <SWRConfig
    value={{
      fetcher,
      dedupingInterval: 10000,
    }}
  >
    {data?.allPosts !== undefined ? data.allPosts.map((post:Posts) => (
        post === null ? <FlexBox
        key={uid(`${post}-a`)}
        className=""
      >없음
      </FlexBox> :
        <div
          key={uid(post.slug)}>
           
           <Link href={`/${post.slug}`}><PostLink> {route.query.slug === post.slug && <p>{post.date}</p>} {route.query.slug === post.slug ? <h2>{post?.title}</h2> : <><a><span>다음글 : </span>{post?.title}</a><span style={{color: "#cfcfcf"}}>...</span></> }</PostLink></Link>
        </div>
      )) : <><div>로딩중...</div></>}
       </SWRConfig>
       <Link href={"/"}><p className='home' title="home">☕</p></Link>
    </CardBox>

    </>)
}

export default MorePosts;

const CardBox = styled.div`
    color: #ffffff;
    font-family: Consolas, NanumGothic, Monaco, Andale Mono, monospace;
    min-width: 90%;
    width: 97vw;
    max-width: 60rem;
    margin:auto;
    min-height: 12rem;
    background-color: #0e1086;
    border-bottom: 5px solid #3d3d3d;
    padding: 1rem;
    margin: -1px;
    display: flex;
    flex-direction: column;
    .home {
        cursor: pointer;
        position: absolute;
        left: 10;
        margin: 10px;
        font-size: 2.5rem;
        &:hover {
          scale: 109%;
        }
    }
`

const FlexBox = styled.div`
    font-size: 1.2rem;
    padding: 0.4rem;
    text-align: right;
    color: #0e1086;
    
`

const PostLink = styled.div`
font-size: 1.2rem;
padding: 0.4rem;
text-align: right;

p {
    font-size: 0.8rem;
    color: #f0f0f0;
    position: relative;
    right: 5px;
    top: 15px;
    
}
a {
    cursor: pointer;
    color: #cfcfcf;
    overflow: hidden;
    white-space: nowrap;
    flex-grow: 0;
    text-overflow: ellipsis;
    word-break: break-all;
    max-width: 15rem;
    display: inline-flex;
    opacity: 60%;

    &:hover {
      color: #ffffff;
    }
   
}
`