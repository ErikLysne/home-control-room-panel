import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "../Grid";
import GridCell from "../GridCell";
import RoomSelector from "./RoomSelector";
import { configActions } from "../../../ducks/config";

function SettingsPanel() {
    const config = useSelector((state) => state.config);
    const { availableRooms, targetRoom } = config.local;
    const dispatch = useDispatch();

    return (
        <Grid>
            <GridCell row={{ start: 1, end: 2 }} column={{ start: 1, end: 3 }}>
                <RoomSelector
                    rooms={availableRooms}
                    target={targetRoom}
                    onChange={(room) =>
                        dispatch(configActions.localTargetRoomChanged(room))
                    }
                />
            </GridCell>
            <GridCell
                row={{ start: 2, end: 3 }}
                column={{ start: 1, end: 3 }}
            ></GridCell>
        </Grid>
    );
}

export default SettingsPanel;
