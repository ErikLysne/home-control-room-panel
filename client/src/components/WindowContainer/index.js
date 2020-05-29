import React from "react";
import { useSelector } from "react-redux";
import SlidersWindow from "./SlidersWindow";
import KelvinWindow from "./KelvinWindow";
import FunctionsWindow from "./FunctionsWindow";

function WindowContainer() {
    const windows = useSelector((state) => state.windows);

    return (
        <>
            {windows.lights.slidersWindowOpen && <SlidersWindow />}
            {windows.lights.kelvinWindowOpen && <KelvinWindow />}
            {windows.lights.functionsWindowOpen && <FunctionsWindow />}
        </>
    );
}

export default WindowContainer;
