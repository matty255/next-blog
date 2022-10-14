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
    const lazyRoot = React.useRef(null)
    
    return (<>
    <Link href={`/${post.slug}`}>
    <CardBox ref={lazyRoot}>
        <TitleBox>
       <h2>{post.title}</h2>
       <span>{post.date}</span>
       <p>{post.description}</p>
       </TitleBox>
       <CoverImage lazyRoot={lazyRoot} src={post.image} alt="" width={150} height={150} placeholder="blur" blurDataURL={"./1x1-ffff007f.png"} />
    </CardBox>
    </Link>
    </>)
}

export default PostCard;

const CardBox = styled.div`
    font-family: HelveticaNeue-Light, 'IBM Plex Sans KR', AppleSDGothicNeo-Light, sans-serif;
    width: 80vw;
    max-width: 60rem;
    min-height: 10rem;
    margin: auto;
    border: 3px solid #333333;
    padding: 1rem;
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
    cursor: pointer;
    &:hover {
        border-color: #6675fd;
        }
    &:active {
    scale: 105%;
    }

`

const TitleBox = styled.div`
     width: 50%;
     color: #333333;
     margin-bottom: 0.5rem;
     height: 4rem;
     letter-spacing: 0.06rem;
    h2 {
        font-weight: 600;
        letter-spacing: 0.2rem;
        width:100%;
        max-width: 30rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
        display: block;
        /* color: #333333; */
    }
    p {
        position: relative;
        left: 0%;
        top: 0%;
        width: 90%;
        max-width: 30rem;
        overflow: hidden;
        /* white-space: nowrap; */
        text-overflow: ellipsis;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    span {
        position: relative;
        left: 0.2%;
        width: 90%;
        max-width: 30rem;
        bottom: 10%;
        overflow: hidden;
        color: #777777;
        /* white-space: nowrap; */
        text-overflow: ellipsis;
        word-break: break-all;
        /* display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical; */
    }
`

const CoverImage = styled(Image)`
    background-color: #e4e4e4;
    position: relative;
    background-position: center center;
    background-repeat: no-repeat;
    object-fit: cover;
`