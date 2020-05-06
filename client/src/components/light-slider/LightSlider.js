import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    height: 30px;
    padding-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Label = styled.div`
    width: 50px;
    height: 100%;
    margin-left: 10px;
    margin-right: auto;
    text-align: left;
    color: rgb(255, 255, 255);
`;

const StyledSlider = styled.input`
    width: 282px;
    height: 22px;
    margin: 2px;
    -webkit-appearance: none;
    appearence: none;
    background: url("/images/HueSlider.png");

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 10px;
        height: 21px;
        background: url("/images/SliderHandle.png");
    }
`;

function LightSlider(props) {
    const handleValueChange = (event) => {
        props.setValue(event.target.value);
    };

    return (
        <Wrapper>
            <Label>Hue</Label>
            <StyledSlider
                onChange={handleValueChange}
                type="range"
                min="1"
                max="100"
            />
            <Label>{props.value}</Label>
        </Wrapper>
    );
}

export default LightSlider;
