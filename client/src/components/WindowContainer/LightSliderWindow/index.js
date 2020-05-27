import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Window from "../Window";
import LightSlider from "./LightSlider";
import { windowsActions } from "../../../ducks/windows";
import { lightsActions, lightsOperations } from "../../../ducks/lights";

const SliderContainer = styled.div`
    width: 300px;
    margin: 30px auto;
`;

const hueToRaw = (hue) => Math.round((hue * 65535.0) / 100.0);
const brightnessToRaw = (brightness) =>
    Math.round(1 + (brightness * 253.0) / 100.0);
const saturationToRaw = (saturation) =>
    Math.round((saturation * 254.0) / 100.0);

const rawToHue = (raw) => Math.round((raw * 100.0) / 65535.0);
const rawToBrightness = (raw) => Math.round(((raw - 1) * 100.0) / 253.0);
const rawToSaturation = (raw) => Math.round((raw * 100.0) / 254.0);

function LightSlidersWindow() {
    const lights = useSelector((state) => state.lights);
    const dispatch = useDispatch();

    return (
        <Window
            title={"Light Sliders"}
            onClose={() => dispatch(windowsActions.lightsSlidersWindowClosed())}
        >
            <SliderContainer>
                <LightSlider
                    property={"Hue"}
                    backgroundImage={"/images/HueSlider.png"}
                    value={rawToHue(lights.local.hue)}
                    onChange={(value) => {
                        const raw = hueToRaw(value);
                        dispatch(lightsActions.localHueChanged(raw));
                        dispatch(
                            lightsOperations.setLightsRequested({
                                ...lights.local,
                                hue: raw
                            })
                        );
                    }}
                    isActive={lights.local.on}
                />
                <LightSlider
                    property={"Saturation"}
                    backgroundImage={"/images/SaturationSlider.png"}
                    value={rawToSaturation(lights.local.saturation)}
                    onChange={(value) => {
                        const raw = saturationToRaw(value);
                        dispatch(lightsActions.localSaturationChanged(raw));
                        dispatch(
                            lightsOperations.setLightsRequested({
                                ...lights.local,
                                saturation: raw
                            })
                        );
                    }}
                    isActive={lights.local.on}
                />
                <LightSlider
                    property={"Brightness"}
                    backgroundImage={"/images/BrightnessSlider.png"}
                    value={rawToBrightness(lights.local.brightness)}
                    onChange={(value) => {
                        const raw = brightnessToRaw(value);
                        dispatch(lightsActions.localBrightnessChanged(raw));
                        dispatch(
                            lightsOperations.setLightsRequested({
                                ...lights.local,
                                brightness: raw
                            })
                        );
                    }}
                    isActive={lights.local.on}
                />
            </SliderContainer>
        </Window>
    );
}

export default LightSlidersWindow;
