import * as types from "./types";

export const getConfigRequestSent = () => ({
    type: types.GET_REQUEST_SENT
});

export const getConfigRequestSucceeded = (config) => ({
    type: types.GET_REQUEST_SUCCEEDED,
    payload: {
        config: config
    }
});

export const getConfigRequestFailed = (error) => ({
    type: types.GET_REQUEST_FAILED,
    payload: {
        error: error
    }
});

export const putConfigRequestSent = () => ({
    type: types.PUT_REQUEST_SENT
});

export const putConfigRequestSucceeded = () => ({
    type: types.PUT_REQUEST_SUCCEEDED
});

export const putConfigRequestFailed = (error) => ({
    type: types.PUT_REQUEST_FAILED,
    payload: {
        error: error
    }
});

export const serverIpAddressUpdated = (ipAddress) => ({
    type: types.SERVER_IP_ADDRESS_UPDATED,
    payload: {
        ipAddress: ipAddress
    }
});

export const serverPortUpdated = (port) => ({
    type: types.SERVER_PORT_UPDATED,
    payload: {
        port: port
    }
});

export const philipsHueBridgeIpAddressUpdated = (ipAddress) => ({
    type: types.BRIDGE_IP_ADDRESS_UPDATED,
    payload: {
        ipAddress: ipAddress
    }
});

export const philipsHueBridgeIpAddressRequestSent = () => ({
    type: types.BRIDGE_IP_ADDRESS_REQUEST_SENT
});

export const philipsHueBridgeIpAddressRequestSucceeded = (ipAddress) => ({
    type: types.BRIDGE_IP_ADDRESS_REQUEST_SUCCEEDED,
    payload: {
        ipAddress: ipAddress
    }
});

export const philipsHueBridgeIpAddressRequestFailed = (error) => ({
    type: types.BRIDGE_IP_ADDRESS_REQUEST_FAILED,
    payload: {
        error: error
    }
});

export const philipsHueUsernameUpdated = (username) => ({
    type: types.USERNAME_UPDATED,
    payload: {
        username: username
    }
});

export const philipsHueClientkeyUpdated = (clientkey) => ({
    type: types.CLIENTKEY_UPDATED,
    payload: {
        clientkey: clientkey
    }
});

export const philipsHueCreateUserRequestSent = () => ({
    type: types.CREATE_USER_REQUEST_SENT
});

export const philipsHueCreateUserRequestSucceeded = () => ({
    type: types.CREATE_USER_REQUEST_SUCCEEDED
});

export const philipsHueCreateUserRequestFailed = (error) => ({
    type: types.CREATE_USER_REQUEST_FAILED,
    payload: {
        error: error
    }
});

export const philipsHueCreateUserFinished = () => ({
    type: types.CREATE_USER_FINISHED
});
