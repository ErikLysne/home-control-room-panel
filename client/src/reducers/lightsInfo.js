const initialState = {
    room: "Living room",
    mode: "Normal",
    allOn: false,
    anyOn: false
};

const lightsInfo = (state = initialState, action) => {
    switch (action.type) {
        case "lightsInfo/roomChanged":
            return {
                ...state,
                room: action.room
            };
        case "lightsInfo/modeChanged":
            return {
                ...state,
                mode: action.mode
            };
        case "lightsInfo/allOnChanged":
            return {
                ...state,
                allOn: action.allOn
            };
        case "lightsInfo/anyOn":
            return {
                ...state,
                anyOn: action.anyOn
            };
        default:
            return state;
    }
};

export default lightsInfo;
