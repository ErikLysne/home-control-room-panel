import express from "express";
import http from "http";
import socket from "socket.io";
import path from "path";
import HueDiscovery from "./hue/hue-discovery";
import GroupState from "node-hue-api/lib/model/lightstate/GroupState";

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static(path.join(__dirname, "../../client/build")));

/*
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});
*/

server.listen(8080);

console.log("Started server on port 8080");

HueDiscovery.linkWithHueBridge("HomeControl", "Desktop")
    .then((hueUser) => {
        io.on("connection", (socket) => {
            console.log("Hello from client!");
            socket.on("request-light-change", (light) => {
                const hueConvert = (65535 * light.hue) / 100;
                const brightnessConvert = light.brightness;
                const saturationConvert = light.saturation;

                const groupState = new GroupState()
                    .on(true)
                    .hue(hueConvert)
                    .saturation(saturationConvert)
                    .brightness(brightnessConvert);

                hueUser.groups
                    .setGroupState(1, groupState)
                    .then((result) => {
                        if (result) {
                            socket.emit("request-light-change-success", result);
                        } else {
                            socket.emit("request-light-change-failure", result);
                        }
                    })
                    .catch((error) =>
                        socket.emit("request-light-change-failure", error)
                    );
            });
        });
    })
    .catch((error) => {
        throw error;
    });
