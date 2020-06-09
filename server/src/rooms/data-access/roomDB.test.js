import mongoose from "mongoose";
import RoomDB from "./roomDB";
import RoomModel from "./roomModel";
import fakeRoomModelProps from "../__tests__/utils/fakeRoomModelProps";

describe("RoomDB", () => {
    beforeAll(async () => {
        await mongoose.connect(
            "mongodb://localhost:27017/",
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            },
            (err) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
            }
        );
    });

    let roomDB, roomModelProps, roomModel;
    beforeEach(async () => {
        roomDB = new RoomDB(RoomModel);
        roomModelProps = fakeRoomModelProps();
        roomModel = new RoomModel(roomModelProps);
    });

    it("creates and saves room successfully", async () => {
        const savedRoom = await roomModel.save();
        expect(savedRoom._id).toBeDefined();
        expect(savedRoom.updated).toBeDefined();
        expect(savedRoom.roomId).toBe(roomModelProps.roomId);
        expect(savedRoom.name).toBe(roomModelProps.name);
        expect(savedRoom.entrance).toBe(roomModelProps.entrance);
    });

    it("ignores parameters not included in the schema", async () => {
        const roomModelProps = fakeRoomModelProps({
            fakeProp: "this is not in the schema"
        });
        const roomModel = new RoomModel(roomModelProps);
        const savedRoom = await roomModel.save();
        expect(savedRoom._id).toBeDefined();
        expect(savedRoom.fakeProp).toBeUndefined();
    });

    it("ignores parameters not included in the schema", async () => {
        const roomModelProps = fakeRoomModelProps({
            name: undefined
        });
        const roomModel = new RoomModel(roomModelProps);

        let err;
        try {
            const savedRoom = await roomModel.save();
            error = savedRoom;
        } catch (error) {
            err = error;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.name).toBeDefined();
    });

    it("finds saved room by id", async () => {
        const savedRoom = await roomModel.save();
        expect(savedRoom.roomId).toBeDefined();
        const foundRoom = await roomDB.findByRoomId(savedRoom.roomId);
        expect(foundRoom._id).toStrictEqual(savedRoom._id);
    });

    it("returns null if no room is found", async () => {
        const savedRoom = await roomModel.save();
        expect(savedRoom.roomId).toBeDefined();
        const foundRoom = await roomDB.findByRoomId(-1);
        expect(foundRoom).toBeNull();
    });

    it("returns first instance if two duplicate rooms are found", async () => {
        const savedRoomFirst = await roomModel.save();
        const savedRoomSecond = await roomModel.save();
        const foundRoom = await roomDB.findByRoomId(savedRoomFirst.roomId);
        expect(foundRoom._id).toStrictEqual(savedRoomFirst._id);
    });
});
