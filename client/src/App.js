import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import styled from "styled-components";
import rootReducer from "./util/rootReducer";

// Components
import Background from "./components/Background";
import InfoBar from "./components/InfoBar";
import LogoBar from "./components/LogoBar";
import MainMenu from "./components/MainMenu";
import MainPanel from "./components/MainPanel";
import WindowContainer from "./components/WindowContainer";

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
