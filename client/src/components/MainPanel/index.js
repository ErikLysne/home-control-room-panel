import React from "react";
import Carousel from "./Carousel";
import LightsPanel from "./LightsPanel";
import NetworkPanel from "./NetworkPanel";
import SettingsPanel from "./SettingsPanel";

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
