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
    const { type } = action;
    const actionPath = type.split("/");

    if (actionPath[0] !== "lights") {
        return state;
    }

    if (actionPath[1] === "local") {
        const { local } = state;
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

        if (actionPath[2] === "info") {
            const { info } = state.local;
            switch (actionPath[3]) {
                case "updatedFromRemote":
                    info.id = action.id;
                    info.name = action.name;
                    info.lights = action.lights;
                    info.allOn = action.allOn;
                    info.anyOn = action.anyOn;
                    break;
                default:
                    break;
            }
            return {
                ...state,
                local: {
                    ...state.local,
                    info: info
                }
            };
        }

        return {
            ...state,
            local: local
        };
    }

    if (actionPath[1] === "remote") {
        const { remote } = state;
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
            remote: remote
        };
    }

    return state;
};

export default lights;
