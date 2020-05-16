const initialState = {
    lightSlidersWindowOpen: false
};

const windows = (state = initialState, action) => {
    switch (action.type) {
        case "windows/lightSlidersWindowOpened":
            return {
                ...state,
                lightSlidersWindowOpen: true
            };
        case "windows/lightSlidersWindowClosed":
            return {
                ...state,
                lightSlidersWindowOpen: false
            };

        default:
            return state;
    }
};

export default windows;
