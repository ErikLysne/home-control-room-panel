import * as types from "./types";

const initialState = {
    pending: false,
    error: "",
    serverOnline: false,
    serverLatency: 0,
    bridgeOnline: false
};

const network = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.REQUEST_SENT:
            return {
                ...state,
                pending: true
            };
        case types.REQUEST_SUCCEEDED:
            return {
                ...state,
                pending: false,
                error: "",
                serverOnline: true,
                bridgeOnline: payload.bridgeOnline,
                serverLatency: payload.serverLatency
            };
        case types.REQUEST_FAILED:
            return {
                ...state,
                pending: false,
                error: payload.error,
                serverOnline: false,
                bridgeOnline: false
            };
        default:
            return state;
    }
};

export default network;
