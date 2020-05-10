import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ToggleButton from "../toggle-button/ToggleButton";
import LightsInfo from "../lights-info/LightsInfo";
import LightSlider from "../light-slider/LightSlider";
import {
    localOnChanged,
    localHueChanged,
    localSaturationChanged,
    localBrightnessChanged,
    remoteGetLightsRequest,
    remoteSetLightsRequest
} from "../../actions/lightsActions";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const LightsInfoWrapper = styled.div`
    width: 45%;
    height: 120px;
    float: left;
`;
const LightsStateButtonWrapper = styled.div`
    width: 45%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function LightsPanel() {
    const lights = useSelector((state) => state.lights);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(remoteGetLightsRequest());
    }, []);

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
        <Wrapper>
            <LightsInfoWrapper>
                <LightsInfo />
            </LightsInfoWrapper>
            <LightsStateButtonWrapper>
                <ToggleButton
                    state={lights.local.on}
                    onClick={(state) => {
                        dispatch(localOnChanged(state));
                        dispatch(
                            remoteSetLightsRequest({
                                ...lights.local,
                                on: state
                            })
                        );
                    }}
                    labelOn="On"
                    labelOff="Off"
                    iconOn="/images/icons/On.png"
                    iconOff="/images/icons/Off.png"
                    size="large"
                />
            </LightsStateButtonWrapper>
            <LightSlider
                property={"Hue"}
                backgroundImage={"/images/HueSlider.png"}
                value={convertToHueFromRaw(lights.local.hue)}
                onChange={(value) => {
                    const raw = convertToRawFromHue(value);
                    dispatch(localHueChanged(raw));
                    dispatch(
                        remoteSetLightsRequest({ ...lights.local, hue: raw })
                    );
                }}
            />
            <LightSlider
                property={"Saturation"}
                backgroundImage={"/images/SaturationSlider.png"}
                value={convertToSaturationFromRaw(lights.local.saturation)}
                onChange={(value) => {
                    const raw = convertToRawFromSaturation(value);
                    dispatch(localSaturationChanged(raw));
                    dispatch(
                        remoteSetLightsRequest({
                            ...lights.local,
                            saturation: raw
                        })
                    );
                }}
            />
            <LightSlider
                property={"Brightness"}
                backgroundImage={"/images/BrightnessSlider.png"}
                value={convertToBrightnessFromRaw(lights.local.brightness)}
                onChange={(value) => {
                    const raw = convertToRawFromBrightness(value);
                    dispatch(localBrightnessChanged(raw));
                    dispatch(
                        remoteSetLightsRequest({
                            ...lights.local,
                            brightness: raw
                        })
                    );
                }}
            />
        </Wrapper>
    );
}

export default LightsPanel;
