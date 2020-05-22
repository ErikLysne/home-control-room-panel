import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import ToggleButton from "../toggle-button/ToggleButton";

const Container = styled.div`
    width: ${(props) => (props.windowTransitionState ? 400 : 0)}px;
    height: ${(props) => (props.windowTransitionState ? 400 : 0)}px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(38, 39, 44);
    box-shadow: 0px 0px 5px 2px rgba(50, 90, 110, 0.75);
    opacity: 0.9;
    overflow: hidden;
    animation: ${(props) =>
            props.windowTransitionState ? openingAnimation : closingAnimation}
        1000ms;
`;

const openingAnimation = keyframes`
    0% {
        height: 25px;
        width: 0;
        opacity: 0;
    }

    50% {
        height: 25px;
        width: 400px;
        opacity: 0.5;
    }

    100% {
        height: 400px;
        width: 400px;
        opacity: 0.9;
    }
`;

const closingAnimation = keyframes`
    0% {
        height: 400px;
        width: 400px;
    }

    50% {
        height: 25px;
        width: 400px
    }

    100% {
        height: 25px;
        width: 0;
    }
`;

const HeaderBar = styled.div`
    width: 100%;
    height: 25px;
    line-height: 25px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(135, 179, 222, 0.5);
    text-align: center;
    color: rgb(255, 255, 255);
`;

const ButtonContainer = styled.div`
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
`;

function Window(props) {
    const [windowTransitionState, setWindowTransitionState] = useState(true);

    const handleClickEvent = () => {
        setWindowTransitionState(false);
        setTimeout(() => {
            props.onClose();
        }, 1000);
    };
    return (
        <Container windowTransitionState={windowTransitionState}>
            {props.children}
            <ButtonContainer>
                <ToggleButton
                    state={false}
                    disabledWhenUntoggled={false}
                    label="Close"
                    icon="/images/icons/Close.png"
                    size="small"
                    onClick={handleClickEvent}
                />
            </ButtonContainer>
            <HeaderBar>{props.title}</HeaderBar>
        </Container>
    );
}

export default Window;
