import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import HomePanel from "./HomePanel";
import RoomPanel from "./RoomPanel";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function MainPanel() {
    const sidebar = useSelector((state) => state.sidebar);
    const { activeItem } = sidebar;

    const isActive = (item) => activeItem === item;

    return (
        <Container>
            {isActive("home") && <HomePanel />}
            {isActive("rooms") && <RoomPanel />}
        </Container>
    );
}

export default MainPanel;
