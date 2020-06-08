import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import AcceptButton from "../Button";
import { roomActions, roomOperations } from "../../ducks/room";

/*
function RoomForm() {
    const room = useSelector((state) => state.room);
    const dispatch = useDispatch();

    const handleNameChange = (event) => {
        const name = event.target.value;
        dispatch(roomActions.nameChanged(name));
        dispatch(roomOperations.getGroupRequest(name));
    };

    const handleIsEntranceChange = (event) => {};

    const handleAcceptInfoBoxButtonClicked = (event) => {
        
        dispatch(roomActions.localLightsPulledFromRemote());
        dispatch(roomActions.remoteLightsCleared());
    };

    const handleHueNameChange = (event) => {
        const name = event.target.value;
        dispatch(roomActions.localLightsCleared());
        dispatch(roomActions.localHueNameChanged(name));
        dispatch(roomOperations.getGroupRequest(name));
    };

    useEffect(() => {
        if (
            room.remote.error === "" &&
            room.remote.hasData &&
            room.local.lights.hueName !== ""
        ) {
            dispatch(roomActions.localLightsPulledFromRemote());
        }
    }, [room.remote.hasData]);

    const infoBoxShouldRender =
        room.remote.hasData &&
        room.local.name !== "" &&
        room.local.lights.hueName === "" &&
        room.local.name === room.remote.lights.hueName;

    return (
        <form onSubmit={() => {}}>
            <Divider>General</Divider>
            <Grid>
                <p>Name</p>
                <Input onInput={handleNameChange} type="text" />
                <StatusIcon value={room.local.name === "" ? null : true} />
                <p>Is entrance?</p>
                <Input type="checkbox" />
                <br />
            </Grid>
            <Divider>Lights</Divider>
            {infoBoxShouldRender && (
                <InfoBox>
                    <p>
                        Found registered group
                        <span
                            style={{ color: "rgb(200, 0, 0)" }}
                        >{` ${room.remote.lights.hueName} `}</span>
                        on Hue bridge. Would you like to assign Hue group
                        <span
                            style={{ color: "rgb(200, 0, 0)" }}
                        >{` ${room.remote.lights.hueName} `}</span>
                        to current room?
                    </p>
                    <AcceptButton onClick={handleAcceptInfoBoxButtonClicked}>
                        Accept
                    </AcceptButton>
                </InfoBox>
            )}
            <Grid>
                <p>Hue group name</p>
                <Input
                    type="text"
                    value={room.local.lights.hueName}
                    onInput={handleHueNameChange}
                />
                <StatusIcon
                    pending={room.remote.pending}
                    value={
                        room.local.lights.hueName === ""
                            ? null
                            : room.remote.hasData
                    }
                />
                <p>Hue ID</p>
                <Input type="text" value={room.local.lights.hueId} disabled />
                <StatusIcon
                    value={
                        room.local.lights.hueName === "" ||
                        room.remote.hasData === false
                            ? null
                            : true
                    }
                />
                <p>Lights</p>
                <Input type="text" value={room.local.lights.lights} disabled />
                <StatusIcon
                    value={
                        room.local.lights.hueName === "" ||
                        room.remote.hasData === false
                            ? null
                            : true
                    }
                />
                <p>On</p>
                <Input
                    type="checkbox"
                    checked={room.local.lights.on}
                    disabled
                />
                <StatusIcon
                    value={
                        room.local.lights.hueName === "" ||
                        room.remote.hasData === false
                            ? null
                            : true
                    }
                />
                <p>Hue</p>
                <Input type="text" value={room.local.lights.hue} disabled />
                <StatusIcon
                    value={
                        room.local.lights.hueName === "" ||
                        room.remote.hasData === false
                            ? null
                            : true
                    }
                />
                <p>Saturation</p>
                <Input
                    type="text"
                    value={room.local.lights.saturation}
                    disabled
                />
                <StatusIcon
                    value={
                        room.local.lights.hueName === "" ||
                        room.remote.hasData === false
                            ? null
                            : true
                    }
                />
                <p>Brightness</p>
                <Input
                    type="text"
                    value={room.local.lights.brightness}
                    disabled
                />
                <StatusIcon
                    value={
                        room.local.lights.hueName === "" ||
                        room.remote.hasData === false
                            ? null
                            : true
                    }
                />
                <p>Color temp</p>
                <Input
                    type="text"
                    value={room.local.lights.colorTemp}
                    disabled
                />
                <StatusIcon
                    value={
                        room.local.lights.hueName === "" ||
                        room.remote.hasData === false
                            ? null
                            : true
                    }
                />
                <p>Effect</p>
                <Input type="text" value={room.local.lights.effect} disabled />
                <StatusIcon
                    value={
                        room.local.lights.hueName === "" ||
                        room.remote.hasData === false
                            ? null
                            : true
                    }
                />
                <p>Alert</p>
                <Input type="text" value={room.local.lights.alert} disabled />
                <StatusIcon
                    value={
                        room.local.lights.hueName === "" ||
                        room.remote.hasData === false
                            ? null
                            : true
                    }
                />
            </Grid>

            <Divider>Sensors</Divider>
            <Grid>
                <p>SenseBox IP Address</p>
                <Input type="text" value={""} onInput={() => {}} />
                <br />
                <p>Sensors:</p>
                <p />
                <br />
                <p>Passive Infrared</p>
                <Input type="checkbox" checked={false} />
                <br />
                <p>Temperature</p>
                <Input type="checkbox" checked={false} />
                <br />
            </Grid>
            <Divider />
            <SubmitButtonContainer>
                <AcceptButton type="submit">Submit</AcceptButton>
            </SubmitButtonContainer>
        </form>
    );
}

export default RoomForm;
*/
