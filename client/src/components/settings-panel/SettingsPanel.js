import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "../grid/Grid";
import GridCell from "../grid-cell/GridCell";
import RoomSelector from "../room-selector/RoomSelector";
import { configActions } from "../../ducks/config";

function SettingsPanel() {
    const config = useSelector((state) => state.config);
    const { availableRooms, targetRoom } = config.local;
    const dispatch = useDispatch();

    return (
        <Grid>
            <GridCell rowStart={1} rowEnd={2} columnStart={1} columnEnd={3}>
                <RoomSelector
                    rooms={availableRooms}
                    target={targetRoom}
                    onChange={(room) =>
                        dispatch(configActions.localTargetRoomChanged(room))
                    }
                />
            </GridCell>
            <GridCell
                rowStart={2}
                rowEnd={3}
                columnStart={1}
                columnEnd={3}
            ></GridCell>
        </Grid>
    );
}

export default SettingsPanel;
