import * as types from "./types";

export const activeItemChanged = (activeItem) => ({
    type: types.ACTIVE_ITEM_CHANGED,
    payload: {
        activeItem: activeItem
    }
});

export const activeItemCollapsed = (collapsed) => ({
    type: types.ACTIVE_ITEM_COLLAPSED,
    payload: {
        collapsed: collapsed
    }
});
