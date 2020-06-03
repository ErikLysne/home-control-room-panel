import mongoose from "mongoose";

const configSchema = new mongoose.Schema({
    updated: Date,
    hue: {
        bridgeIpAddress: String,
        username: String,
        entertainmentAPIKey: String
    }
});

const Config = mongoose.model("Config", configSchema);

export default Config;
