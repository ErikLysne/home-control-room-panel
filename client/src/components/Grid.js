import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;
`;

function Grid(props) {
    return <Container>{props.children}</Container>;
}

export default Grid;
