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
const express_1 = require("express");
const Yup = __importStar(require("yup"));
const images_list_1 = __importDefault(require("../utils/images-list"));
const router = (0, express_1.Router)();
const SlidesValidationSchema = Yup.object().shape({
    slides: Yup.number()
        .transform((value) => Math.trunc(value))
        .min(1, "Minimum number for the slides parameter is 1.")
        .max(10, "Maximum number for the slides parameter is 10."),
});
router.get("/carousel", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield SlidesValidationSchema.validate(req.query);
        const { slides } = query;
        const content = images_list_1.default.slice(0, slides);
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
exports.default = router;
