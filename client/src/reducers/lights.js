const initialState = {
    local: {
        on: false,
        hue: 0,
        saturation: 0,
        brightness: 1
    },
    remote: {
        pending: false,
        error: ""
    }
};

const lights = (state = initialState, action) => {
    const { type } = action;
    const actionPath = type.split("/");

    if (actionPath[1] === "local") {
        const local = state.local;
        switch (actionPath[2]) {
            case "onChanged":
                local.on = action.on;
                break;
            case "hueChanged":
                local.hue = action.hue;
                break;
            case "saturationChanged":
                local.saturation = action.saturation;
                break;
            case "brightnessChanged":
                local.brightness = action.brightness;
                break;
            case "updatedFromRemote":
                local.on = action.on;
                local.hue = action.hue;
                local.saturation = action.saturation;
                local.brightness = action.brightness;
                break;
            default:
                break;
        }

        return {
            ...state,
            local: local
        };
    }

    if (actionPath[1] === "remote") {
        const remote = state.remote;
        const local = state.local;
        switch (actionPath[2]) {
            case "requestSent":
                remote.pending = true;
                remote.error = "";
                break;
            case "requestSucceeded":
                remote.pending = false;
                remote.error = "";
                break;
            case "requestFailed":
                remote.pending = false;
                remote.error = action.error;
                break;
            default:
                break;
        }

        return {
            ...state,
            local: local,
            remote: remote
        };
    }

    return state;
};

export default lights;
