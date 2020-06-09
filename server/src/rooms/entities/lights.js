// @flow
export default class Lights<LightParams> {
    groupName: string;
    groupId: number;
    lights: [number];
    on: boolean;
    lightParams: LightParams;

    constructor(lightProps: {
        groupName: string,
        groupId: number,
        lights: [number],
        on: boolean,
        lightParams: LightParams
    }) {
        const { groupName, groupId, lights, on, lightParams } = lightProps;

        // Perform validation
        if (!groupName) {
            throw new Error("Lights must have `groupName`");
        }

        if (!groupId) {
            throw new Error("Lights must have `groupId`");
        }

        Object.assign(this, { ...lightProps });
        Object.seal(this);
    }

    getGroupName = () => this.groupName;
    getGroupId = () => this.groupId;
    getLights = () => this.lights;
    getOn = () => this.on;
    getLightParams = () => this.lightParams;
}
