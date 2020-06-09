// @flow
import faker from "faker";

export default function fakeRoomModel(overrides: mixed): mixed {
    const fakeRooms = ["Living Room", "Bedroom", "Hallway", "Bathroom"];

    const props = {
        roomId: faker.random.number().toString(),
        name: fakeRooms[Math.floor(Math.random() * fakeRooms.length)],
        entrance: faker.random.boolean()
    };

    return {
        ...props,
        ...overrides
    };
}
