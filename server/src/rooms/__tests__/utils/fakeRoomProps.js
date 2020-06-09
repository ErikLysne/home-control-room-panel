// @flow
import Room from "../../entities/room";
import faker from "faker";

export default function fakeRoomProps(overrides: mixed): mixed {
    const fakeRooms = ["Living Room", "Bedroom", "Hallway", "Bathroom"];
    const fakeId = {
        makeId: () => faker.random.number(),
        isValidId: (id: number) => typeof id === "number" && id > 0
    };

    const props = {
        updated: Date.now(),
        name: fakeRooms[Math.floor(Math.random() * fakeRooms.length)],
        entrance: faker.random.boolean(),
        Id: fakeId
    };

    return {
        ...props,
        ...overrides
    };
}
