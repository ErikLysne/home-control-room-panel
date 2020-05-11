import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
    localTargetRoomChanged,
    remoteGetGroupsRequest
} from "../../actions/settingsActions";
import RoomSelector from "../room-selector/RoomSelector";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function SettingsPanel() {
    const settings = useSelector((state) => state.settings);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(remoteGetGroupsRequest());
    }, [dispatch]);

    return (
        <Wrapper>
            <RoomSelector
                rooms={settings.local.availableRooms}
                target={settings.local.targetRoom}
                onChange={(room) => dispatch(localTargetRoomChanged(room))}
            />
        </Wrapper>
    );
}

export default SettingsPanel;
