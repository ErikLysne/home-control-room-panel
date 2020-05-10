//import io from "socket.io-client";
const ENDPOINT = "http://10.0.0.10:8080";

//const socket = io.connect(ENDPOINT);

// Lights updater

// Network info
export const networkInfoRequestSent = (socket) => ({
    type: "networkInfo/requestSent",
    socket: socket
});

export const networkInfoSucceeded = (latency) => ({
    type: "networkInfo/requestSucceeded",
    latency: latency
});

export const networkInfoFailed = (error) => ({
    type: "networkInfo/requestFailed",
    error: error
});

export const networkInfoTimedOut = (result) => ({
    type: "networkInfo/requestTimedOut"
});

export const networkInfoRequested = () => {
    const REQUEST_TIMEOUT = 1000;
    const startTime = new Date();

    return (dispatch) => {
        /*
        dispatch(networkInfoRequestSent(socket.io.opts));
        unsubscribe();

        const timer = setTimeout(() => {
            dispatch(networkInfoTimedOut());
            unsubscribe();
        }, REQUEST_TIMEOUT);

        socket.on("request-network-info-success", (response) => {
            const endTime = new Date();
            const latency = endTime.getTime() - startTime.getTime();
            dispatch(networkInfoSucceeded(latency));
            unsubscribe();
            clearTimeout(timer);
        });

        console.log(socket);
        socket.emit("request-network-info");
        */
    };
};
