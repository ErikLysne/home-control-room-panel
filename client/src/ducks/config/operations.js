import * as actions from "./actions";
import axios from "axios";

export const getGroupsRequested = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { serverIpAddress, serverPort } = state.config.local;

        dispatch(actions.remoteRequestSent());

        axios
            .get(
                "http://" +
                    serverIpAddress +
                    ":" +
                    serverPort +
                    "/lights/groups"
            )
            .then((result) => {
                dispatch(actions.remoteRequestSucceeded());
                dispatch(actions.localGroupsUpdated(result.data));
            })
            .catch((error) => {
                dispatch(actions.remoteRequestFailed(error.message));
            });
    };
};
