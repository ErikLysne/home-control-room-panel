import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import {
    activePanelIndexChanged,
    transitionAnimationFinished
} from "../../actions/mainMenuActions";

const Container = styled.div`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    position: absolute;
    top: 220px;
    left: 0;
    margin: 0 auto;
    overflow: hidden;
    perspective: 4000px;
`;

const Panel = styled.div`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    position: absolute;
    left: 15px;
    top: 15px;
    background-color: rgb(38, 39, 44);
    border-style: ridge;
    border-color: rgb(50, 90, 110);
    transform-style: preserve-3d;
    z-index: ${(props) =>
        zIndex(props.index, props.activeIndexCurrent, props.numberOfPanels)};
    opacity: ${(props) =>
        zIndex(props.index, props.activeIndexCurrent, props.numberOfPanels) ===
        0
            ? 0.9
            : 0};
    animation: ${(props) => {
            console.log(props.activeIndexCurrent);
            console.log(props.activeIndexPrevious);
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
    transform += ` translateZ(${displacement}px)`;
    // Rotate back to original reference frame
    transform += ` rotateY(${-angleOfRotation}deg)`;
    // Translate backwards to keep original size of the front face
    transform += ` translateZ(${-displacement}px)`;
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

const RotationClickableArea = styled.div`
    width: 10%;
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: transparent;
`;

const RotateRightButton = styled(RotationClickableArea)`
    right: 0;
`;

const RotateLeftButton = styled(RotationClickableArea)`
    left: 0;
`;

function Carousel(props) {
    const {
        activePanelIndexCurrent,
        activePanelIndexPrevious,
        isAnimatingTransition
    } = useSelector((state) => state.mainMenu);
    const dispatch = useDispatch();

    const numberOfPanels = props.children.length;

    const rotateRight = () => {
        if (isAnimatingTransition) return;

        dispatch(
            activePanelIndexChanged(
                activePanelIndexCurrent >= numberOfPanels - 1
                    ? 0
                    : activePanelIndexCurrent + 1,
                activePanelIndexCurrent
            )
        );
    };

    const rotateLeft = () => {
        if (isAnimatingTransition) return;

        dispatch(
            activePanelIndexChanged(
                activePanelIndexCurrent === 0
                    ? numberOfPanels - 1
                    : activePanelIndexCurrent - 1,
                activePanelIndexCurrent
            )
        );
    };

    useEffect(() => {
        if (isAnimatingTransition) {
            setTimeout(() => {
                dispatch(transitionAnimationFinished());
            }, props.transitionDuration);
        }
    }, [dispatch, isAnimatingTransition, props.transitionDuration]);

    let index = 0;
    return (
        <Container width={props.containerWidth} height={props.containerHeight}>
            {React.Children.map(props.children, (child) => (
                <Panel
                    key={index}
                    width={props.panelWidth}
                    height={props.panelHeight}
                    index={index++}
                    activeIndexCurrent={activePanelIndexCurrent}
                    activeIndexPrevious={activePanelIndexPrevious}
                    animate={isAnimatingTransition}
                    numberOfPanels={numberOfPanels}
                    panelOffset={props.panelOffset}
                    transitionDuration={props.transitionDuration}
                >
                    {child}
                    <RotateRightButton onClick={rotateRight} />
                    <RotateLeftButton onClick={rotateLeft} />
                </Panel>
            ))}
        </Container>
    );
}

Carousel.defaultProps = {
    containerWidth: 480,
    containerHeight: 480,
    panelWidth: 450,
    panelHeight: 450,
    panelOffset: 1,
    transitionDuration: 500
};

export default Carousel;
