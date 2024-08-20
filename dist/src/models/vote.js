"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const VoteSchema = new mongoose_1.default.Schema({
    proposal: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Proposal',
        required: true
    },
    voter: {
        type: String, // This would be the voter's Stellar public key
        required: true
    },
    transactionId: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose_1.default.model('Vote', VoteSchema);
