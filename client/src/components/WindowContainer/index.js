import React from "react";
import { useSelector } from "react-redux";
import LightSlidersWindow from "./LightSliderWindow";
import LightKelvinWindow from "./LightKelvinWindow";

function WindowContainer() {
    const windows = useSelector((state) => state.windows);

    return (
        <>
            {windows.lights.slidersWindowOpen && <LightSlidersWindow />}
            {windows.lights.kelvinWindowOpen && <LightKelvinWindow />}
        </>
    );
}

export default WindowContainer;
