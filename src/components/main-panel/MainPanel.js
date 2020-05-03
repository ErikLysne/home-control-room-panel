import React from "react";
import styled from "styled-components";
import LightSlider from "./../light-slider/LightSlider";

const Wrapper = styled.div`
    width: 96%;
    height: 460px;
    position: absolute;
    top: 220px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    background-color: rgb(26, 26, 26);
`;

function MainPanel() {
    return (
        <Wrapper>
            <LightSlider />
        </Wrapper>
    );
}

export default MainPanel;
