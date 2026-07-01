"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, required: true, min: 13 },
    fitnessLevel: {
        type: String,
        required: true,
        enum: ['beginner', 'intermediate', 'advanced'],
    },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team' },
}, { timestamps: true });
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
