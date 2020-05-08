import io from "socket.io-client";
const ENDPOINT = "http://10.0.0.10:8080";

const socket = io.connect(ENDPOINT);

// Action creators
export const mainMenuLightsPanelActivated = () => ({
    type: "mainMenu/lightsPanelActivated"
});

export const mainMenuNetworkPanelActivated = () => ({
    type: "mainMenu/networkPanelActivated"
});

export const mainMenuSensorsPanelActivated = () => ({
    type: "mainMenu/sensorsPanelActivated"
});

export const mainMenuSettingsPanelActivated = () => ({
    type: "mainMenu/settingsPanelActivated"
});

export const lightStateChanged = (value) => ({
    type: "lights/stateChanged",
    state: value
});

export const lightHueChanged = (value) => ({
    type: "lights/hueChanged",
    hue: value
});

export const lightSaturationChanged = (value) => ({
    type: "lights/saturationChanged",
    saturation: value
});

export const lightBrightnessChanged = (value) => ({
    type: "lights/brightnessChanged",
    brightness: value
});

export const lightsUpdaterRequestSent = () => ({
    type: "lightsUpdater/requestSent"
});

export const lightsUpdaterRequestSucceeded = (result) => ({
    type: "lightsUpdater/requestSucceeded",
    payload: result
});

export const lightsUpdaterRequestFailed = (error) => ({
    type: "lightsUpdater/requestFailed",
    payload: error
});

export const lightsUpdaterRequestTimedOut = () => ({
    type: "lightsUpdater/requestTimedOut"
});

export const lightsUpdaterRequested = (light) => {
    const REQUEST_TIMEOUT = 500;

    const unsubscribe = () => {
        socket.off("request-light-change-success");
        socket.off("request-light-change-failure");
    };
    return (dispatch) => {
        dispatch(lightsUpdaterRequestSent());
        unsubscribe();

        const timer = setTimeout(() => {
            dispatch(lightsUpdaterRequestTimedOut());
            unsubscribe();
        }, REQUEST_TIMEOUT);

        socket.on("request-light-change-success", (response) => {
            dispatch(lightsUpdaterRequestSucceeded());
            unsubscribe();
            clearTimeout(timer);
        });
        socket.on("request-light-change-failure", (error) => {
            dispatch(lightsUpdaterRequestFailed());
            unsubscribe();
            clearTimeout(timer);
        });

        socket.emit("request-light-change", light);
    };
};
