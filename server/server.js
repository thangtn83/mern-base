import path from "path";
import express from "express";
import devBundle from "./devBundle";
import template from "../template";
import { MongoClient } from "mongodb";

const CURRENT_DIR = process.cwd();
const PORT = process.env.PORT || 3000;
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/mern";

MongoClient.connect(url, (err, db) => {
  console.log("Connected successfully to mongodb server");
  db.close();
});

const app = express();
app.use("/dist", express.static(path.join(CURRENT_DIR, "dist")));
app.get("/", (req, res) => {
  res.status(200).send(template());
});
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("server started on: ", PORT);
});
devBundle.compile(app);
