import * as actions from "./actions";
import axios from "axios";

const dispatchSuccessfulResult = (dispatch, result) => {
    const { id, name, lights } = result.data;
    const {
        on,
        hue,
        bri,
        sat,
        ct,
        colormode,
        effect,
        alert
    } = result.data.action;

    dispatch(actions.requestSucceeded(name));
    dispatch(
        actions.remoteLightsUpdated({
            hueName: name,
            hueId: id,
            lights: lights,
            on: on,
            hue: hue,
            saturation: sat,
            brightness: bri,
            colorTemp: ct,
            colorMode: colormode,
            effect: effect,
            alert: alert
        })
    );
};

export const getGroupRequest = (groupName) => {
    return (dispatch, getState) => {
        const state = getState();
        const { serverIpAddress, serverPort } = state.config;

        dispatch(actions.requestSent());

        axios
            .get(
                "http://" +
                    serverIpAddress +
                    ":" +
                    serverPort +
                    "/lights/groups/" +
                    groupName
            )
            .then((result) => {
                dispatchSuccessfulResult(dispatch, result);
            })
            .catch((error) => {
                dispatch(actions.requestFailed(error.message));
            });
    };
};
