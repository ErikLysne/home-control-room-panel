import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { menuActions } from "../../ducks/menu";

const Container = styled.div`
    width: ${(props) => props.width}vw;
    height: ${(props) => props.height}vh;
    position: absolute;
    top: 220px;
    left: 0;
    overflow: hidden;
    perspective: 2000px;
`;

const Panel = styled.div`
    width: ${(props) => props.width}vw;
    height: ${(props) => props.height}vh;
    position: absolute;
    left: 2.5vw;
    top: 15px;
    background-color: rgb(5, 17, 25);
    box-shadow: 0px 0px 5px 2px rgba(211, 226, 252, 0.75);
    transform-style: preserve-3d;
    z-index: ${(props) =>
        zIndex(props.index, props.activeIndexCurrent, props.numberOfPanels)};
    opacity: ${(props) =>
        zIndex(props.index, props.activeIndexCurrent, props.numberOfPanels) ===
        0
            ? 0.8
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
        isTransitioning
    } = useSelector((state) => state.menu);
    const dispatch = useDispatch();

    const numberOfPanels = props.children.length;

    const rotateRight = () => {
        if (isTransitioning) return;

        dispatch(
            menuActions.activePanelIndexChanged(
                activePanelIndexCurrent >= numberOfPanels - 1
                    ? 0
                    : activePanelIndexCurrent + 1,
                activePanelIndexCurrent
            )
        );
    };

    const rotateLeft = () => {
        if (isTransitioning) return;

        dispatch(
            menuActions.activePanelIndexChanged(
                activePanelIndexCurrent === 0
                    ? numberOfPanels - 1
                    : activePanelIndexCurrent - 1,
                activePanelIndexCurrent
            )
        );
    };

    useEffect(() => {
        if (isTransitioning) {
            setTimeout(() => {
                dispatch(menuActions.transitionFinished());
            }, props.transitionDuration);
        }
    }, [dispatch, isTransitioning, props.transitionDuration]);

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
                    animate={isTransitioning}
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
    containerWidth: 100,
    containerHeight: 80,
    panelWidth: 90,
    panelHeight: 60,
    panelOffset: 1,
    transitionDuration: 1000
};

export default Carousel;
