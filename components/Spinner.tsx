import React from 'react';
import styled from 'styled-components';

const Spinner = () => {
    return (<>
    <Outer>
        <InnerBox>
           🐧로딩중...
        </InnerBox>
    </Outer>
    </>)
}

export default Spinner;

const Outer = styled.div`
    background-color: #0e1086;
    width: 100%;
    height: 100%;
    position: fixed;
`

const InnerBox = styled.div`
position: absolute;
top: 50%;
left: 40%;
font-size: 3rem;
color: #fff;
`