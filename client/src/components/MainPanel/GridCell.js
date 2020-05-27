import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    grid-column-start: ${(props) => props.column.start};
    grid-column-end: ${(props) => props.column.end};
    grid-row-start: ${(props) => props.row.start};
    grid-row-end: ${(props) => props.row.end};
    border-style: solid;
    border-width: 1px;
    border-color: rgba(211, 226, 252, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    &::after {
        content: " ";
        position: absolute;
        top: 3px;
        left: 3px;
        right: 3px;
        bottom: 3px;
        z-index: -1;
        border-style: solid;
        border-width: 1px;
        border-color: rgba(211, 226, 252, 0.5);
    }
`;

function GridCell(props) {
    const { row, column, children } = props;
    return (
        <Container row={row} column={column}>
            {children}
        </Container>
    );
}

export default GridCell;
