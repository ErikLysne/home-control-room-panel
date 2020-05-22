import * as types from "./types";

const initialState = {
    local: {
        on: false,
        hue: 0,
        saturation: 0,
        brightness: 1,
        info: {
            id: 0,
            name: "",
            lights: [],
            colorMode: "",
            mode: "Normal",
            allOn: false,
            anyOn: false
        }
    },
    remote: {
        pending: false,
        error: ""
    }
};

const lights = (state = initialState, action) => {
    const { type, payload } = action;

    const { local, remote } = state;
    const { info } = local;

    switch (type) {
        case types.ON_CHANGED:
            local.on = payload.on;
            break;
        case types.HUE_CHANGED:
            local.hue = payload.hue;
            break;
        case types.SATURATION_CHANGED:
            local.saturation = payload.saturation;
            break;
        case types.BRIGHTNESS_CHANGED:
            local.brightness = payload.brightness;
            break;
        case types.STATE_UPDATED:
            local.on = payload.on;
            local.hue = payload.hue;
            local.saturation = payload.saturation;
            local.brightness = payload.brightness;
            break;
        case types.INFO_UPDATED:
            info.id = payload.id;
            info.name = payload.name;
            info.lights = payload.lights;
            info.colorMode = payload.colorMode;
            info.allOn = payload.allOn;
            info.anyOn = payload.anyOn;
            break;
        case types.REQUEST_SENT:
            remote.pending = true;
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
            ...local,
            info: {
                ...info
            }
        },
        remote: {
            ...remote
        }
    };
};

export default lights;
