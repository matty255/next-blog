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
    console.log(content)
    React.useEffect(() => {
        hljs.highlightAll();
    }, []);
    hljs.registerLanguage('javascript', javascript);

    return (<>
    <CardBox
    className={markdownStyles['markdown']}
    dangerouslySetInnerHTML={{ __html: content }}
  />
    </>)
}

export default PostBody;

const CardBox = styled.div`
    max-width: 100%;
    margin:auto;
    background-color: #fffcfc;
    padding: 0.7rem;
    display: flex;
    flex-direction: column;
    word-break: break-word;
`