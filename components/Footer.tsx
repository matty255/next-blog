import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    return (<>
    <MainBox>
        <FlexBox>
           <p>github : https://github.com/matty255</p>
           <p>contact me : a@gmail.com</p>
        </FlexBox>
    </MainBox>
    </>)
}

export default Footer;

const MainBox = styled.div`
    background-color: #0e1086;
    min-height: 16rem;
    height: fit-content;
    width: 100%;
    max-width: 100%;
    margin: auto;
`

const FlexBox = styled.div`
padding: 2rem;
font-size: 2rem;
word-break: break-all;
color: #fff;
display: flex;
flex-direction: column;
`