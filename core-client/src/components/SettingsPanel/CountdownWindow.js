import React from "react";
import styled from "styled-components";
import Window from "../Window";

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
    font-size: 1.25rem;
    color: rgb(200, 220, 230);
`;

const InfoLabel = styled(Label)`
    text-align: center;
`;

const TimeLabel = styled(Label)`
    text-align: left;
`;

const Time = styled.div`
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

function CountdownWindow(props) {
    const { timeRemaining, onClose, shouldRender } = props;
    return (
        <Window
            title="Philips Hue - Create new user"
            dimensions={{
                width: 60,
                height: 40
            }}
            onClose={onClose}
            shouldRender={shouldRender}
        >
            <Container>
                <InfoLabel>
                    Press the link button on the Philips Hue bridge now.
                </InfoLabel>
                <LabelContainer>
                    <TimeLabel>Time remaining: </TimeLabel>
                    <Time>{timeRemaining}</Time>
                </LabelContainer>
                <Slider
                    type="range"
                    min="0"
                    max="30"
                    value={timeRemaining}
                    disabled
                ></Slider>
            </Container>
        </Window>
    );
}

export default CountdownWindow;
