import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
    grid-column-start: ${(props) => props.columnStart};
    grid-column-end: ${(props) => props.columnEnd};
    grid-row-start: ${(props) => props.rowStart};
    grid-row-end: ${(props) => props.rowEnd};
    border-style: solid;
    border-width: 1px;
    border-color: rgba(211, 226, 252, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

function GridCell(props) {
    return (
        <Container
            columnStart={props.columnStart}
            columnEnd={props.columnEnd}
            rowStart={props.rowStart}
            rowEnd={props.rowEnd}
        >
            {props.children}
        </Container>
    );
}

export default GridCell;
