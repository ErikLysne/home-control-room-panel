import React from "react";
import styled from "styled-components";
import Background from "./components/background/Background";
import InfoBar from "./components/info-bar/InfoBar";
import LogoBar from "./components/logo-bar/LogoBar";
import MainMenu from "./components/main-menu/MainMenu";
import MainPanel from "./components/main-panel/MainPanel";

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
`;

function App() {
    return (
        <Wrapper>
            <Background />
            <InfoBar />
            <LogoBar />
            <MainMenu />
            <MainPanel />
        </Wrapper>
    );
}

export default App;
