import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import LightsPanel from "../lights-panel/LightsPanel";
import NetworkPanel from "../network-panel/NetworkPanel";
import SettingsPanel from "../settings-panel/SettingsPanel";

const Panel = styled.div`
    width: 96%;
    height: 460px;
    position: absolute;
    top: 220px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: rgb(26, 26, 26);
`;

const Margin = styled.div`
    width: 95%;
    height: 95%;
    margin: 2.5%;
`;

function MainPanel() {
    const mainMenu = useSelector((state) => state.mainMenu);

    return (
        <Panel>
            <Margin>
                {mainMenu.lightsPanelActive && <LightsPanel />}
                {mainMenu.networkPanelActive && <NetworkPanel />}
                {mainMenu.settingsPanelActive && <SettingsPanel />}
            </Margin>
        </Panel>
    );
}

export default MainPanel;
