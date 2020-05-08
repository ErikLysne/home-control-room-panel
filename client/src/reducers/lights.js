const initialState = {
    state: true,
    hue: 25,
    saturation: 50,
    brightness: 50
};

const lights = (state = initialState, action) => {
    switch (action.type) {
        case "lights/stateChanged":
            return {
                ...state,
                state: action.state
            };
        case "lights/hueChanged":
            return {
                ...state,
                hue: action.hue
            };
        case "lights/saturationChanged":
            return {
                ...state,
                saturation: action.saturation
            };
        case "lights/brightnessChanged":
            return {
                ...state,
                brightness: action.brightness
            };
        default:
            return state;
    }
};

export default lights;
