import express from "express";
import Hue from "../../hue";

const router = express.Router();

const hue = new Hue();
const hueGroups = [];
hue.linkWithHueBridge("HomeControl", "Desktop")
    .then(() => {
        console.log("Successfully linked with Hue bridge".green);
        hue.getGroups().then((groups) => {
            groups.forEach((group) => {
                hueGroups.push(group);
            });
        });
    })
    .catch(() => {
        throw Error("Failed to link with Hue bridge".red);
    });

const isValidGroupName = (groupName) => {
    return hueGroups.filter((group) => group.name === groupName).length > 0;
};

const getGroup = (groupName) => {
    return hueGroups.filter((group) => group.name === groupName)[0];
};

const sendHueBridgeErrorResponse = (res) => {
    res.status(500).send({ error: "Hue bridge not accessible" });
};

const sendHueInvalidGroupNameErrorResponse = (groupName, res) => {
    res.status(400).send({
        error: "Group '" + groupName + "' was not found"
    });
};

router.route("/lights/status").get((req, res) => {
    hue.testBridgeConnection().then((status) =>
        res.send({ bridge_status: status ? "online" : "offline" })
    );
});

router.route("/lights/groups").get((req, res) => {
    hue.getGroups()
        .then((groups) => {
            hueGroups = [];
            groups.forEach((group) => {
                hueGroups.push(group);
            });
            res.send(groups);
        })
        .catch(() => {
            sendHueBridgeErrorResponse(res);
        });
});

router
    .route("/lights/groups/:groupName")
    .get((req, res) => {
        const groupName = req.params.groupName;
        if (isValidGroupName(groupName)) {
            hue.getGroupState(groupName)
                .then((groupState) => {
                    hueGroups[
                        hueGroups.indexOf(getGroup(groupName))
                    ] = groupState;
                    res.send(groupState);
                })
                .catch(() => {
                    sendHueBridgeErrorResponse(res);
                });
        } else {
            sendHueInvalidGroupNameErrorResponse(groupName, res);
        }
    })
    .put((req, res) => {
        const groupName = req.params.groupName;
        if (isValidGroupName(groupName)) {
            const newState = {};
            ({
                on: newState.on,
                bri: newState.bri,
                hue: newState.hue,
                sat: newState.sat,
                effect: newState.effect,
                ct: newState.ct,
                alert: newState.alert
            } = req.body);

            const group = getGroup(groupName);

            hue.setGroupState(group.id, newState)
                .then((result) => {
                    result.on !== undefined && (group.action.on = result.on);
                    result.bri !== undefined && (group.action.bri = result.bri);
                    result.hue !== undefined && (group.action.hue = result.hue);
                    result.sat !== undefined && (group.action.sat = result.sat);
                    result.effect !== undefined &&
                        (group.action.effect = result.effect);
                    result.ct !== undefined && (group.action.sat = result.sat);
                    result.alert !== undefined &&
                        (group.action.alert = result.alert);

                    const index = hueGroups.indexOf(group);
                    hueGroups[index] = group;
                    res.send(group);
                })
                .catch(() => {
                    sendHueBridgeErrorResponse(res);
                });
        } else {
            sendHueInvalidGroupNameErrorResponse(groupName, res);
        }
    });

export default router;
