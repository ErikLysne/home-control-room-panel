import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 50%;
    height: 80%;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: rgba(5, 17, 25, 0.75);
    box-shadow: 0px 0px 5px 2px rgba(211, 226, 252, 0.75);
    color: rgb(200, 220, 230);
`;

function Panel(props) {
    const { children } = props;

    return <Container>{children}</Container>;
}

export default Panel;
