import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { menuActions } from "../../ducks/menu";
import Panel from "./Panel";

const Container = styled.div`
    width: ${(props) => props.dimensions.width}vw;
    height: ${(props) => props.dimensions.height}vh;
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
        containerDimensions,
        panelDimensions,
        panelOffset,
        transitionDuration,
        children
    } = props;

    const numberOfPanels = children.length;

    const {
        activePanelIndexCurrent,
        activePanelIndexPrevious,
        isTransitioning
    } = useSelector((state) => state.menu);
    const dispatch = useDispatch();

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
            }, transitionDuration);
        }
    }, [dispatch, isTransitioning, transitionDuration]);

    let index = 0;
    return (
        <Container dimensions={containerDimensions}>
            {React.Children.map(children, (child) => (
                <Panel
                    key={index}
                    dimensions={panelDimensions}
                    index={{
                        value: index++,
                        activeCurrent: activePanelIndexCurrent,
                        activePrevious: activePanelIndexPrevious
                    }}
                    numberOfPanels={numberOfPanels}
                    panelOffset={panelOffset}
                    isAnimating={isTransitioning}
                    transitionDuration={transitionDuration}
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
    containerDimensions: {
        width: 100,
        height: 65
    },
    panelDimensions: {
        width: 90,
        height: 60
    },
    panelOffset: 1,
    transitionDuration: 1000
};

export default Carousel;
