import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ToggleButton from "./ToggleButton";
import LightsInfo from "./LightsInfo";
import Grid from "./Grid";
import GridCell from "./GridCell";
import { lightsActions, lightsOperations } from "../ducks/lights";
import { configOperations } from "../ducks/config";
import { windowsActions } from "../ducks/windows";

function LightsPanel() {
    const lights = useSelector((state) => state.lights);
    const config = useSelector((state) => state.config);
    const menu = useSelector((state) => state.menu);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!config.remote.pending) {
            dispatch(configOperations.getGroupsRequested());
        }
    }, [dispatch]);

    useEffect(() => {
        if (
            config.local.targetRoom !== "" &&
            menu.activePanelIndexCurrent === 0
        ) {
            dispatch(lightsOperations.getLightsRequested());
        }
    }, [config.local.targetRoom, menu.activePanelIndexCurrent]);

    return (
        <Grid>
            <GridCell rowStart={1} rowEnd={2} columnStart={1} columnEnd={3}>
                <Grid>
                    <GridCell
                        rowStart={1}
                        rowEnd={2}
                        columnStart={1}
                        columnEnd={2}
                    >
                        <ToggleButton
                            state={lights.local.on}
                            onClick={(state) => {
                                dispatch(lightsActions.localOnChanged(state));
                                dispatch(
                                    lightsOperations.setLightsRequested({
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
                    </GridCell>
                </Grid>
            </GridCell>
            <GridCell rowStart={1} rowEnd={2} columnStart={2} columnEnd={3}>
                <LightsInfo info={lights.local.info} />
            </GridCell>
            <GridCell rowStart={2} rowEnd={3} columnStart={1} columnEnd={3}>
                <ToggleButton
                    state={false}
                    onClick={() => {
                        dispatch(windowsActions.lightsSlidersWindowOpened());
                    }}
                    disableWhenUntoggled={false}
                    label={"Sliders"}
                    icon="/images/icons/Sliders.png"
                    size={"medium"}
                />
                <ToggleButton
                    state={false}
                    onClick={() => {
                        dispatch(windowsActions.lightsKelvinWindowOpened());
                    }}
                    disableWhenUntoggled={false}
                    label={"Kelvin"}
                    icon="/images/icons/Kelvin.png"
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
            </GridCell>
        </Grid>
    );
}

export default LightsPanel;
