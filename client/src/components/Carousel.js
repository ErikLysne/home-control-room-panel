import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { menuActions } from "../ducks/menu";
import CarouselPanel from "./CarouselPanel";

const Container = styled.div`
    width: ${(props) => props.width}vw;
    height: ${(props) => props.height}vh;
    position: absolute;
    top: 100px;
    left: 0;
    overflow: hidden;
    perspective: 2000px;
`;

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
                <CarouselPanel
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
                </CarouselPanel>
            ))}
        </Container>
    );
}

Carousel.defaultProps = {
    containerWidth: 100,
    containerHeight: 65,
    panelWidth: 90,
    panelHeight: 60,
    panelOffset: 1,
    transitionDuration: 1000
};

export default Carousel;
