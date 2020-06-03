import React from "react";
import styled, { keyframes } from "styled-components";

const Button = styled.button`
    width: 192px;
    height: 101px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: auto 5px;
    border-style: none;
    color: rgb(200, 220, 230);
    animation: ${(props) => (props.toggled ? buttonToggledKeyframes : "")};
    animation-duration: 0.5s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    background: url("/images/LargeButton.png");
`;

const buttonToggledKeyframes = keyframes`
    0% {
        box-shadow: 0 0 2px 2px rgba(211, 226, 252, 0.25);
    }
    100% {
        box-shadow: 0 0 4px 4px rgba(211, 226, 252, 0.25);
    }
`;

const opacity = (toggled) => (toggled ? 1 : 0.5);

const Label = styled.div`
    font-size: 1.5rem;
    text-align: center;
    opacity: ${(props) => opacity(props.toggled)};
`;

function ToggleButton(props) {
    const { toggled, label, onClick } = props;

    const handleClickEvent = () => {
        onClick(!toggled);
    };

    return (
        <>
            <Button toggled={toggled}>
                <Label toggled={toggled}>{label}</Label>
            </Button>
        </>
    );
}

export default ToggleButton;
