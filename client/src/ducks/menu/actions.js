import * as types from "./types";

export const lightsPanelActivated = (previousIndex) => ({
    type: types.LIGHTS_PANEL_ACTIVATED,
    payload: {
        previousIndex: previousIndex
    }
});

export const networkPanelActivated = (previousIndex) => ({
    type: types.NETWORK_PANEL_ACTIVATED,
    payload: {
        previousIndex: previousIndex
    }
});

export const sensorsPanelActivated = (previousIndex) => ({
    type: types.SENSORS_PANEL_ACTIVATED,
    payload: {
        previousIndex: previousIndex
    }
});

export const settingsPanelActivated = (previousIndex) => ({
    type: types.SETTINGS_PANEL_ACTIVATED,
    payload: {
        previousIndex: previousIndex
    }
});

export const activePanelIndexChanged = (currentIndex, previousIndex) => ({
    type: types.ACTIVE_PANEL_INDEX_CHANGED,
    payload: {
        currentIndex: currentIndex,
        previousIndex: previousIndex
    }
});

export const transitionFinished = () => ({
    type: types.TRANSITION_FINISHED
});
