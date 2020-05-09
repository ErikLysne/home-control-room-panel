const initialState = {
    lightsPanelActive: true,
    networkPanelActive: false,
    sensorsPanelActive: false,
    settingsPanelActive: false
};

const mainMenu = (state = initialState, action) => {
    switch (action.type) {
        case "mainMenu/lightsPanelActivated":
            return {
                ...state,
                lightsPanelActive: true,
                networkPanelActive: false,
                sensorsPanelActive: false,
                settingsPanelActive: false
            };
        case "mainMenu/networkPanelActivated":
            return {
                ...state,
                lightsPanelActive: false,
                networkPanelActive: true,
                sensorsPanelActive: false,
                settingsPanelActive: false
            };
        case "mainMenu/sensorsPanelActivated":
            return {
                ...state,
                lightsPanelActive: false,
                networkPanelActive: false,
                sensorsPanelActive: true,
                settingsPanelActive: false
            };
        case "mainMenu/settingsPanelActivated":
            return {
                ...state,
                lightsPanelActive: false,
                networkPanelActive: false,
                sensorsPanelActive: false,
                settingsPanelActive: true
            };
        default:
            return state;
    }
};

export default mainMenu;
