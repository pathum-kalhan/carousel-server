"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_images_1 = __importDefault(require("./controllers/upload-images"));
const carousel_1 = __importDefault(require("./controllers/carousel"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors = require("cors");
const app = (0, express_1.default)();
app.use(cors());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
const port = 3600;
const connectionURI = `mongodb+srv://pathum:8a3qmyjMbGeFrGzA@cluster0.ormz13f.mongodb.net/?retryWrites=true&w=majority`;
mongoose_1.default.connect(connectionURI);
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("We are connected!");
});
app.use("/api", upload_images_1.default);
app.use("/api", carousel_1.default);
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is running on port ${port}`);
});
