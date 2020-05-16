export const lightsPanelActivated = (previousIndex) => ({
    type: "mainMenu/lightsPanelActivated",
    previousIndex: previousIndex
});

export const networkPanelActivated = (previousIndex) => ({
    type: "mainMenu/networkPanelActivated",
    previousIndex: previousIndex
});

export const sensorsPanelActivated = (previousIndex) => ({
    type: "mainMenu/sensorsPanelActivated",
    previousIndex: previousIndex
});

export const settingsPanelActivated = (previousIndex) => ({
    type: "mainMenu/settingsPanelActivated",
    previousIndex: previousIndex
});

export const activePanelIndexChanged = (currentIndex, previousIndex) => ({
    type: "mainMenu/activePanelIndexChanged",
    currentIndex: currentIndex,
    previousIndex: previousIndex
});

export const transitionAnimationFinished = () => ({
    type: "mainMenu/transitionAnimationFinished"
});
