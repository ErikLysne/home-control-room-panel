import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 30px;
    padding-top: 30px;
    opacity: ${(props) => (props.isActive ? 100 : 50)}%;
`;

const LabelContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const Label = styled.div`
    width: 45%;
    height: 100%;
    margin-left: 10px;
    margin-right: auto;
    display: inline;
    text-align: left;
    color: rgb(255, 255, 255);
`;

const Slider = styled.input`
    width: 282px;
    height: 22px;
    margin: 2px;
    -webkit-appearance: none;
    appearence: none;
    background: url("${(props) => props.backgroundImage}");

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 10px;
        height: 21px;
        background: url("/images/SliderHandle.png");
    }
`;

function LightSlider(props) {
    const { property, value, range, isActive, backgroundImage } = props;
    const handleValueChangeEvent = (event) => {
        props.onChange(parseInt(event.target.value));
    };

    return (
        <Container isActive={isActive}>
            <LabelContainer>
                <Label>{property}</Label>
                <Label>{value + range.unit}</Label>
            </LabelContainer>
            <Slider
                onChange={handleValueChangeEvent}
                type="range"
                min={range.min}
                max={range.max}
                disabled={!isActive}
                value={value}
                backgroundImage={backgroundImage}
            />
        </Container>
    );
}

export default LightSlider;
