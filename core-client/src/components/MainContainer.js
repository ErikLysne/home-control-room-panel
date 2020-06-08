import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;

    & > * {
        float: left;
    }
`;

function MainContainer(props) {
    const { children } = props;

    return <Container>{children}</Container>;
}

export default MainContainer;
