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

const Container = styled.div`
    width: 450px;
    height: 120px;
    position: absolute;
    top: 80px;
    left: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(38, 39, 44);
    opacity: 0.9;
    border-style: ridge;
    border-color: rgb(50, 90, 110);
`;

function MainMenu() {
    const mainMenu = useSelector((state) => state.mainMenu);
    const dispatch = useDispatch();

    return (
        <Container>
            <ToggleButton
                onClick={() =>
                    dispatch(
                        lightsPanelActivated(mainMenu.activePanelIndexCurrent)
                    )
                }
                state={mainMenu.activePanelIndexCurrent === 0}
                disableWhenUntoggled={true}
                labelOn="Light"
                labelOff="Light"
                iconOn="/images/icons/Lights.png"
                iconOff="/images/icons/Lights.png"
                size="medium"
            />
            <ToggleButton
                onClick={() =>
                    dispatch(
                        networkPanelActivated(mainMenu.activePanelIndexCurrent)
                    )
                }
                state={mainMenu.activePanelIndexCurrent === 1}
                disableWhenUntoggled={true}
                labelOn="Network"
                labelOff="Network"
                iconOn="/images/icons/Network.png"
                iconOff="/images/icons/Network.png"
                size="medium"
            />
            <ToggleButton
                onClick={() =>
                    dispatch(
                        sensorsPanelActivated(mainMenu.activePanelIndexCurrent)
                    )
                }
                state={mainMenu.activePanelIndexCurrent === 2}
                disableWhenUntoggled={true}
                labelOn="Sensors"
                labelOff="Sensors"
                iconOn="/images/icons/Sensors.png"
                iconOff="/images/icons/Sensors.png"
                size="medium"
            />
            <ToggleButton
                onClick={() =>
                    dispatch(
                        settingsPanelActivated(mainMenu.activePanelIndexCurrent)
                    )
                }
                state={mainMenu.activePanelIndexCurrent === 3}
                disableWhenUntoggled={true}
                labelOn="Settings"
                labelOff="Settings"
                iconOn="/images/icons/Settings.png"
                iconOff="/images/icons/Settings.png"
                size="medium"
            />
        </Container>
    );
}

export default MainMenu;
