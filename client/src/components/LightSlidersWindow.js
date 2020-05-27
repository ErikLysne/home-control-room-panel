import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Window from "./Window";
import LightSlider from "./LightSlider";
import { windowsActions } from "../ducks/windows";
import { lightsActions, lightsOperations } from "../ducks/lights";

const SliderContainer = styled.div`
    width: 300px;
    margin: 30px auto;
`;

function LightSlidersWindow() {
    const lights = useSelector((state) => state.lights);
    const dispatch = useDispatch();

    const convertToRawFromHue = (hue) => Math.round((hue * 65535.0) / 100.0);
    const convertToRawFromBrightness = (brightness) =>
        Math.round(1 + (brightness * 253.0) / 100.0);
    const convertToRawFromSaturation = (saturation) =>
        Math.round((saturation * 254.0) / 100.0);

    const convertToHueFromRaw = (raw) => Math.round((raw * 100.0) / 65535.0);
    const convertToBrightnessFromRaw = (raw) =>
        Math.round(((raw - 1) * 100.0) / 253.0);
    const convertToSaturationFromRaw = (raw) =>
        Math.round((raw * 100.0) / 254.0);

    return (
        <Window
            title={"Light Sliders"}
            onClose={() => dispatch(windowsActions.lightsSlidersWindowClosed())}
        >
            <SliderContainer>
                <LightSlider
                    property={"Hue"}
                    backgroundImage={"/images/HueSlider.png"}
                    value={convertToHueFromRaw(lights.local.hue)}
                    onChange={(value) => {
                        const raw = convertToRawFromHue(value);
                        dispatch(lightsActions.localHueChanged(raw));
                        dispatch(
                            lightsOperations.setLightsRequested({
                                ...lights.local,
                                hue: raw
                            })
                        );
                    }}
                    active={lights.local.on}
                />
                <LightSlider
                    property={"Saturation"}
                    backgroundImage={"/images/SaturationSlider.png"}
                    value={convertToSaturationFromRaw(lights.local.saturation)}
                    onChange={(value) => {
                        const raw = convertToRawFromSaturation(value);
                        dispatch(lightsActions.localSaturationChanged(raw));
                        dispatch(
                            lightsOperations.setLightsRequested({
                                ...lights.local,
                                saturation: raw
                            })
                        );
                    }}
                    active={lights.local.on}
                />
                <LightSlider
                    property={"Brightness"}
                    backgroundImage={"/images/BrightnessSlider.png"}
                    value={convertToBrightnessFromRaw(lights.local.brightness)}
                    onChange={(value) => {
                        const raw = convertToRawFromBrightness(value);
                        dispatch(lightsActions.localBrightnessChanged(raw));
                        dispatch(
                            lightsOperations.setLightsRequested({
                                ...lights.local,
                                brightness: raw
                            })
                        );
                    }}
                    active={lights.local.on}
                />
            </SliderContainer>
        </Window>
    );
}

export default LightSlidersWindow;
