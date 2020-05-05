import React from "react";
import styled from "styled-components";
import Button from "../button/Button";

const Wrapper = styled.div`
    width: 96%;
    height: 120px;
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(26, 26, 26);
`;

function MainMenu() {
    return (
        <Wrapper>
            <Button label="Lights" icon="/images/icons/Lights.png" />
            <Button label="Sensors" icon="/images/icons/Sensors.png" />
            <Button label="Network" icon="/images/icons/Network.png" />
            <Button label="Settings" icon="/images/icons/Settings.png" />
        </Wrapper>
    );
}

export default MainMenu;
