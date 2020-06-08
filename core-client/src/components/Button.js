import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    width: 100px;
    height: 50px;
    margin: 10px;
    display: inline-block;
    border-style: solid;
    border-width: 2px;
    border-radius: 5px;
    border-color: ${(props) => props.color.border};
    background-color: ${(props) => props.color.fill};
    font-size: 1.25rem;
    color: rgb(255, 255, 255);
`;

function Button(props) {
    const { label, color, onClick } = props;

    const buttonColor = {};

    switch (color) {
        case "green":
            buttonColor.fill = "rgb(40, 167, 69)";
            buttonColor.border = "rgb(140, 255, 169)";
            break;
        case "red":
            buttonColor.fill = "rgb(220, 53, 69)";
            buttonColor.border = "rgb(255, 153, 169)";
            break;
        default:
            buttonColor.fill = "rgb(40, 167, 69)";
            buttonColor.border = "rgb(140, 255, 169)";
            break;
    }

    return (
        <StyledButton onClick={onClick} color={buttonColor}>
            {label}
        </StyledButton>
    );
}

export default Button;
