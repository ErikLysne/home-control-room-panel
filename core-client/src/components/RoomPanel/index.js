import React from "react";
import styled from "styled-components";
import Panel from "../Panel";
import RoomForm from "./RoomForm";

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

function RoomPanel() {
    return (
        <Panel>
            <Heading>Register New Room</Heading>
            <RoomForm />
        </Panel>
    );
}

export default RoomPanel;
