import React from "react";
import styled from "styled-components";
import Background from "./components/background/Background";
import InfoBar from "./components/info-bar/InfoBar";
import LogoBar from "./components/logo-bar/LogoBar";
import MainMenu from "./components/main-menu/MainMenu";
import MainPanel from "./components/main-panel/MainPanel";

const AppWrapper = styled.div`
    width: 100vw;
    height: 100vh;
`;

function App() {
    return (
        <AppWrapper>
            <Background />
            <InfoBar />
            <LogoBar />
            <MainMenu />
            <MainPanel />
        </AppWrapper>
    );
}

export default App;
