import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import path from "path";
import db from "../db";
import Room from "../db/models/rooms";
import hueRouter from "../routes/rest/hueRoute";

const hallway = new Room({
    name: "Hallway",
    updated: new Date(),
    light: {
        groupName: "Hallway"
    }
});

db.once("open", () => {
    hallway.save((error) => {
        if (error) {
            console.log(`Could not save item ${hallway.name}`);
            return;
        }
    });
});

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../../client/build")));

app.use(hueRouter);

server.listen(8080);
console.log("Started server on port 8080");
