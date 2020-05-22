import React from "react";
import styled from "styled-components";
import Carousel from "../carousel/Carousel";
import LightsPanel from "../lights-panel/LightsPanel";
import NetworkPanel from "../network-panel/NetworkPanel";
import SettingsPanel from "../settings-panel/SettingsPanel";

function MainPanel() {
    return (
        <Carousel>
            <LightsPanel />
            <NetworkPanel />
            <div />
            <SettingsPanel />
        </Carousel>
    );
}

export default MainPanel;
