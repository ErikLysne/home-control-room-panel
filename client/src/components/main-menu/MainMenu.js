import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ToggleButton from "../toggle-button/ToggleButton";
import {
    lightsPanelActivated,
    networkPanelActivated,
    sensorsPanelActivated,
    settingsPanelActivated
} from "../../actions/mainMenuActions";

const Wrapper = styled.div`
    width: 96%;
    height: 120px;
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(26, 26, 26);
`;

function MainMenu() {
    const mainMenu = useSelector((state) => state.mainMenu);
    const dispatch = useDispatch();

    return (
        <Wrapper>
            <ToggleButton
                onClick={() => dispatch(lightsPanelActivated())}
                state={mainMenu.lightsPanelActive}
                labelOn="Light"
                labelOff="Light"
                iconOn="/images/icons/Lights.png"
                iconOff="/images/icons/Lights.png"
                size="medium"
            />
            <ToggleButton
                onClick={() => dispatch(networkPanelActivated())}
                state={mainMenu.networkPanelActive}
                labelOn="Network"
                labelOff="Network"
                iconOn="/images/icons/Network.png"
                iconOff="/images/icons/Network.png"
                size="medium"
            />
            <ToggleButton
                onClick={() => dispatch(sensorsPanelActivated())}
                state={mainMenu.sensorsPanelActive}
                labelOn="Sensors"
                labelOff="Sensors"
                iconOn="/images/icons/Sensors.png"
                iconOff="/images/icons/Sensors.png"
                size="medium"
            />
            <ToggleButton
                onClick={() => dispatch(settingsPanelActivated())}
                state={mainMenu.settingsPanelActive}
                labelOn="Settings"
                labelOff="Settings"
                iconOn="/images/icons/Settings.png"
                iconOff="/images/icons/Settings.png"
                size="medium"
            />
        </Wrapper>
    );
}

export default MainMenu;
