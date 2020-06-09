// @flow
export default class Room<
    Identifier: { makeId: () => number, isValidId: (id: number) => boolean },
    Lights,
    Sensors
> {
    id: number;
    updated: number = Date.now();
    name: string;
    entrance: boolean = false;
    lights: Lights;
    sensors: Sensors;

    constructor(roomProps: {
        Id: Identifier,
        updated: number,
        name: string,
        entrance: boolean,
        lights: Lights,
        sensors: Sensors
    }) {
        const { Id, updated, name, entrance, lights, sensors } = roomProps;
        const id = Id.makeId();

        // Perform validation
        if (!name) {
            throw new Error(`Room must have \`name\`.`);
        }

        if (!Id.isValidId(id)) {
            throw new Error(`Room must have \`id\`.`);
        }

        this.id = id;
        this.name = name;
        this.entrance = entrance;
        this.lights = lights;
        this.sensors = sensors;

        if (updated) {
            this.updated = updated;
        }

        Object.seal(this);
    }

    getId = () => this.id;
    getUpdated = () => this.updated;
    getName = () => this.name;
    isEntrance = () => this.entrance;
    getLights = () => this.lights;
    getSensors = () => this.sensors;
}
