import * as actions from "./actions";
import axios from "axios";

export const getNetworkDetailsRequested = () => {
    return (dispatch, getState) => {
        const state = getState();

        const { serverIpAddress, serverPort, targetRoom } = state.config.local;

        dispatch(actions.requestSent());
        const startTime = new Date();

        axios
            .get(
                "http://" +
                    serverIpAddress +
                    ":" +
                    serverPort +
                    "/lights/status"
            )
            .then((result) => {
                const endTime = new Date();
                const serverLatency = endTime.getTime() - startTime.getTime();
                if (result.data.bridgeStatus === "online") {
                    dispatch(actions.requestSucceeded(true, serverLatency));
                } else {
                    dispatch(actions.requestSucceeded(false, serverLatency));
                }
            })
            .catch((error) => {
                dispatch(actions.requestFailed({ error: error }));
            });
    };
};
