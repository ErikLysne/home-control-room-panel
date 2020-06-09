import Room from "./room";
import fakeRoomProps from "../__tests__/utils/fakeRoomProps";

describe("Room", () => {
    it("sets `updated` to now by default", () => {
        const noUpdatedProps = fakeRoomProps({ updated: undefined });
        const room = new Room(noUpdatedProps);
        expect(room.getUpdated()).toBeDefined();
    });

    it("must have a name", () => {
        const noNameProps = fakeRoomProps({ name: undefined });
        expect(() => new Room(noNameProps)).toThrow("Room must have `name`.");
    });

    it("must have an id", () => {
        const noValidIdProps = fakeRoomProps();
        noValidIdProps.Id = {
            ...noValidIdProps.Id,
            makeId: () => undefined
        };
        expect(() => new Room(noValidIdProps)).toThrow("Room must have `id`.");
    });

    it("can be set as entrance", () => {
        const entranceProps = fakeRoomProps({ entrance: true });
        const entranceRoom = new Room(entranceProps);
        expect(entranceRoom.isEntrance()).toBe(true);
        const noEntranceProps = fakeRoomProps({ entrance: false });
        const noEntranceRoom = new Room(noEntranceProps);
        expect(noEntranceRoom.isEntrance()).toBe(false);
    });
});
