const initialState = {
    loading: false,
    result: "",
    error: ""
};

const lightsUpdater = (state = initialState, action) => {
    switch (action.type) {
        case "lightsUpdater/requestSent":
            return {
                ...state,
                loading: true,
                result: "",
                error: ""
            };

        case "lightsUpdater/requestSucceeded":
            return {
                ...state,
                loading: false,
                result: "",
                error: action.error
            };

        case "lightsUpdater/requestFailed":
            return {
                ...state,
                loading: false,
                result: action.result,
                error: ""
            };
        case "lightsUpdater/requestTimedOut":
            return {
                ...state,
                loading: false,
                result: "",
                error: "Request timed out"
            };
        default:
            return state;
    }
};

export default lightsUpdater;
