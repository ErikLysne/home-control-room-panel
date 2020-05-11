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
