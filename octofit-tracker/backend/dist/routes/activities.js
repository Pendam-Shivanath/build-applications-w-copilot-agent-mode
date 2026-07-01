"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = __importDefault(require("../models/Activity"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const items = await Activity_1.default.find()
            .populate('user', 'name email fitnessLevel')
            .sort({ completedAt: -1 })
            .lean();
        res.json({ resource: 'activities', items });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load activities', error });
    }
});
exports.default = router;
