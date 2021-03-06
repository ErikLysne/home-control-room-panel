import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    updated: Date,
    name: {
        type: String,
        required: true
    },
    isEntrance: Boolean,
    light: {
        name: Number,
        id: String,
        lights: [String],
        state: {
            on: Boolean,
            hue: { type: Number, min: 0, max: 65535 },
            saturation: { type: Number, min: 0, max: 254 },
            brightness: { type: Number, min: 1, max: 254 },
            colorTemp: { type: Number, min: 153, max: 500 },
            colormode: String,
            effect: String,
            alert: String
        }
    },
    sensors: {
        infrared: {
            ipAddress: String,
            port: String,
            state: Boolean
        }
    }
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
