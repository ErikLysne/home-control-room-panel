import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ToggleButton from "../toggle-button/ToggleButton";
import { menuActions } from "../../ducks/menu";

const Container = styled.div`
    width: 90vw;
    height: 120px;
    position: absolute;
    top: 80px;
    left: 2.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(5, 17, 25);
    opacity: 0.8;
    box-shadow: 0px 0px 5px 2px rgba(211, 226, 252, 0.75);
`;

function MainMenu() {
    const { activePanelIndexCurrent } = useSelector((state) => state.menu);
    const dispatch = useDispatch();

    return (
        <Container>
            <ToggleButton
                onClick={() =>
                    dispatch(
                        menuActions.lightsPanelActivated(
                            activePanelIndexCurrent
                        )
                    )
                }
                state={activePanelIndexCurrent === 0}
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
                        menuActions.networkPanelActivated(
                            activePanelIndexCurrent
                        )
                    )
                }
                state={activePanelIndexCurrent === 1}
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
                        menuActions.sensorsPanelActivated(
                            activePanelIndexCurrent
                        )
                    )
                }
                state={activePanelIndexCurrent === 2}
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
                        menuActions.settingsPanelActivated(
                            activePanelIndexCurrent
                        )
                    )
                }
                state={activePanelIndexCurrent === 3}
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
