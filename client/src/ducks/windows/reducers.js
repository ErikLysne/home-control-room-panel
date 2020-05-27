import * as types from "./types";

const initialState = {
    lights: {
        slidersWindowOpen: false,
        kelvinWindowOpen: false
    }
};

const windows = (state = initialState, action) => {
    const { type } = action;

    const { lights } = state;

    switch (type) {
        case types.SLIDERS_WINDOW_OPENED:
            lights.slidersWindowOpen = true;
            break;
        case types.SLIDERS_WINDOW_CLOSED:
            lights.slidersWindowOpen = false;
            break;
        case types.KELVIN_WINDOW_OPENED:
            lights.kelvinWindowOpen = true;
            break;
        case types.KELVIN_WINDOW_CLOSED:
            lights.kelvinWindowOpen = false;
            break;
        default:
            break;
    }

    return {
        ...state,
        lights: lights
    };
};

export default windows;
