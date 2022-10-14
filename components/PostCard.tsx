import React from 'react';
import styled from 'styled-components';
import Link from "next/link";
import {Posts} from "../types/types"
import Image from "next/image"

// type Props = {
//     slug : string, 
//     title: string,
//     image: string,
//     featured: number,
//     description: string,
//     date:string
//   }

const PostCard = (post :Posts) => {

    return (<>
    <Link href={`/${post.slug}`}>
    <CardBox>
       <h2>{post.title}</h2>
       <CoverImage src={post.image} alt="" width={150} height={150} priority />
    </CardBox>
    </Link>
    </>)
}

export default PostCard;

const CardBox = styled.div`
    font-family: Consolas, NanumGothic, Monaco, Andale Mono, monospace;
    width: 80vw;
    max-width: 60rem;
    min-height: 10rem;
    margin: auto;
    background-color: #f0f0f0;
    padding: 1rem;
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
    cursor: pointer;
    &:hover {
        background-color: yellow;
        }
    &:active {
    scale: 109%;
    }
    h2 {
        width:70%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
        display: block;
        color: #333333;
    }
`

const CoverImage = styled(Image)`
    background-color: #e4e4e4;
    position: relative;
    background-position: center center;
    background-repeat: no-repeat;
    object-fit: cover;
`