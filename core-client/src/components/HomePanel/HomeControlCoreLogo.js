import React from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
    width: 275px;
    height: 275px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;

    & > * {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
    }
`;

const Logo = styled.div`
    width: 163px;
    height: 65px;
    background-image: url("/images/HomeControlCoreLogo.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
`;

const Spinner = styled.div`
    width: 275px;
    height: 275px;
    background-image: url("/images/BigSpinner.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    animation: ${() => animation};
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
`;

const animation = keyframes`
    0% {
        transform: rotate(0deg);
        opacity: 0.0;
    }
    50% {
        transform: rotate(180deg);
        opacity: 0.5;
    }
    100% {
        transform: rotate(360deg);
        opacity: 0.0;
    }
`;

function HomeControlCoreLogo() {
    return (
        <Container>
            <Spinner />
            <Logo />
        </Container>
    );
}

export default HomeControlCoreLogo;
