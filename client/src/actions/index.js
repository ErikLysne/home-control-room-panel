import io from "socket.io-client";
const ENDPOINT = "http://10.0.0.10:8080";

const socket = io.connect(ENDPOINT);

// Action creators

// Main menu
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

// Lights
export const lightsStateChanged = (value) => ({
    type: "lights/stateChanged",
    state: value
});

export const lightsHueChanged = (value) => ({
    type: "lights/hueChanged",
    hue: value
});

export const lightsSaturationChanged = (value) => ({
    type: "lights/saturationChanged",
    saturation: value
});

export const lightsBrightnessChanged = (value) => ({
    type: "lights/brightnessChanged",
    brightness: value
});

// Lights info
export const lightsInfoRoomChanged = (value) => ({
    type: "lightsInfo/roomChanged",
    room: value
});

export const lightsInfoModeChanged = (value) => ({
    type: "lightsInfo/modeChanged",
    mode: value
});

export const lightsInfoAllOnChanged = (value) => ({
    type: "lightsInfo/allOnChanged",
    allOn: value
});

export const lightsInfoAnyOnChanged = (value) => ({
    type: "lightsInfo/anyOnChanged",
    anyOn: value
});

// Lights updater
export const lightsUpdaterRequestSent = () => ({
    type: "lightsUpdater/requestSent"
});

export const lightsUpdaterRequestSucceeded = (result) => ({
    type: "lightsUpdater/requestSucceeded",
    result: result
});

export const lightsUpdaterRequestFailed = (error) => ({
    type: "lightsUpdater/requestFailed",
    error: error
});

export const lightsUpdaterRequestTimedOut = () => ({
    type: "lightsUpdater/requestTimedOut"
});

export const lightsUpdaterRequested = (light) => {
    const REQUEST_TIMEOUT = 1000;

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
        console.log(socket);
        socket.emit("request-light-change", light);
    };
};

// Network info
export const networkInfoRequestSent = (socket) => ({
    type: "networkInfo/requestSent",
    socket: socket
});

export const networkInfoSucceeded = (latency) => ({
    type: "networkInfo/requestSucceeded",
    latency: latency
});

export const networkInfoFailed = (error) => ({
    type: "networkInfo/requestFailed",
    error: error
});

export const networkInfoTimedOut = (result) => ({
    type: "networkInfo/requestTimedOut"
});

export const networkInfoRequested = () => {
    const REQUEST_TIMEOUT = 1000;
    const startTime = new Date();

    const unsubscribe = () => {
        socket.off("request-network-info-success");
    };
    return (dispatch) => {
        dispatch(networkInfoRequestSent(socket.io.opts));
        unsubscribe();

        const timer = setTimeout(() => {
            dispatch(networkInfoTimedOut());
            unsubscribe();
        }, REQUEST_TIMEOUT);

        socket.on("request-network-info-success", (response) => {
            const endTime = new Date();
            const latency = endTime.getTime() - startTime.getTime();
            dispatch(networkInfoSucceeded(latency));
            unsubscribe();
            clearTimeout(timer);
        });

        console.log(socket);
        socket.emit("request-network-info");
    };
};
