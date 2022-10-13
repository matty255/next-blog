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
       <Image src={'/pikaa.webp'} alt="" width={150} height={150} />
    </CardBox>
    </Link>
    </>)
}

export default PostCard;

const CardBox = styled.div`
    width: 100%;
    min-width: 50rem;
    max-width: 90%;
    background-color: #f0f0f0;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    &:hover {
        background-color: yellow;
        }
    &:active {
    scale: 110%;
    }
    img {
        flex-shrink: 0;
    }
`