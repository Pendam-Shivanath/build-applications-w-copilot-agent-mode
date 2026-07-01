"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = __importDefault(require("../models/Team"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const items = await Team_1.default.find().populate('members', 'name email fitnessLevel').lean();
        res.json({ resource: 'teams', items });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load teams', error });
    }
});
exports.default = router;
