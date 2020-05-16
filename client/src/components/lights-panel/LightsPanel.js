import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ToggleButton from "../toggle-button/ToggleButton";
import LightsInfo from "../lights-info/LightsInfo";
import {
    localOnChanged,
    remoteGetLightsRequested,
    remoteSetLightsRequested
} from "../../actions/lightsActions";
import { remoteGetGroupsRequested } from "../../actions/settingsActions";
import { lightSlidersWindowOpened } from "../../actions/windowsActions";

const Container = styled.div`
    width: 100%;
    height: 100%;
    vertical-align: middle;
`;

const StateButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModeButtonContainer = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const InfoContainer = styled.div`
    width: 50%;
`;

function LightsPanel() {
    const lights = useSelector((state) => state.lights);
    const settings = useSelector((state) => state.settings);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!settings.remote.pending) {
            dispatch(remoteGetGroupsRequested());
        }
    }, [dispatch]);

    useEffect(() => {
        if (settings.local.targetRoom !== "") {
            dispatch(remoteGetLightsRequested());
        }
    }, [settings.local.targetRoom]);

    return (
        <Container>
            <StateButtonContainer>
                <ToggleButton
                    state={lights.local.on}
                    onClick={(state) => {
                        dispatch(localOnChanged(state));
                        dispatch(
                            remoteSetLightsRequested({
                                ...lights.local,
                                on: state
                            })
                        );
                    }}
                    disableWhenUntoggled={true}
                    labelOn="On"
                    labelOff="Off"
                    iconOn="/images/icons/On.png"
                    iconOff="/images/icons/Off.png"
                    size="large"
                />
            </StateButtonContainer>
            <ModeButtonContainer>
                <ToggleButton
                    state={false}
                    onClick={() => {
                        dispatch(lightSlidersWindowOpened());
                    }}
                    disableWhenUntoggled={false}
                    label={"Sliders"}
                    icon="/images/icons/Sliders.png"
                    size={"medium"}
                />
                <ToggleButton
                    state={false}
                    onClick={() => {}}
                    disableWhenUntoggled={false}
                    label={"Scenes"}
                    icon="/images/icons/Scenes.png"
                    size={"medium"}
                />
            </ModeButtonContainer>
            <InfoContainer>
                <LightsInfo info={lights.local.info} />
            </InfoContainer>
        </Container>
    );
}

/*
<SliderWrapper>
                
            </SliderWrapper>
            */

export default LightsPanel;
