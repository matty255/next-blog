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
    // console.log(content)
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
    min-width: 90%;
    width: 95vw;
    max-width: 59rem;
    margin:auto;
    padding: 0.97rem;
    display: flex;
    flex-direction: column;
    word-break: break-word;
`