import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { sidebarActions } from "../../ducks/sidebar";

const Container = styled.li`
    padding: 5px;
    box-sizing: border-box;
    color: rgb(255, 255, 255);
    font-size: 1.25rem;
    font-weight: ${(props) => (props.isRootItem ? "bold" : "normal")};
    user-select: none;
    background-color: ${(props) => props.state && "rgb(38, 39, 44)"};

    &:hover {
        background-color: rgb(48, 49, 54);
    }
`;

function Item(props) {
    const { item, isRootItem, children } = props;

    const sidebar = useSelector((state) => state.sidebar);
    const dispatch = useDispatch();

    const { activeItem, collapsed } = sidebar;

    const itemProps = (item, isRootItem) => ({
        state: activeItem === item,
        isRootItem: isRootItem,
        onClick: () => {
            const collapseItem = !isRootItem
                ? true
                : activeItem === item
                ? !collapsed
                : true;
            dispatch(sidebarActions.activeItemChanged(item));
            dispatch(sidebarActions.activeItemCollapsed(collapseItem));
        }
    });

    return <Container {...itemProps(item, isRootItem)}>{children}</Container>;
}

export default Item;
