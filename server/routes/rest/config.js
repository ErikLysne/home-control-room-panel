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
                res.send(response(true, "", result));
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

router.route("/config/hue/:command").get((req, res) => {
    const { command } = req.params;

    switch (command) {
        case "discover":
            hue.discoverBridgeIpAddress(5000)
                .then((result) => {
                    res.send(response(true, "", result));
                })
                .catch((error) => res.send(response(false, error)));
            break;
        default:
            res.send(
                response(false, `Invalid route parameter \`${command}\`.`)
            );
    }
});

export default router;
