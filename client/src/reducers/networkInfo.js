const initialState = {
    loading: false,
    error: "",
    serverStatus: "",
    serverIpAddress: "",
    serverPort: "",
    latency: ""
    //phillipsHueBridgeStatus: ""
};

const networkInfo = (state = initialState, action) => {
    switch (action.type) {
        case "networkInfo/requestSent":
            return {
                ...state,
                loading: true,
                error: "",
                serverStatus: "Connecting",
                serverIpAddress: action.socket.hostname,
                serverPort: action.socket.port
            };
        case "networkInfo/requestSucceeded":
            return {
                ...state,
                loading: false,
                error: "",
                serverStatus: "Online",
                latency: action.latency
            };
        case "networkInfo/requestFailed":
            return {
                ...state,
                loading: false,
                error: action.error,
                serverStatus: "Error",
                latency: ""
            };
        case "networkInfo/requestTimedOut":
            return {
                ...state,
                loading: false,
                error: "",
                result: "",
                serverStatus: "Offline",
                latency: ""
            };
        default:
            return state;
    }
};

export default networkInfo;
