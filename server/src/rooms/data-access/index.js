// @flow
import RoomDB from "./roomDB";
import RoomModel from "./roomModel";
import mongoose from "mongoose";

if ([1, 2].includes(mongoose.connection.readyState)) {
    async () => {
        try {
            await mongoose.connect("mongodb://localhost:27017/home-control", {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        } catch (error) {
            throw error;
        }
    };
}

const roomDB = new RoomDB<RoomModel>(RoomModel);

export default roomDB;
