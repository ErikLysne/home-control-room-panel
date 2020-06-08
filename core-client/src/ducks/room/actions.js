import * as types from "./types";

export const nameChanged = (name) => ({
    type: types.NAME_CHANGED,
    payload: {
        name: name
    }
});

export const localHueNameChanged = (hueName) => ({
    type: types.LOCAL_HUE_NAME_CHANGED,
    payload: {
        hueName
    }
});

export const localLightsPulledFromRemote = () => ({
    type: types.LOCAL_LIGHTS_PULLED_FROM_REMOTE
});

export const localLightsCleared = () => ({
    type: types.LOCAL_LIGHTS_CLEARED
});

export const remoteLightsUpdated = (lights) => ({
    type: types.REMOTE_LIGHTS_UPDATED,
    payload: {
        hueName: lights.hueName,
        hueId: lights.hueId,
        lights: lights.lights,
        on: lights.on,
        hue: lights.hue,
        saturation: lights.saturation,
        brightness: lights.brightness,
        colorTemp: lights.colorTemp,
        colorMode: lights.colorMode,
        effect: lights.effect,
        alert: lights.alert
    }
});

export const remoteLightsCleared = () => ({
    type: types.REMOTE_LIGHTS_CLEARED
});

export const requestSent = () => ({
    type: types.REQUEST_SENT
});

export const requestSucceeded = (hueName) => ({
    type: types.REQUEST_SUCCEEDED,
    payload: {
        hueName: hueName
    }
});

export const requestFailed = (error) => ({
    type: types.REQUEST_FAILED,
    payload: {
        error: error
    }
});
