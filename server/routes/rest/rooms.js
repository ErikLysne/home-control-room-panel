import express from "express";
import { Room } from "../../db";

const router = express.Router();

const response = (status, error = "", result = {}) => ({
    successful: status,
    error: error,
    result: result
});

const roomNotFoundError = (roomName) => `Room \`${roomName}\` does not exist.`;

const roomTemplate = {
    general: {
        label: "General",
        name: {
            type: "string",
            label: "Name",
            editable: true
        },
        isEntrance: {
            type: "boolean",
            label: "Is entrance?",
            editable: true
        }
    },
    light: {
        label: "Light",
        name: {
            type: "string",
            label: "Hue group name",
            editable: true
        },
        id: {
            type: "string",
            label: "Hue group ID",
            editable: false
        },
        lights: {
            type: "string",
            label: "Lights",
            editable: false
        },
        state: {
            on: {
                type: "boolean",
                label: "On",
                editable: false
            },
            hue: {
                type: "string",
                label: "Hue",
                editable: false
            },
            saturation: {
                type: "string",
                label: "Saturation",
                editable: false
            },
            brightness: {
                type: "string",
                label: "Brightness",
                editable: false
            },
            colorTemp: {
                type: "string",
                label: "Color temperature",
                editable: false
            },
            colorMode: {
                type: "string",
                label: "Color mode",
                editable: false
            },
            effect: {
                type: "string",
                label: "Effect",
                editable: false
            },
            alert: {
                type: "string",
                label: "Alert",
                editable: false
            }
        }
    }
};

router
    .route("/rooms")
    .get((req, res) => {
        Room.find({}, (error, result) => {
            if (error) {
                res.send(response(false, error.message));
            } else {
                res.send(response(true, "", result));
            }
        });
    })
    .post((req, res) => {
        const { body } = req;
        const room = new Room({ ...body, updated: new Date() });

        room.save((error) => {
            if (error) {
                res.send(response(false, error.message));
            } else {
                res.send(response(true));
            }
        });
    })
    .delete((req, res) => {
        Room.deleteMany({}, (error) => {
            if (error) {
                res.send(response(false, error.message));
            } else {
                res.send(response(true));
            }
        });
    });

router.route("/rooms/add").get((req, res) => {
    res.send(response(true, "", roomTemplate));
});

router
    .route("/rooms/:roomName")
    .get((req, res) => {
        const { roomName } = req.params;
        Room.findOne({ name: roomName }, (error, result) => {
            if (error) {
                res.send(response(false, error.message));
            } else {
                if (result === null) {
                    res.send(response(false, roomNotFoundError(roomName)));
                } else {
                    res.send(response(true, "", result));
                }
            }
        });
    })
    .put((req, res) => {
        const { body, params } = req;
        const { roomName } = params;

        Room.updateOne(
            { name: roomName },
            { ...body, updated: new Date() },
            (error) => {
                if (error) {
                    res.send(response(false, error.message));
                } else {
                    res.send(response(true));
                }
            }
        );
    })
    .delete((req, res) => {
        const { roomName } = req.params;
        Room.deleteOne({ name: roomName }, (error) => {
            if (error) {
                res.send(response(false, error.message));
            } else {
                res.send(response(true));
            }
        });
    });

export default router;
