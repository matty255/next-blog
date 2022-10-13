import React from 'react';
import styled from 'styled-components';
import Link from "next/link";
import {Posts} from "../types/types"
import Image from "next/image"

type Props = {
    title:string,
    date:string
}

const PostHeader = ({ title, date }:Props) => {

    return (<>

    <CardBox>
       <h2>{title}</h2>
       <div>
       <p>{date}</p>
       <Link href={"/"}><p className='home'>홈으로</p></Link>
       </div>
    </CardBox>

    </>)
}

export default PostHeader;

const CardBox = styled.div`
    font-family: Consolas, NanumGothic, Monaco, Andale Mono, monospace;
    width: 90vw;
    margin:auto;
    background-color: #f0f0f0;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    .home {
        cursor: pointer;
        &:hover {
            background-color: #f0f0f0;
        }
    }
`