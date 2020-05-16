import React from "react";
import styled from "styled-components";
import Carousel from "../carousel/Carousel";
import LightsPanel from "../lights-panel/LightsPanel";
import NetworkPanel from "../network-panel/NetworkPanel";
import SettingsPanel from "../settings-panel/SettingsPanel";

const Margin = styled.div`
    width: 95%;
    height: 95%;
    margin: 2.5%;
`;

function MainPanel() {
    return (
        <Carousel>
            <Margin>
                <LightsPanel />
            </Margin>
            <Margin>
                <NetworkPanel />
            </Margin>
            <div />
            <Margin>
                <SettingsPanel />
            </Margin>
        </Carousel>
    );
}

export default MainPanel;
