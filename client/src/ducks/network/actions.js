import * as types from "./types";

export const requestSent = () => ({
    type: types.REQUEST_SENT
});

export const requestSucceeded = (bridgeOnline, serverLatency) => ({
    type: types.REQUEST_SUCCEEDED,
    payload: {
        bridgeOnline: bridgeOnline,
        serverLatency: serverLatency
    }
});

export const requestFailed = (error) => ({
    type: types.REQUEST_FAILED,
    payload: {
        error: error
    }
});
