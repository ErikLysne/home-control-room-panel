export const roomChanged = (value) => ({
    type: "lightsInfo/roomChanged",
    room: value
});

export const modeChanged = (value) => ({
    type: "lightsInfo/modeChanged",
    mode: value
});

export const allOnChanged = (value) => ({
    type: "lightsInfo/allOnChanged",
    allOn: value
});

export const anyOnChanged = (value) => ({
    type: "lightsInfo/anyOnChanged",
    anyOn: value
});
