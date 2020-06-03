import React from "react";
import styled from "styled-components";

const Button = styled.button`
    width: 100px;
    height: 50px;
    margin: 10px;
    display: inline-block;
    border-style: solid;
    border-width: 2px;
    border-radius: 5px;
    border-color: rgb(140, 255, 169);
    background-color: rgb(40, 167, 69);
    font-size: 1.25rem;
    color: rgb(255, 255, 255);
`;

function AcceptButton(props) {
    const { onClick, children } = props;

    return <Button onClick={onClick}>{children}</Button>;
}

export default AcceptButton;
