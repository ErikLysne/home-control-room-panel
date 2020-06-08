import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 50px;
    position: absolute;
    top: 0;
    left: 0;
`;

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-image: url("/images/LogoBar.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
`;

const Logo = styled.div`
    width: 280px;
    height: 35px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    background-image: url("/images/HomeControlLogo.png");
    background-repeat: no-repeat;
    background-position: center;
`;

function LogoBar() {
    return (
        <Container>
            <Background />
            <Logo />
        </Container>
    );
}

export default LogoBar;
