import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/home-control", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", (error) =>
    console.log(error, `Error connecting to database: error`)
);
db.once("open", () => {
    console.log("Successfully connected to database");
});

export default db;
