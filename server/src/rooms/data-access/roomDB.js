// @flow

export default class RoomDB<DatabaseModel: any> {
    databaseModel: DatabaseModel;

    constructor(databaseModel: DatabaseModel) {
        this.databaseModel = databaseModel;
    }

    async findByRoomId(roomId: string) {
        const result = await this.databaseModel.find({ roomId: roomId });

        const [...found] = result;

        if (found.length === 0) {
            return null;
        } else {
            return found[0];
        }
    }

    async add() {}

    async delete() {}
}
