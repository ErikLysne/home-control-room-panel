import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    name: String,
    updated: Date,
    light: {
        groupId: Number,
        groupName: String,
        lights: [String],
        state: {
            on: Boolean,
            hue: { type: Number, min: 0, max: 65535 },
            saturation: { type: Number, min: 0, max: 254 },
            brightness: { type: Number, min: 1, max: 254 },
            colorTemp: { type: Number, min: 153, max: 500 },
            effect: String,
            alert: String
        },
        info: {
            colormode: String,
            allOn: Boolean,
            anyOn: Boolean
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
