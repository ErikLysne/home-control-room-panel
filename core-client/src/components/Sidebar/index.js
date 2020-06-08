import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Item from "./Item";

const Container = styled.div`
    max-width: 300px;
    min-width: 125px;
    width: 20%;
    height: 100vh;
    padding: 100px 0;
    box-sizing: border-box;
    background-color: rgb(24, 25, 26);
`;

const ItemList = styled.ul`
    list-style-type: none;
    padding-left: 0;

    & > * {
        padding-left: 20px;
    }
`;

function Sidebar() {
    const sidebar = useSelector((state) => state.sidebar);

    const { activeItem, collapsed } = sidebar;

    const shouldCollapse = (item) =>
        activeItem.split("-").includes(item) && collapsed;

    return (
        <Container>
            <ItemList>
                <Item item={"home"} isRootItem={true}>
                    Home
                </Item>
                <Item item={"rooms"} isRootItem={true}>
                    {" "}
                    Rooms
                </Item>
                {shouldCollapse("rooms") && (
                    <ItemList>
                        <Item item={"rooms-add_room"} isRootItem={false}>
                            Add Room
                        </Item>
                        <Item item={"rooms-edit_room"} isRootItem={false}>
                            Edit Room
                        </Item>
                        <Item item={"rooms-delete_room"} isRootItem={false}>
                            Delete Room
                        </Item>
                    </ItemList>
                )}
                <Item item={"settings"} isRootItem={true}>
                    Settings
                </Item>
            </ItemList>
        </Container>
    );
}

export default Sidebar;
