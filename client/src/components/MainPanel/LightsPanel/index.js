import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ToggleButton from "../../ToggleButton";
import Info from "./Info";
import Grid from "../Grid";
import GridCell from "../GridCell";
import { lightsActions, lightsOperations } from "../../../ducks/lights";
import { configOperations } from "../../../ducks/config";
import { windowsActions } from "../../../ducks/windows";

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
            <GridCell row={{ start: 1, end: 2 }} column={{ start: 1, end: 2 }}>
                <Grid rows={2} columns={1}>
                    <GridCell
                        row={{ start: 1, end: 2 }}
                        column={{ start: 1, end: 2 }}
                    >
                        <ToggleButton
                            toggled={lights.local.on}
                            onClick={(state) => {
                                dispatch(lightsActions.localOnChanged(state));
                                dispatch(
                                    lightsOperations.setLightsRequested({
                                        ...lights.local,
                                        on: state
                                    })
                                );
                            }}
                            size="large"
                            togglable
                            disabledWhenUntoggled
                            label={{
                                enabled: "On",
                                disabled: "Off"
                            }}
                            icon={{
                                enabled: "/images/icons/On.png",
                                disabled: "/images/icons/Off.png"
                            }}
                        />
                    </GridCell>
                </Grid>
            </GridCell>
            <GridCell row={{ start: 1, end: 2 }} column={{ start: 2, end: 3 }}>
                <Info info={lights.local.info} />
            </GridCell>
            <GridCell row={{ start: 2, end: 3 }} column={{ start: 1, end: 3 }}>
                <ToggleButton
                    onClick={() => {
                        dispatch(windowsActions.lightsSlidersWindowOpened());
                    }}
                    size={"medium"}
                    label={{ default: "Sliders" }}
                    icon={{ default: "/images/icons/Sliders.png" }}
                />
                <ToggleButton
                    onClick={() => {
                        dispatch(windowsActions.lightsKelvinWindowOpened());
                    }}
                    size={"medium"}
                    label={{ default: "Kelvin" }}
                    icon={{ default: "/images/icons/Kelvin.png" }}
                />
                <ToggleButton
                    onClick={() => {}}
                    size={"medium"}
                    label={{ default: "Scenes" }}
                    icon={{ default: "/images/icons/Scenes.png" }}
                />
            </GridCell>
        </Grid>
    );
}

export default LightsPanel;
