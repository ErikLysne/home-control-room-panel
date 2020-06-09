// @flow
import Room, { Lights, Sensors } from "../entities";

export default class RoomUseCase<
    Identifier: { makeId: () => number, isValidId: (id: number) => boolean },
    RoomDB: {
        findById: (id: number) => Room<Identifier, Lights<*>, Sensors>
    }
> {
    Id: Identifier;
    roomDB: RoomDB;

    constructor(Id: Identifier, roomDB: RoomDB) {
        this.Id = Id;
        this.roomDB = roomDB;
    }

    async getRoom(id: number) {
        if (!this.Id.isValidId(id)) {
            throw new Error("Invalid `id`.");
        }

        const exists = await this.roomDB.findById(id);

        if (exists) {
            return exists;
        } else {
            throw new Error(`Room with id ${id} not found.`);
        }
    }
}
