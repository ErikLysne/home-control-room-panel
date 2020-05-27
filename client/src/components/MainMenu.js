import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ToggleButton from "./ToggleButton";
import { menuActions } from "../ducks/menu";

const Container = styled.div`
    width: 90vw;
    height: 120px;
    position: absolute;
    bottom: 20px;
    left: 2.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(5, 17, 25, 0.75);
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
                toggled={activePanelIndexCurrent === 0}
                size="medium"
                disabledWhenUntoggled
                label={{
                    default: "Lights"
                }}
                icon={{
                    default: "/images/icons/Lights.png"
                }}
            />
            <ToggleButton
                onClick={() =>
                    dispatch(
                        menuActions.networkPanelActivated(
                            activePanelIndexCurrent
                        )
                    )
                }
                toggled={activePanelIndexCurrent === 1}
                size="medium"
                disabledWhenUntoggled
                label={{
                    default: "Network"
                }}
                icon={{
                    default: "/images/icons/Network.png"
                }}
            />
            <ToggleButton
                onClick={() =>
                    dispatch(
                        menuActions.sensorsPanelActivated(
                            activePanelIndexCurrent
                        )
                    )
                }
                toggled={activePanelIndexCurrent === 2}
                size="medium"
                disabledWhenUntoggled
                label={{
                    default: "Sensors"
                }}
                icon={{
                    default: "/images/icons/Sensors.png"
                }}
            />
            <ToggleButton
                onClick={() =>
                    dispatch(
                        menuActions.settingsPanelActivated(
                            activePanelIndexCurrent
                        )
                    )
                }
                toggled={activePanelIndexCurrent === 3}
                size="medium"
                disabledWhenUntoggled
                label={{
                    default: "Settings"
                }}
                icon={{
                    default: "/images/icons/Settings.png"
                }}
            />
        </Container>
    );
}

export default MainMenu;
