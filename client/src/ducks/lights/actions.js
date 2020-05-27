import * as types from "./types";

export const localOnChanged = (value) => ({
    type: types.ON_CHANGED,
    payload: {
        on: value
    }
});

export const localHueChanged = (value) => ({
    type: types.HUE_CHANGED,
    payload: {
        hue: value
    }
});

export const localSaturationChanged = (value) => ({
    type: types.SATURATION_CHANGED,
    payload: {
        saturation: value
    }
});

export const localBrightnessChanged = (value) => ({
    type: types.BRIGHTNESS_CHANGED,
    payload: {
        brightness: value
    }
});

export const localColorTempChanged = (value) => ({
    type: types.COLOR_TEMP_CHANGED,
    payload: {
        colorTemp: value
    }
});

export const localStateUpdated = (info) => ({
    type: types.STATE_UPDATED,
    payload: {
        on: info.on,
        hue: info.hue,
        saturation: info.saturation,
        brightness: info.brightness,
        colorTemp: info.colorTemp
    }
});

export const localInfoUpdated = (info) => ({
    type: types.INFO_UPDATED,
    payload: {
        id: info.id,
        name: info.name,
        lights: info.lights,
        colorMode: info.colorMode,
        allOn: info.allOn,
        anyOn: info.anyOn
    }
});

export const remoteRequestSent = () => ({
    type: types.REQUEST_SENT
});

export const remoteRequestSucceeded = () => ({
    type: types.REQUEST_SUCCEEDED
});

export const remoteRequestFailed = (error) => ({
    type: types.REQUEST_FAILED,
    payload: {
        error: error
    }
});
