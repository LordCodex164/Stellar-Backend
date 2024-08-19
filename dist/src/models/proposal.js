"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProposalSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    publicKey: {
        type: String,
        required: true,
    },
    votes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'funded', 'expired'],
        default: 'active'
    },
    deadline: {
        type: Number, // Duration in hours, days, etc.
        required: true
    },
    creator: {
        type: String, // This could be the user's Stellar public key
        required: true
    }
});
ProposalSchema.methods.hasExpired = function () {
    return new Date > this.deadline;
};
ProposalSchema.pre("save", function (next) {
    if (this.hasExpired() && this.status == "active") {
        this.status = "expired";
    }
    next();
});
exports.default = mongoose_1.default.model('Proposal', ProposalSchema);
