import * as actions from "./actions";
import axios from "axios";

const dispatchSuccessfulResult = (dispatch, result) => {
    console.log(result.data);
    const { on, hue, bri, sat, colormode, ct } = result.data.action;
    const { all_on, any_on } = result.data.state;
    const { id, name, lights } = result.data;

    dispatch(actions.remoteRequestSucceeded());
    dispatch(
        actions.localStateUpdated({
            on: on,
            hue: hue,
            saturation: sat,
            brightness: bri,
            colorTemp: ct
        })
    );
    dispatch(
        actions.localInfoUpdated({
            id: id,
            name: name,
            lights: lights,
            colorMode: colormode,
            allOn: all_on,
            anyOn: any_on
        })
    );
};

export const setLightsRequested = (lights) => {
    return (dispatch, getState) => {
        const state = getState();
        const { serverIpAddress, serverPort, targetRoom } = state.config.local;

        dispatch(actions.remoteRequestSent());

        axios
            .put(
                "http://" +
                    serverIpAddress +
                    ":" +
                    serverPort +
                    "/lights/groups/" +
                    targetRoom,
                {
                    on: lights.on,
                    hue: lights.hue,
                    sat: lights.saturation,
                    bri: lights.brightness,
                    ct: lights.colorTemp
                }
            )
            .then((result) => {
                dispatchSuccessfulResult(dispatch, result);
            })
            .catch((error) => {
                dispatch(actions.remoteRequestFailed(error.message));
            });
    };
};

export const getLightsRequested = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { serverIpAddress, serverPort, targetRoom } = state.config.local;

        dispatch(actions.remoteRequestSent());

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
                dispatch(actions.remoteRequestFailed(error.message));
            });
    };
};
