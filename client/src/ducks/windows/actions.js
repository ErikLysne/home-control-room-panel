import * as types from "./types";

export const lightsSlidersWindowOpened = () => ({
    type: types.SLIDERS_WINDOW_OPENED
});

export const lightsSlidersWindowClosed = () => ({
    type: types.SLIDERS_WINDOW_CLOSED
});

export const lightsKelvinWindowOpened = () => ({
    type: types.KELVIN_WINDOW_OPENED
});

export const lightsKelvinWindowClosed = () => ({
    type: types.KELVIN_WINDOW_CLOSED
});
