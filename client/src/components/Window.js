import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import ToggleButton from "./ToggleButton";

const Container = styled.div`
    width: ${(props) => (props.windowTransitionState ? props.width : 0)}px;
    height: ${(props) => (props.windowTransitionState ? props.height : 0)}px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(6, 31, 46);
    box-shadow: 0px 0px 5px 2px rgba(211, 226, 252, 0.75);
    opacity: 0.9;
    overflow: hidden;
    animation: ${(props) =>
            props.windowTransitionState
                ? openingAnimation(props.width, props.height)
                : closingAnimation(props.width, props.height)}
        1000ms;
`;

const openingAnimation = (width, height) => keyframes`
    0% {
        height: 25px;
        width: 0;
        opacity: 0;
    }

    50% {
        height: 25px;
        width: ${width}px;
        opacity: 0.5;
    }

    100% {
        height: ${height}px;
        width: ${width}px;
        opacity: 0.9;
    }
`;

const closingAnimation = (width, height) => keyframes`
    0% {
        height: ${height}px;
        width: ${width}px;
    }

    50% {
        height: 25px;
        width: ${width}px;
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
    background-color: rgba(0, 0, 0, 0.5);
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
        <Container
            windowTransitionState={windowTransitionState}
            width={props.width}
            height={props.height}
        >
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

Window.defaultProps = {
    width: 400,
    height: 400
};

export default Window;
