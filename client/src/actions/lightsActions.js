import axios from "axios";

// Local actions
export const localOnChanged = (value) => ({
    type: "lights/local/onChanged",
    on: value
});

export const localHueChanged = (value) => ({
    type: "lights/local/hueChanged",
    hue: value
});

export const localSaturationChanged = (value) => ({
    type: "lights/local/saturationChanged",
    saturation: value
});

export const localBrightnessChanged = (value) => ({
    type: "lights/local/brightnessChanged",
    brightness: value
});

export const localUpdatedFromRemote = (state) => ({
    type: "lights/local/updatedFromRemote",
    on: state.on,
    hue: state.hue,
    saturation: state.saturation,
    brightness: state.brightness
});

export const localInfoUpdatedFromRemote = (state) => ({
    type: "lights/local/info/updatedFromRemote",
    id: state.id,
    name: state.name,
    lights: state.lights,
    allOn: state.allOn,
    anyOn: state.anyOn
});

// Remote actions
export const remoteRequestSent = () => ({
    type: "lights/remote/requestSent"
});

export const remoteRequestSucceeded = () => ({
    type: "lights/remote/requestSucceeded"
});

export const remoteRequestFailed = (error) => ({
    type: "lights/remote/requestFailed",
    error: error
});

const dispatchSuccessfulResult = (dispatch, result) => {
    const { on, hue, bri, sat } = result.data.action;
    const { all_on, any_on } = result.data.state;
    const { id, name, lights } = result.data;

    dispatch(remoteRequestSucceeded());
    dispatch(
        localUpdatedFromRemote({
            on: on,
            hue: hue,
            saturation: sat,
            brightness: bri
        })
    );
    dispatch(
        localInfoUpdatedFromRemote({
            id: id,
            name: name,
            lights: lights,
            allOn: all_on,
            anyOn: any_on
        })
    );
};

export const remoteSetLightsRequest = (lightsLocal) => {
    return (dispatch, getState) => {
        const state = getState();
        const {
            serverIpAddress,
            serverPort,
            targetRoom
        } = state.settings.local;

        dispatch(remoteRequestSent());

        axios
            .put(
                "http://" +
                    serverIpAddress +
                    ":" +
                    serverPort +
                    "/lights/groups/" +
                    targetRoom,
                {
                    on: lightsLocal.on,
                    hue: lightsLocal.hue,
                    sat: lightsLocal.saturation,
                    bri: lightsLocal.brightness
                }
            )
            .then((result) => {
                dispatchSuccessfulResult(dispatch, result);
            })
            .catch((error) => {
                dispatch(remoteRequestFailed(error.message));
            });
    };
};

export const remoteGetLightsRequest = () => {
    return (dispatch, getState) => {
        const state = getState();
        const {
            serverIpAddress,
            serverPort,
            targetRoom
        } = state.settings.local;

        dispatch(remoteRequestSent());

        axios
            .get(
                "http://" +
                    serverIpAddress +
                    ":" +
                    serverPort +
                    "/lights/groups/" +
                    targetRoom
            )
            .then((result) => {
                dispatchSuccessfulResult(dispatch, result);
            })
            .catch((error) => {
                dispatch(remoteRequestFailed(error.message));
            });
    };
};
