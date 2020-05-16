import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LightSlidersWindow from "../light-sliders-window/LightSlidersWindow";

const Container = styled.div``;

function WindowContainer() {
    const windows = useSelector((state) => state.windows);

    return (
        <Container>
            {windows.lightSlidersWindowOpen && <LightSlidersWindow />}
        </Container>
    );
}

export default WindowContainer;
