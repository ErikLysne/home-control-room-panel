import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import AcceptButton from "./AcceptButton";
import { roomActions, roomOperations } from "../../ducks/room";

const Divider = styled.div`
    width: 80%;
    height: 2rem;
    margin: 10px auto;
    font-size: 1.25rem;
    line-height: 2rem;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    border-color: rgba(211, 226, 252, 0.5);
    background-color: rgba(38, 39, 44, 0.5);
`;

const Grid = styled.div`
    height: ${(props) => props.rows * 2}rem;
    padding: 0 1% 0 10%;
    display: grid;
    grid-template-columns: 40% 50% 10%;
    & > * {
        height: 1rem;
        margin: 5px 0;
    }
`;

const Input = styled.input`
    background-color: rgba(38, 39, 44, 0.5);
    color: rgb(255, 255, 255);

    &:disabled {
        background-color: rgba(75, 75, 75, 1);
    }
`;

const StatusIcon = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${(props) =>
        props.pending
            ? "/images/LoadingSpinner.gif"
            : props.value !== null
            ? props.value === true
                ? "/images/icons/Success.png"
                : "/images/icons/Fail.png"
            : ""});
    background-repeat: no-repeat;
    background-position: center;
`;

const InfoBox = styled.div`
    width: 80%;
    margin: 10px auto;
    text-align: center;
    color: rgb(0, 0, 0);
    background-color: rgba(250, 250, 250, 0.75);
    animation: ${() => openingAnimation()};
    animation-duration: 1s;
    & > * {
        padding: 10px 5px;
    }
`;

const openingAnimation = () => keyframes`
        0% {
            opacity: 0
        }

        100% {
            opacity: 1
        }
`;

const SubmitButtonContainer = styled.div`
    width: 80%;
    margin: 10px auto;
    text-align: center;
`;

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
        event.preventDefault();
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
