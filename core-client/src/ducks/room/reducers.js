import * as types from "./types";

const initialState = {
    local: {
        name: "",
        isEntrance: false,
        lights: {
            hueName: "",
            hueId: "",
            lights: [""],
            on: false,
            hue: "",
            saturation: "",
            brightness: "",
            colorTemp: "",
            colorMode: "",
            effect: "",
            alert: ""
        }
    },
    remote: {
        pending: false,
        error: "",
        hasData: false,
        lights: {
            hueName: "",
            hueId: "",
            lights: [""],
            on: false,
            hue: "",
            saturation: "",
            brightness: "",
            colorTemp: "",
            colorMode: "",
            effect: "",
            alert: ""
        }
    }
};

const initialStateCopy = JSON.parse(JSON.stringify(initialState));

const room = (state = initialState, action) => {
    const { type, payload } = action;

    const { local, remote } = state;

    switch (type) {
        case types.NAME_CHANGED:
            local.name = payload.name;
            break;
        case types.LOCAL_HUE_NAME_CHANGED:
            local.lights.hueName = payload.hueName;
            break;
        case types.LOCAL_LIGHTS_PULLED_FROM_REMOTE:
            ({
                hueName: local.lights.hueName,
                hueId: local.lights.hueId,
                lights: local.lights.lights,
                on: local.lights.on,
                hue: local.lights.hue,
                saturation: local.lights.saturation,
                brightness: local.lights.brightness,
                colorTemp: local.lights.colorTemp,
                colorMode: local.lights.colorMode,
                effect: local.lights.effect,
                alert: local.lights.alert
            } = remote.lights);
            break;
        case types.LOCAL_LIGHTS_CLEARED:
            local.lights = { ...initialStateCopy.local.lights };
            break;
        case types.REMOTE_LIGHTS_UPDATED:
            ({
                hueName: remote.lights.hueName,
                hueId: remote.lights.hueId,
                lights: remote.lights.lights,
                on: remote.lights.on,
                hue: remote.lights.hue,
                saturation: remote.lights.saturation,
                brightness: remote.lights.brightness,
                colorTemp: remote.lights.colorTemp,
                colorMode: remote.lights.colorMode,
                effect: remote.lights.effect,
                alert: remote.lights.alert
            } = payload);
            remote.hasData = true;
            break;
        case types.REMOTE_LIGHTS_CLEARED:
            remote.lights = { ...initialStateCopy.remote.lights };
            break;
        case types.REQUEST_SENT:
            remote.pending = true;
            remote.hasData = false;
            remote.error = "";
            break;
        case types.REQUEST_SUCCEEDED:
            remote.pending = false;
            remote.error = "";
            break;
        case types.REQUEST_FAILED:
            remote.pending = false;
            remote.error = payload.error;
            break;
        default:
            break;
    }

    return {
        ...state,
        local: {
            ...local
        },
        remote: {
            ...remote
        }
    };
};

export default room;
