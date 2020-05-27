import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LightSlidersWindow from "./LightSlidersWindow";
import LightKelvinWindow from "./LightKelvinWindow";

const Container = styled.div``;

function WindowContainer() {
    const windows = useSelector((state) => state.windows);

    return (
        <Container>
            {windows.lights.slidersWindowOpen && <LightSlidersWindow />}
            {windows.lights.kelvinWindowOpen && <LightKelvinWindow />}
        </Container>
    );
}

export default WindowContainer;
