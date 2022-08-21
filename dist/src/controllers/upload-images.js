"use strict";
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
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const images_model_1 = __importDefault(require("../models/images.model"));
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    // @ts-ignore
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    // @ts-ignore
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
// const upload = multer({ storage: storage })
const upload = (0, multer_1.default)({ storage: storage });
router.post("/upload-images", upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file) {
            const { path, originalname } = req.file;
            const { title, subTitle } = req.body;
            const data = new images_model_1.default({
                path: path,
                fileName: originalname,
                title,
                subTitle
            });
            yield data.save();
            return res.sendStatus(200);
        }
        else {
            return res.sendStatus(400);
        }
    }
    catch (error) {
        return res.sendStatus(500);
    }
}));
exports.default = router;
