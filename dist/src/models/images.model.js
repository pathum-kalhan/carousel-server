"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const auditSchema = new Schema({
    path: String,
    fileName: String,
    title: String,
    subTitle: String
}, { timestamps: true });
exports.default = mongoose_1.default.model("Image", auditSchema);
