import * as types from "./types";

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
    const { type, payload } = action;

    const { local, remote } = state;

    switch (type) {
        case types.GROUPS_UPDATED:
            local.availableRooms = [];
            payload.groups.forEach((group) => {
                local.availableRooms.push({
                    name: group.name,
                    id: group.id
                });
            });
            if (local.targetRoom === "") {
                local.targetRoom = local.availableRooms[0].name;
            }
            break;
        case types.TARGET_ROOM_CHANGED:
            local.targetRoom = payload.targetRoom;
            break;
        case types.REQUEST_SENT:
            remote.pending = true;
            remote.error = "";
            break;
        case types.REQUEST_SUCCEEDED:
            remote.pending = false;
            remote.error = "";
            break;
        case types.REQUEST_FAILED:
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
};

export default settings;
