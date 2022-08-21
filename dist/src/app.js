"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import Yup, { object } from "yup";
const Yup = __importStar(require("yup"));
const cors = require("cors");
const bodyParser = require("body-parser");
const app = (0, express_1.default)();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const data = [
    // {
    //   image:
    //     "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //   title: "Beautiful View of Moraine Lake",
    //   subTitle: "Canada",
    // },
    {
        image: "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Mountain Covered Snow Under Star",
        subTitle: "Sweden",
    },
    {
        image: "https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Beautiful View of Moraine Lake",
        subTitle: "Finland",
    },
    {
        image: "https://images.pexels.com/photos/1192671/pexels-photo-1192671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Green Grass during Sunset",
        subTitle: "Kaluthara",
    },
    {
        image: "https://images.pexels.com/photos/609554/pexels-photo-609554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Green Field and Trees",
        subTitle: "Italy",
    },
    {
        image: "https://images.pexels.com/photos/130851/pexels-photo-130851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Red and Purple Flowers Outdoor",
        subTitle: "Germany",
    },
    {
        image: "https://images.pexels.com/photos/621720/pexels-photo-621720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Green and Red Leafed Trees",
        subTitle: "Germany",
    },
    {
        image: "https://images.pexels.com/photos/388304/pexels-photo-388304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Black Asphalt Road",
        subTitle: "Norway",
    },
];
const port = 3600;
const SlidesValidationSchema = Yup.object().shape({
    slides: Yup.number()
        .transform((value) => Math.trunc(value))
        .min(1, "Minimum number for the slides parameter is 1.")
        .max(10, "Maximum number for the slides parameter is 10."),
});
app.get("/api/carousel", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield SlidesValidationSchema.validate(req.query);
        const { slides } = query;
        const content = data.slice(0, slides);
        res.status(200).json(content);
    }
    catch (error) {
        // @ts-ignore
        if (error.errors && error.errors.length) {
            // @ts-ignore
            return res.status(500).json(error.errors[0]);
        }
        return res.sendStatus(500);
    }
}));
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is running on port ${port}`);
});
