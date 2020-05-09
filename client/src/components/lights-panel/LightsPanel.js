import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ToggleButton from "../toggle-button/ToggleButton";
import LightsInfo from "../lights-info/LightsInfo";
import LightSlider from "../light-slider/LightSlider";
import {
    lightsStateChanged,
    lightsHueChanged,
    lightsSaturationChanged,
    lightsBrightnessChanged,
    lightsUpdaterRequested
} from "../../actions";

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

    return (
        <Wrapper>
            <LightsInfoWrapper>
                <LightsInfo />
            </LightsInfoWrapper>
            <LightsStateButtonWrapper>
                <ToggleButton
                    state={lights.state}
                    onClick={(state) => {
                        dispatch(lightsStateChanged(state));
                        dispatch(
                            lightsUpdaterRequested({ ...lights, state: state })
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
                value={lights.hue}
                onChange={(value) => {
                    dispatch(lightsHueChanged(value));
                    dispatch(lightsUpdaterRequested({ ...lights, hue: value }));
                }}
            />
            <LightSlider
                property={"Saturation"}
                backgroundImage={"/images/SaturationSlider.png"}
                value={lights.saturation}
                onChange={(value) => {
                    dispatch(lightsSaturationChanged(value));
                    dispatch(
                        lightsUpdaterRequested({ ...lights, saturation: value })
                    );
                }}
            />
            <LightSlider
                property={"Brightness"}
                backgroundImage={"/images/BrightnessSlider.png"}
                value={lights.brightness}
                onChange={(value) => {
                    dispatch(lightsBrightnessChanged(value));
                    dispatch(
                        lightsUpdaterRequested({ ...lights, brightness: value })
                    );
                }}
            />
        </Wrapper>
    );
}

export default LightsPanel;
