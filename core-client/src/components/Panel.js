import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 50%;
    height: 80%;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: rgba(5, 17, 25, 0.75);
    box-shadow: 0px 0px 5px 2px rgba(211, 226, 252, 0.75);
    color: rgb(200, 220, 230);
`;

const Heading = styled.div`
    width: 100%;
    height: 3rem;
    font-size: 1.5rem;
    line-height: 3rem;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    border-color: rgba(211, 226, 252, 0.5);
    background-color: rgba(38, 39, 44, 0.5);
`;

function Panel(props) {
    const { title, children } = props;

    return (
        <Container>
            <Heading>{title}</Heading>
            {children}
        </Container>
    );
}

export default Panel;
