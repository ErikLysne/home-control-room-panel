import * as types from "./types";

const initialState = {
    activeItem: "home",
    collapsed: false
};

const sidebar = (state = initialState, actions) => {
    const { type, payload } = actions;

    switch (type) {
        case types.ACTIVE_ITEM_CHANGED:
            return {
                ...state,
                activeItem: payload.activeItem
            };
        case types.ACTIVE_ITEM_COLLAPSED:
            return {
                ...state,
                collapsed: payload.collapsed
            };
        default:
            return state;
    }
};

export default sidebar;
