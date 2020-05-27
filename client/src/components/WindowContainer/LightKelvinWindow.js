import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Window from "./Window";
import { windowsActions } from "../../ducks/windows";
import { lightsActions, lightsOperations } from "../../ducks/lights";

const Container = styled.div`
    width: 100%;
    height: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Slider = styled.input`
    width: 280px;
    height: 30px;
    border-radius: 20px;
    -webkit-appearance: none;
    appearence: none;
    background-color: rgb(4, 66, 90);
    overflow: hidden;

    &::-webkit-slider-runnable-track {
        height: 30px;
        -webkit-appearance: none;
        color: #13bba4;
        margin-top: -1px;
    }

    &::-webkit-slider-thumb {
        width: 30px;
        height: 30px;
        border-radius: 100%;
        -webkit-appearance: none;
        cursor: ew-resize;
        background: rgb(20, 232, 255);
        box-shadow: -295px 0 0 280px rgb(20, 232, 255);
    }
`;

const Label = styled.div`
    margin: 10px;
    text-align: left;
    font-size: 1.25rem;
    color: rgb(200, 220, 230);
`;

const ColorTemperature = styled.div`
    margin: 10px;
    text-align: right;
    font-size: 1.25rem;
    color: rgb(20, 232, 255);
`;

const LabelContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const kelvinToRaw = (kelvin) => {
    const slope = (153.0 - 500.0) / (6500.0 - 2000.0);
    return Math.round(slope * kelvin + 500.0 - 2000.0 * slope);
};

const rawToKelvin = (raw) => {
    const slope = (2000.0 - 6500.0) / (500.0 - 153.0);
    return Math.round(slope * raw + 2000.0 - 500.0 * slope);
};

const rawToSliderValue = (raw) => {
    const slope = (100.0 - 1.0) / (153.0 - 500.0);
    return Math.round(slope * raw + 1.0 - 500.0 * slope);
};

const sliderValueToRaw = (value) => {
    const slope = (153.0 - 500.0) / (100.0 - 1.0);
    return Math.round(slope * value + 500.0 - slope);
};

function LightKelvinWindow() {
    const lights = useSelector((state) => state.lights);
    const dispatch = useDispatch();

    const handleValueChangeEvent = (event) => {
        const sliderValue = parseInt(event.target.value);
        const colorTemp = sliderValueToRaw(sliderValue);

        dispatch(lightsActions.localColorTempChanged(colorTemp));
        dispatch(
            lightsOperations.setLightsRequested({
                ...lights.local,
                colorTemp: colorTemp
            })
        );
    };

    return (
        <Window
            height={250}
            title={"Color Temperature - Kelvin"}
            onClose={() => dispatch(windowsActions.lightsKelvinWindowClosed())}
        >
            <Container>
                <LabelContainer>
                    <Label>Color Temperature: </Label>
                    <ColorTemperature>
                        {rawToKelvin(lights.local.colorTemp) + " K"}
                    </ColorTemperature>
                </LabelContainer>
                <Slider
                    type="range"
                    min="1"
                    max="100"
                    value={rawToSliderValue(lights.local.colorTemp)}
                    onChange={handleValueChangeEvent}
                ></Slider>
            </Container>
        </Window>
    );
}

export default LightKelvinWindow;
