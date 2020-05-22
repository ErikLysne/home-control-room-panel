import * as types from "./types";

export const localTargetRoomChanged = (room) => ({
    type: types.TARGET_ROOM_CHANGED,
    payload: {
        targetRoom: room
    }
});

export const localGroupsUpdated = (groups) => ({
    type: types.GROUPS_UPDATED,
    payload: {
        groups: groups
    }
});

export const remoteRequestSent = () => ({
    type: types.REQUEST_SENT
});

export const remoteRequestSucceeded = () => ({
    type: types.REQUEST_SUCCEEDED
});

export const remoteRequestFailed = () => ({
    type: types.REQUEST_FAILED
});
