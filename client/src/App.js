import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import styled from "styled-components";
import rootReducer from "./reducers";

// Components
import Background from "./components/background/Background";
import InfoBar from "./components/info-bar/InfoBar";
import LogoBar from "./components/logo-bar/LogoBar";
import MainMenu from "./components/main-menu/MainMenu";
import MainPanel from "./components/main-panel/MainPanel";

import WindowContainer from "./components/window-container/WindowContainer";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(logger, thunk))
);

const Container = styled.div`
    position: relative;
    width: 100vw;
    overflow: hidden;
`;

function App() {
    return (
        <Provider store={store}>
            <Container>
                <Background />
                <InfoBar />
                <LogoBar />
                <MainMenu />
                <MainPanel />
                <WindowContainer />
            </Container>
        </Provider>
    );
}

export default App;
