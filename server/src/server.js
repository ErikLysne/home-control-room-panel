import express from "express";
import http from "http";
import socket from "socket.io";
import path from "path";
import hueDiscovery from "./hue/hue-discovery";

const app = express();
const server = http.createServer(app);
const io = socket(server);

io.on("connection", (socket) => {
    console.log("Hello from client!");
    socket.emit("test");
});

app.use(express.static(path.join(__dirname, "../../client/build")));

/*
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});
*/

server.listen(8080);

console.log("Started server on port 8080");

const hue = hueDiscovery.linkWithHueBridge("HomeControl", "Desktop");
