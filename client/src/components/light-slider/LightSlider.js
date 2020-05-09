import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    height: 30px;
    padding-top: 30px;
`;

const LabelWrapper = styled.div`
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

const StyledSlider = styled.input`
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
    const handleValueChangeEvent = (event) => {
        props.onChange(parseInt(event.target.value));
    };

    return (
        <Wrapper>
            <LabelWrapper>
                <Label>{props.property}</Label>
                <Label>{props.value}</Label>
            </LabelWrapper>
            <StyledSlider
                onChange={handleValueChangeEvent}
                type="range"
                min="1"
                max="100"
                value={props.value}
                backgroundImage={props.backgroundImage}
            />
        </Wrapper>
    );
}

export default LightSlider;
