import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import path from "path";
//import socket from "socket.io";
import hueRouter from "./routes/homecontrol-REST/hueRoute";

const app = express();
const server = http.createServer(app);
//const io = socket(server);

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../../client/build")));

app.use(hueRouter);

/*
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});
*/

server.listen(8080);
console.log("Started server on port 8080");
