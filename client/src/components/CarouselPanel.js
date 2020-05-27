import React from "react";
import styled, { keyframes } from "styled-components";

const Panel = styled.div`
    width: ${(props) => props.width}vw;
    height: ${(props) => props.height}vh;
    position: absolute;
    left: 2.5vw;
    top: 15px;
    background-color: rgba(5, 17, 25, 0.75);
    box-shadow: 0px 0px 5px 2px rgba(211, 226, 252, 0.75);
    transform-style: preserve-3d;
    z-index: ${(props) =>
        zIndex(props.index, props.activeIndexCurrent, props.numberOfPanels)};
    opacity: ${(props) =>
        zIndex(props.index, props.activeIndexCurrent, props.numberOfPanels) ===
        0
            ? 1
            : 0};
    animation: ${(props) => {
            return props.animate
                ? animateTransition(
                      props.width,
                      props.index,
                      props.activeIndexCurrent,
                      props.activeIndexPrevious,
                      props.numberOfPanels,
                      props.panelOffset
                  )
                : "";
        }}
        ${(props) => props.transitionDuration}ms;
`;

const animateTransition = (
    width,
    index,
    activeIndexCurrent,
    activeIndexPrevious,
    numberOfPanels,
    panelOffset
) => keyframes`
    0% {
        transform: ${transform(
            width,
            index,
            activeIndexPrevious,
            numberOfPanels,
            panelOffset
        )};
        opacity: 0.25;
    }
    5% {
        transform: ${transform(
            width,
            index,
            activeIndexPrevious,
            numberOfPanels,
            panelOffset
        )};
        opacity: 0.75;
    }
    80% {
        transform: ${transform(
            width,
            index,
            activeIndexCurrent,
            numberOfPanels,
            panelOffset
        )};
        opacity: ${
            zIndex(index, activeIndexCurrent, numberOfPanels) === 0 ? 1 : 0.25
        };
    }
    100% {
        transform: ${transform(
            width,
            index,
            activeIndexCurrent,
            numberOfPanels,
            panelOffset
        )};
        opacity: ${
            zIndex(index, activeIndexCurrent, numberOfPanels) === 0 ? 0.9 : 0
        };
    }
        
`;

const interiorAngle = (numberOfPanels) => 360 / numberOfPanels;

const apothem = (width, numberOfPanels) =>
    width / (2 * Math.tan(Math.PI / numberOfPanels));

const transform = (
    width,
    index,
    activePanelIndex,
    numberOfPanels,
    panelOffset
) => {
    let angleOfRotation =
        (activePanelIndex - index) * interiorAngle(numberOfPanels);

    const displacement = (1 + panelOffset) * apothem(width, numberOfPanels);

    let transform = "";
    // Rotate along y-axis
    transform += ` rotateY(${angleOfRotation}deg)`;
    // Translate outward to apothem + offset
    transform += ` translateZ(${displacement}vw)`;
    // Rotate back to original reference frame
    transform += ` rotateY(${-angleOfRotation}deg)`;
    // Translate backwards to keep original size of the front face
    transform += ` translateZ(${-displacement}vw)`;
    // Rotate back
    //transform += ` rotateY(${angleOfRotation}deg)`;

    return transform;
};

const zIndex = (index, activePanelIndex, numberOfPanels) => {
    const angleOfRotation =
        Math.abs(activePanelIndex - index) * interiorAngle(numberOfPanels);

    const unwrapAngle =
        angleOfRotation <= 180 ? angleOfRotation : 360 - angleOfRotation;

    return angleOfRotation === 0
        ? 0
        : -Math.ceil(unwrapAngle / interiorAngle(numberOfPanels));
};

function CarouselPanel(props) {
    return <Panel {...props}>{props.children}</Panel>;
}

export default CarouselPanel;
