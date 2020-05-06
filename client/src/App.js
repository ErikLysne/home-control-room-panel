import React, { useEffect } from "react";
import socketClient from "socket.io-client";
import styled from "styled-components";
import Background from "./components/background/Background";
import InfoBar from "./components/info-bar/InfoBar";
import LogoBar from "./components/logo-bar/LogoBar";
import MainMenu from "./components/main-menu/MainMenu";
import MainPanel from "./components/main-panel/MainPanel";

const ENDPOINT = "http://10.0.0.10:8080";

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
`;

function App() {
    useEffect(() => {
        const socket = socketClient(ENDPOINT);
        socket.on("test", () => {
            console.log("Hello from server!");
        });
    });

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
