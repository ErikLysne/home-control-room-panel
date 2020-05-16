const initialState = {
    activePanelIndexCurrent: 0,
    activePanelIndexPrevious: 0,
    isAnimatingTransition: false
};

const mainMenu = (state = initialState, action) => {
    switch (action.type) {
        case "mainMenu/lightsPanelActivated":
            return {
                ...state,
                activePanelIndexCurrent: 0,
                activePanelIndexPrevious: action.previousIndex,
                isAnimatingTransition: true
            };
        case "mainMenu/networkPanelActivated":
            return {
                ...state,
                activePanelIndexCurrent: 1,
                activePanelIndexPrevious: action.previousIndex,
                isAnimatingTransition: true
            };
        case "mainMenu/sensorsPanelActivated":
            return {
                ...state,
                activePanelIndexCurrent: 2,
                activePanelIndexPrevious: action.previousIndex,
                isAnimatingTransition: true
            };
        case "mainMenu/settingsPanelActivated":
            return {
                ...state,
                activePanelIndexCurrent: 3,
                activePanelIndexPrevious: action.previousIndex,
                isAnimatingTransition: true
            };
        case "mainMenu/activePanelIndexChanged":
            return {
                ...state,
                activePanelIndexCurrent: action.currentIndex,
                activePanelIndexPrevious: action.previousIndex,
                isAnimatingTransition: true
            };
        case "mainMenu/transitionAnimationFinished":
            return {
                ...state,
                isAnimatingTransition: false
            };
        default:
            return state;
    }
};

export default mainMenu;
