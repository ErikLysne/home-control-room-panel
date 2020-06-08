import * as types from "./types";
import * as utils from "./utils";

const initialState = {
    server: {
        pending: false,
        error: "",
        previousOperation: "",
        ipAddress: "10.0.0.10",
        ipAddressValid: false,
        port: "8080",
        portValid: false
    },
    philipsHue: {
        bridge: {
            scanningForDevices: false,
            ipAddress: "",
            username: "",
            clientkey: ""
        },
        userCreation: {
            appName: "",
            deviceName: "",
            timeRemaining: 0,
            previousSuccessful: false,
            ongoing: false,
            frontendCares: false
        }
    }
};

const settings = (state = initialState, action) => {
    const { type, payload } = action;

    const { server, philipsHue } = state;
    const { bridge, userCreation } = philipsHue;

    const { serverOperations } = utils;

    switch (type) {
        case types.GET_REQUEST_SENT:
            server.pending = true;
            server.error = "";
            server.previousOperation = serverOperations.get;
            break;
        case types.GET_REQUEST_SUCCEEDED:
            const { hue } = payload.config;
            server.pending = false;
            server.error = "";
            server.ipAddressValid = true;
            server.portValid = true;
            bridge.ipAddress = hue.bridge.ipAddress;
            bridge.username = hue.bridge.username;
            bridge.clientkey = hue.bridge.clientkey;
            userCreation.appName = hue.userCreation.appName;
            userCreation.deviceName = hue.userCreation.deviceName;
            userCreation.timeRemaining = hue.userCreation.timeRemaining;
            userCreation.previousSuccessful =
                hue.userCreation.previousSuccessful;
            userCreation.ongoing = hue.userCreation.ongoing;
            break;
        case types.GET_REQUEST_FAILED:
            server.pending = false;
            server.error = payload.error;
            break;
        case types.PUT_REQUEST_SENT:
            server.pending = true;
            server.error = "";
            server.previousOperation = serverOperations.put;
            break;
        case types.PUT_REQUEST_SUCCEEDED:
            server.pending = false;
            server.error = "";
            break;
        case types.PUT_REQUEST_FAILED:
            server.pending = false;
            server.error = payload.error;
            break;
        case types.SERVER_IP_ADDRESS_UPDATED:
            server.ipAddress = payload.ipAddress;
            server.ipAddressValid = false;
            break;
        case types.SERVER_PORT_UPDATED:
            server.port = payload.port;
            server.portValid = false;
            break;
        case types.BRIDGE_IP_ADDRESS_UPDATED:
            bridge.ipAddress = payload.ipAddress;
            break;
        case types.BRIDGE_IP_ADDRESS_REQUEST_SENT:
            server.pending = true;
            server.error = "";
            server.previousOperation = serverOperations.hueDiscover;
            bridge.scanningForDevices = true;
            break;
        case types.BRIDGE_IP_ADDRESS_REQUEST_SUCCEEDED:
            server.pending = false;
            server.error = "";
            bridge.ipAddress = payload.ipAddress;
            bridge.scanningForDevices = false;
            break;
        case types.BRIDGE_IP_ADDRESS_REQUEST_FAILED:
            server.pending = false;
            server.error = payload.error;
            bridge.scanningForDevices = false;
            break;
        case types.USERNAME_UPDATED:
            bridge.username = payload.username;
            break;
        case types.CLIENTKEY_UPDATED:
            bridge.clientkey = payload.clientkey;
            break;
        case types.CREATE_USER_REQUEST_SENT:
            server.pending = true;
            server.error = "";
            server.previousOperation = serverOperations.hueCreateUser;
            userCreation.ongoing = true;
            userCreation.frontendCares = true;
            break;
        case types.CREATE_USER_REQUEST_SUCCEEDED:
            server.pending = false;
            server.error = "";
            break;
        case types.CREATE_USER_REQUEST_FAILED:
            server.pending = false;
            server.error = payload.error;
            break;
        case types.CREATE_USER_FINISHED:
            userCreation.frontendCares = false;
            break;
        default:
            break;
    }
    return {
        ...state,
        server: {
            ...server
        },
        philipsHue: {
            ...philipsHue,
            bridge: bridge,
            userCreation: userCreation
        }
    };
};

export default settings;
