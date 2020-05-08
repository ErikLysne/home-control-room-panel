import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ToggleButton from "../toggle-button/ToggleButton";
import LightSlider from "../light-slider/LightSlider";
import {
    lightStateChanged,
    lightHueChanged,
    lightSaturationChanged,
    lightBrightnessChanged,
    lightsUpdaterRequested
} from "../../actions";

const Wrapper = styled.div`
    width: 96%;
    height: 460px;
    position: absolute;
    top: 220px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: rgb(26, 26, 26);
`;

const LightStateButtonWrapper = styled.div`
    width: 50%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function MainPanel() {
    const lights = useSelector((state) => state.lights);
    const dispatch = useDispatch();

    return (
        <Wrapper>
            <LightStateButtonWrapper>
                <ToggleButton
                    state={lights.state}
                    onClick={(state) => {
                        dispatch(lightStateChanged(state));
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
            </LightStateButtonWrapper>
            <LightSlider
                property={"Hue"}
                backgroundImage={"/images/HueSlider.png"}
                value={lights.hue}
                onChange={(value) => {
                    dispatch(lightHueChanged(value));
                    dispatch(lightsUpdaterRequested({ ...lights, hue: value }));
                }}
            />
            <LightSlider
                property={"Saturation"}
                backgroundImage={"/images/SaturationSlider.png"}
                value={lights.saturation}
                onChange={(value) => {
                    dispatch(lightSaturationChanged(value));
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
                    dispatch(lightBrightnessChanged(value));
                    dispatch(
                        lightsUpdaterRequested({ ...lights, brightness: value })
                    );
                }}
            />
        </Wrapper>
    );
}

export default MainPanel;
