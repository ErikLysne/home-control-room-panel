import mongoose from "mongoose";

const configSchema = new mongoose.Schema({
    updated: {
        type: Date,
        default: () => new Date()
    },
    hue: {
        bridge: {
            ipAddress: {
                type: String,
                default: ""
            },
            username: {
                type: String,
                default: ""
            },
            clientkey: {
                type: String,
                default: ""
            }
        },
        userCreation: {
            appName: {
                type: String,
                default: ""
            },
            deviceName: {
                type: String,
                default: ""
            },
            timeRemaining: {
                type: Number,
                default: 0
            },
            ongoing: {
                type: Boolean,
                default: false
            },
            previousSuccessful: {
                type: Boolean,
                default: false
            }
        }
    }
});

const Config = mongoose.model("Config", configSchema);

export default Config;
