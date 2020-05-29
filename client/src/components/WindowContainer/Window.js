import React, { useState } from "react";
import Draggable from "react-draggable";
import styled, { keyframes } from "styled-components";
import ToggleButton from "../ToggleButton";

const Container = styled.div`
    width: ${(props) =>
        props.windowTransitionState ? props.dimensions.width : 0}px;
    height: ${(props) =>
        props.windowTransitionState ? props.dimensions.height : 0}px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: rgb(6, 31, 46);
    box-shadow: 0px 0px 5px 2px rgba(211, 226, 252, 0.75);
    opacity: 0.9;
    overflow: hidden;
    animation: ${(props) =>
        props.windowTransitionState
            ? openingAnimation(props.dimensions)
            : closingAnimation(props.dimensions)};
    animation-duration: ${(props) => props.transitionDuration}ms;
`;

const openingAnimation = (dimensions) => keyframes`
    0% {
        height: 25px;
        width: 0;
        opacity: 0;
    }

    50% {
        height: 25px;
        width: ${dimensions.width}px;
        opacity: 0.5;
    }

    100% {
        height: ${dimensions.height}px;
        width: ${dimensions.width}px;
        opacity: 0.9;
    }
`;

const closingAnimation = (dimensions) => keyframes`
    0% {
        height: ${dimensions.height}px;
        width: ${dimensions.width}px;
    }

    50% {
        height: 25px;
        width: ${dimensions.width}px;
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

const OutlineContainer = styled.div`
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
`;

const OutlineContainerTop = styled(OutlineContainer)`
    top: 25px;
`;

const OutlineContainerBottom = styled(OutlineContainer)`
    bottom: 0;
`;

const Outline = styled.div`
    width: 75%;
    height: 25px;
    background-color: rgba(255, 255, 255, 0.25);
`;

const OutlineTop = styled(Outline)`
    transform: perspective(100px) rotateX(-45deg);
`;

const OutlineBottom = styled(Outline)`
    transform: perspective(100px) rotateX(45deg);
`;

const ButtonContainer = styled.div`
    position: absolute;
    bottom: 35px;
    left: 50%;
    transform: translateX(-50%);
`;

function Window(props) {
    const { dimensions, title, onClose, transitionDuration, children } = props;
    const [windowTransitionState, setWindowTransitionState] = useState(true);

    const handleClickEvent = () => {
        setWindowTransitionState(false);
        setTimeout(() => {
            onClose();
        }, 1000);
    };
    return (
        <Draggable handle=".handle">
            <Container
                windowTransitionState={windowTransitionState}
                dimensions={dimensions}
                transitionDuration={transitionDuration}
            >
                {children}
                <ButtonContainer>
                    <ToggleButton
                        onClick={handleClickEvent}
                        size="small"
                        label={{
                            default: "Close"
                        }}
                        icon={{
                            default: "/images/icons/Close.png"
                        }}
                    />
                </ButtonContainer>
                <OutlineContainerTop>
                    <OutlineTop />
                </OutlineContainerTop>
                <OutlineContainerBottom>
                    <OutlineBottom />
                </OutlineContainerBottom>
                <HeaderBar className="handle">{title}</HeaderBar>
            </Container>
        </Draggable>
    );
}

Window.defaultProps = {
    dimensions: {
        width: 400,
        height: 400
    },
    transitionDuration: 1000
};

export default Window;
