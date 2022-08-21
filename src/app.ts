import express from "express";
import imageUploadHandler from "./controllers/upload-images";
import carouselHandler from "./controllers/carousel";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 3600;

const connectionURI = `mongodb+srv://pathum:8a3qmyjMbGeFrGzA@cluster0.ormz13f.mongodb.net/?retryWrites=true&w=majority`;


mongoose.connect(connectionURI);


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("We are connected!");
});

app.use("/api", imageUploadHandler);
app.use("/api", carouselHandler);

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server is running on port ${port}`);
});
