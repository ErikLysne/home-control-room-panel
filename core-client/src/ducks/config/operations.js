import * as actions from "./actions";
import axios from "axios";

export const getConfigRequested = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { server } = state.config;

        dispatch(actions.getConfigRequestSent());

        axios
            .get(`http://${server.ipAddress}:${server.port}/config`)
            .then((result) => {
                dispatch(actions.getConfigRequestSucceeded(result.data.result));
            })
            .catch((error) => {
                dispatch(actions.getConfigRequestFailed(error.message));
            });
    };
};

export const putConfigRequested = (prop, param) => {
    return (dispatch, getState) => {
        const state = getState();
        const { server } = state.config;

        dispatch(actions.putConfigRequestSent());

        const body = {};
        body[prop] = param;

        axios
            .put(`http://${server.ipAddress}:${server.port}/config`, {
                ...body
            })
            .then((result) => {
                const { successful, error } = result.data;
                if (successful) {
                    dispatch(actions.putConfigRequestSucceeded());
                } else {
                    dispatch(actions.putConfigRequestFailed(error));
                }
            })
            .catch((error) => {
                dispatch(actions.putConfigRequestFailed(error.message));
            });
    };
};

export const philipsHueBridgeIpAddressRequested = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { server } = state.config;

        dispatch(actions.philipsHueBridgeIpAddressRequestSent());

        axios
            .put(
                `http://${server.ipAddress}:${server.port}/config/hue/discover`
            )
            .then((result) => {
                dispatch(
                    actions.philipsHueBridgeIpAddressRequestSucceeded(
                        result.data.result
                    )
                );
            })
            .catch((error) => {
                dispatch(
                    actions.philipsHueBridgeIpAddressRequestFailed(
                        error.message
                    )
                );
            });
    };
};

export const philipsHueCreateUserRequested = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { server } = state.config;
        const { bridge } = state.config.philipsHue;
        const appName = "home-control";
        const deviceName = "home-control-server";

        dispatch(actions.philipsHueCreateUserRequestSent());

        axios
            .put(
                `http://${server.ipAddress}:${server.port}/config/hue/create-user`,
                {
                    ipAddress: bridge.ipAddress,
                    appName: appName,
                    deviceName: deviceName
                }
            )
            .then(() => {
                dispatch(actions.philipsHueCreateUserRequestSucceeded());
            })
            .catch((error) => {
                console.log(error);
                dispatch(
                    actions.philipsHueCreateUserRequestFailed(error.message)
                );
            });
    };
};
