import axios from "axios";
const ENDPOINT = "http://10.0.0.10:8080";
const ACTIVE_ROOM = "Living Room";

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

// Remote actions
export const remoteRequestSent = () => ({
    type: "lights/remote/requestSent"
});

export const remoteRequestSucceeded = (result) => ({
    type: "lights/remote/requestSucceeded"
});

export const remoteRequestFailed = (error) => ({
    type: "lights/remote/requestFailed",
    error: error
});

export const remoteRequestTimedOut = () => ({
    type: "lights/remote/requestTimedOut"
});

export const remoteSetLightsRequest = (lightsLocal) => {
    const REQUEST_TIMEOUT = 1000;

    return (dispatch) => {
        dispatch(remoteRequestSent());

        const timer = setTimeout(() => {
            dispatch(remoteRequestTimedOut());
        }, REQUEST_TIMEOUT);

        axios
            .put(ENDPOINT + "/lights/groups/" + ACTIVE_ROOM, {
                on: lightsLocal.on,
                hue: lightsLocal.hue,
                sat: lightsLocal.saturation,
                bri: lightsLocal.brightness
            })
            .then(() => {
                clearTimeout(timer);
                dispatch(remoteRequestSucceeded());
                dispatch(localUpdatedFromRemote(lightsLocal));
            })
            .catch((error) => {
                clearTimeout(timer);
                dispatch(remoteRequestFailed(error.message));
            });
    };
};

export const remoteGetLightsRequest = () => {
    const REQUEST_TIMEOUT = 1000;

    return (dispatch) => {
        dispatch(remoteRequestSent());

        const timer = setTimeout(() => {
            dispatch(remoteRequestTimedOut());
        }, REQUEST_TIMEOUT);

        axios
            .get(ENDPOINT + "/lights/groups/" + ACTIVE_ROOM)
            .then((result) => {
                clearTimeout(timer);
                const { on, hue, bri, sat } = result.data.action;
                dispatch(remoteRequestSucceeded());
                dispatch(
                    localUpdatedFromRemote({
                        on: on,
                        hue: hue,
                        saturation: sat,
                        brightness: bri
                    })
                );
            })
            .catch((error) => {
                clearTimeout(timer);
                dispatch(remoteRequestFailed(error.message));
            });
    };
};
