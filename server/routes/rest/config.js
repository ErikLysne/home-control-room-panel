import express from "express";
import { Config } from "../../db";
import * as hue from "../../util/hue";

const router = express.Router();

const response = (status, error = "", result = {}) => ({
    successful: status,
    error: error,
    result: result
});

router
    .route("/config")
    .get((req, res) => {
        Config.find({}, (error, result) => {
            if (error) {
                res.send(response(false, error.message));
            } else {
                if (result.length === 0) {
                    const config = new Config();
                    config.save((error) => {
                        if (error) {
                            res.send(response(false, error.message));
                        } else {
                            res.send(response(true, "", config));
                        }
                    });
                } else {
                    res.send(response(true, "", result[0]));
                }
            }
        });
    })
    .post((req, res) => {
        Config.find({}, (error, result) => {
            if (error) {
                res.send(response(false, error.message));
            } else {
                if (result.length === 0) {
                    const { body } = req;
                    const config = new Config({ ...body, updated: new Date() });

                    config.save((error) => {
                        if (error) {
                            res.send(response(false, error.message));
                        } else {
                            res.send(response(true));
                        }
                    });
                } else {
                    res.send(
                        response(
                            false,
                            "Config already exists - use PUT to update."
                        )
                    );
                }
            }
        });
    })
    .put((req, res) => {
        const { body } = req;

        Config.updateOne({}, { ...body, updated: new Date() }, (error) => {
            if (error) {
                res.send(response(false, error.message));
            } else {
                res.send(response(true));
            }
        });
    })
    .delete((req, res) => {
        Config.deleteOne({}, (error) => {
            if (error) {
                res.send(response(false, error.message));
            } else {
                res.send(response(true));
            }
        });
    });

router.route("/config/hue/:command").put((req, res) => {
    const { body, params } = req;
    const { command } = params;

    switch (command) {
        case "discover":
            hue.discoverBridgeIpAddress(5000)
                .then((ipAddress) => {
                    Config.updateOne(
                        {},
                        {
                            $set: { "hue.bridge.ipAddress": ipAddress },
                            updated: new Date()
                        },
                        (error) => {
                            if (error) {
                                res.send(response(false, error.message));
                            } else {
                                res.send(response(true, "", ipAddress));
                            }
                        }
                    );
                })
                .catch((error) => res.send(response(false, error.message)));
            break;
        case "create-user":
            const { ipAddress, appName, deviceName } = body;

            if (
                typeof ipAddress === "undefined" ||
                typeof appName === "undefined" ||
                typeof deviceName === "undefined"
            ) {
                res.send(
                    response(
                        false,
                        "Request requires body parameters `ipAddress`, `appName` and `deviceName`"
                    )
                );
            } else {
                res.send(response(true, ""));

                let timeRemaining = 30;

                Config.updateOne(
                    {},
                    {
                        $set: {
                            "hue.userCreation.appName": appName,
                            "hue.userCreation.deviceName": deviceName,
                            "hue.userCreation.timeRemaining": timeRemaining,
                            "hue.userCreation.ongoing": true,
                            "hue.userCreation.previousSuccessful": false
                        },
                        updated: new Date()
                    },
                    (error) => {
                        if (error) {
                            throw error;
                        }
                    }
                );

                const timer = setInterval(() => {
                    if (timeRemaining === 0) {
                        clearInterval(timer);
                        Config.updateOne(
                            {},
                            {
                                $set: {
                                    "hue.userCreation.timeRemaining": 0,
                                    "hue.userCreation.ongoing": false
                                },
                                updated: new Date()
                            },
                            (error) => {
                                if (error) {
                                    throw error;
                                }
                            }
                        );
                        return;
                    }

                    Config.updateOne(
                        {},
                        {
                            $set: {
                                "hue.userCreation.timeRemaining": timeRemaining--
                            },
                            updated: new Date()
                        },
                        (error) => {
                            if (error) {
                                throw error;
                            }
                        }
                    );

                    hue.createUser(ipAddress, appName, deviceName)
                        .then((user) => {
                            clearInterval(timer);
                            const { username, clientkey } = user;

                            Config.updateOne(
                                {},
                                {
                                    $set: {
                                        "hue.bridge.username": username,
                                        "hue.bridge.clientkey": clientkey,
                                        "hue.userCreation.timeRemaining": 0,
                                        "hue.userCreation.ongoing": false,
                                        "hue.userCreation.previousSuccessful": true
                                    },
                                    updated: new Date()
                                },
                                (error) => {
                                    if (error) {
                                        throw error;
                                    }
                                }
                            );
                        })
                        .catch(() => {});
                }, 1000);
            }

            break;
        default:
            res.send(response(false, `Invalid route path \`${command}\`.`));
    }
});

export default router;
