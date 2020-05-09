import React from "react";
import styled, { keyframes } from "styled-components";

const Button = styled.button`
    width: ${(props) => (props.size === "large" ? 192 : 101)}px;
    height: 101px;
    margin: auto 5px;
    ${(props) =>
        props.size === "large"
            ? "display: flex; justify-content: center; align-items: center;"
            : ""}
    border-style: none;
    background: url("${(props) =>
        props.size === "large"
            ? "/images/LargeButton.png"
            : props.size === "medium"
            ? "/images/MediumButton.png"
            : ""}");
    color: rgb(255, 255, 255);

    animation-name: ${(props) => (props.toggled ? buttonToggledKeyframes : "")};
    animation-duration: 0.5s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
`;

const buttonToggledKeyframes = keyframes`
    0% {
        box-shadow: 0 0 2px 2px rgba(8, 200, 255, 0.25);
    }
    100% {
        box-shadow: 0 0 4px 4px rgba(8, 200, 255, 0.25);
    }
`;

const LargeLabel = styled.div`
    width: 50%;
    height: 100%;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    opacity: ${(props) => (props.toggled ? 100 : 50)}%;
`;

const MediumLabel = styled.div`
    opacity: ${(props) => (props.toggled ? 100 : 50)}%;
`;

const Logo = styled.div`
    width: 50px;
    height: 50px;
    padding: 20px 0 5px;
    ${(props) => (props.size === "large" ? "float: right;" : "")};
    margin: auto auto;
    background-image: url(${(props) =>
        props.toggled ? props.iconOn : props.iconOff});
    background-repeat: no-repeat;
    background-position: center;
    opacity: ${(props) => (props.toggled ? 100 : 50)}%;
`;

function ToggleButton(props) {
    const handleClickEvent = (event) => {
        props.onClick(!props.state);
    };

    return (
        <Button
            size={props.size}
            toggled={props.state}
            onClick={handleClickEvent}
        >
            {props.size === "large" && (
                <LargeLabel toggled={props.state}>
                    {props.state ? props.labelOn : props.labelOff}
                </LargeLabel>
            )}
            <Logo
                toggled={props.state}
                iconOn={props.iconOn}
                iconOff={props.iconOff}
            />
            {props.size !== "large" && (
                <MediumLabel toggled={props.state}>
                    {props.state ? props.labelOn : props.labelOff}
                </MediumLabel>
            )}
        </Button>
    );
}

export default ToggleButton;
