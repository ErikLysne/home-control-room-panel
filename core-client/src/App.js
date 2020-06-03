import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import Background from "./components/Background";
import LogoBar from "./components/LogoBar";
import MainContainer from "./components/MainContainer";
import Sidebar from "./components/Sidebar";
import MainPanel from "./components/MainPanel";
import rootReducer from "./util/rootReducer";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

function App() {
    return (
        <Provider store={store}>
            <Background />
            <MainContainer>
                <Sidebar />
                <MainPanel />
            </MainContainer>
            <LogoBar />
        </Provider>
    );
}

export default App;
