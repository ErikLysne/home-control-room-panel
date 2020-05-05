import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    width: 101px;
    height: 101px;
    margin: auto 5px;
    border-style: none;
    background: url("/images/Button.png");
    color: rgb(255, 255, 255);
`;

const ButtonLogo = styled.div`
    height: 50px;
    width: 100%;
    padding: 20px 0 5px;
    background-image: url(${(props) => props.icon});
    background-repeat: no-repeat;
    background-position: center;
`;

function Button(props) {
    return (
        <StyledButton>
            <ButtonLogo icon={props.icon} />
            {props.label}
        </StyledButton>
    );
}

export default Button;
