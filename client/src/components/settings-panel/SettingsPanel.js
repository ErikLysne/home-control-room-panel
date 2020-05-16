import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import RoomSelector from "../room-selector/RoomSelector";
import { localTargetRoomChanged } from "../../actions/settingsActions";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function SettingsPanel() {
    const settings = useSelector((state) => state.settings);
    const { availableRooms, targetRoom } = settings.local;
    const dispatch = useDispatch();

    return (
        <Wrapper>
            <RoomSelector
                rooms={availableRooms}
                target={targetRoom}
                onChange={(room) => dispatch(localTargetRoomChanged(room))}
            />
        </Wrapper>
    );
}

export default SettingsPanel;
