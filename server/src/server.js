import express from "express";
import path from "path";
import hueDiscovery from "./hue/hue-discovery";

const app = express();

app.use(express.static(path.join(__dirname, "../build")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(8080);

console.log("Started server on port 8080");

hueDiscovery.linkWithHueBridge();
