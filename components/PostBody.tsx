import React from 'react';
import styled from 'styled-components';
import markdownStyles from '../styles/markdown-styles.module.css'
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/default.css';

type Props = {
    content:string;
}


const PostBody = ({ content }:Props) => {

    React.useEffect(() => {
        hljs.highlightAll();
    }, []);
    hljs.registerLanguage('javascript', javascript);

    return (<>

    <CardBox>
    <div
    className={markdownStyles['markdown']}
    dangerouslySetInnerHTML={{ __html: content }}
  />
    </CardBox>

    </>)
}

export default PostBody;

const CardBox = styled.div`
    width: 90vw;
    margin:auto;
    background-color: #fffcfc;
    padding: 1rem;
    display: flex;
    justify-content: space-between;

`