const initialState = {
    local: {
        targetRoom: "",
        availableRooms: [],
        serverIpAddress: "10.0.0.10",
        serverPort: "8080"
    },
    remote: {
        pending: false,
        error: ""
    }
};

const settings = (state = initialState, action) => {
    const { type } = action;
    const actionPath = type.split("/");

    if (actionPath[0] !== "settings") {
        return state;
    }

    if (actionPath[1] === "local") {
        const local = state.local;
        switch (actionPath[2]) {
            case "updatedFromRemote":
                local.availableRooms = [];
                action.groups.forEach((group) => {
                    local.availableRooms.push({
                        name: group.name,
                        id: group.id
                    });
                });
                if (local.targetRoom === "") {
                    local.targetRoom = local.availableRooms[0].name;
                }
                break;
            case "targetRoomChanged":
                local.targetRoom = action.targetRoom;
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

export default settings;
