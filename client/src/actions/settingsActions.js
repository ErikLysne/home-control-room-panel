import axios from "axios";

// Local actions
export const localTargetRoomChanged = (room) => ({
    type: "settings/local/targetRoomChanged",
    targetRoom: room
});

export const localUpdatedFromRemote = (groups) => ({
    type: "settings/local/updatedFromRemote",
    groups: groups.data
});

// Remote actions
export const remoteRequestSent = () => ({
    type: "settings/remote/requestSent"
});

export const remoteRequestSucceeded = () => ({
    type: "settings/remote/requestSucceeded"
});

export const remoteRequestFailed = () => ({
    type: "settings/remote/requestFailed"
});

export const remoteGetGroupsRequested = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { serverIpAddress, serverPort } = state.settings.local;

        dispatch(remoteRequestSent());

        axios
            .get(
                "http://" +
                    serverIpAddress +
                    ":" +
                    serverPort +
                    "/lights/groups"
            )
            .then((result) => {
                dispatch(remoteRequestSucceeded());
                dispatch(localUpdatedFromRemote(result));
            })
            .catch((error) => {
                dispatch(remoteRequestFailed(error.message));
            });
    };
};
