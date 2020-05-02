import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 460px;
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
    return <Wrapper></Wrapper>;
}

export default MainPanel;
