import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
type Props = {
    children: React.ReactNode
  }

const Layout = ({children} : Props) => {
    return (<>
    <MainBox>
        {children}
        <Footer />
    </MainBox>
    </>)
}

export default Layout;

const MainBox = styled.div`
    /* background-color: #ffffde;
    height: 100vh; */
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
`