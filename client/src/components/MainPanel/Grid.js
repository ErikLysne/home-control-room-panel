import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: ${(props) =>
        `repeat(${props.rows}, ${100.0 / props.rows}%)`};
    grid-template-columns: ${(props) =>
        `repeat(${props.columns}, ${100.0 / props.columns}%)`};
`;

function Grid(props) {
    const { rows, columns } = props;
    return (
        <Container rows={rows} columns={columns}>
            {props.children}
        </Container>
    );
}

Grid.defaultProps = {
    rows: 2,
    columns: 2
};

export default Grid;
