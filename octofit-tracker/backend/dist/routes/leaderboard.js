"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const items = await Leaderboard_1.default.find()
            .populate('team', 'name city points')
            .sort({ rank: 1 })
            .lean();
        res.json({ resource: 'leaderboard', items });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to load leaderboard', error });
    }
});
exports.default = router;
