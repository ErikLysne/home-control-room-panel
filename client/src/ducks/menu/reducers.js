import * as types from "./types";

const initialState = {
    activePanelIndexCurrent: 0,
    activePanelIndexPrevious: 0,
    isTransitioning: false
};

const mainMenu = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.LIGHTS_PANEL_ACTIVATED:
            return {
                ...state,
                activePanelIndexCurrent: 0,
                activePanelIndexPrevious: payload.previousIndex,
                isTransitioning: true
            };
        case types.NETWORK_PANEL_ACTIVATED:
            return {
                ...state,
                activePanelIndexCurrent: 1,
                activePanelIndexPrevious: payload.previousIndex,
                isTransitioning: true
            };
        case types.SENSORS_PANEL_ACTIVATED:
            return {
                ...state,
                activePanelIndexCurrent: 2,
                activePanelIndexPrevious: payload.previousIndex,
                isTransitioning: true
            };
        case types.SETTINGS_PANEL_ACTIVATED:
            return {
                ...state,
                activePanelIndexCurrent: 3,
                activePanelIndexPrevious: payload.previousIndex,
                isTransitioning: true
            };
        case types.ACTIVE_PANEL_INDEX_CHANGED:
            return {
                ...state,
                activePanelIndexCurrent: payload.currentIndex,
                activePanelIndexPrevious: payload.previousIndex,
                isTransitioning: true
            };
        case types.TRANSITION_FINISHED:
            return {
                ...state,
                isTransitioning: false
            };
        default:
            return state;
    }
};

export default mainMenu;
