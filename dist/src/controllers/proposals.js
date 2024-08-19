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
exports.deleteProposal = exports.getAllProposal = exports.getProposalByCreator = exports.createProposal = void 0;
const proposal_1 = __importDefault(require("../models/proposal"));
const cron_1 = require("../lib/cron");
const createProposal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, amount, publicKey, deadlineMinutes } = req.body;
        //const {publicKey, secret} = await CreateProposal(title, description, amount)
        const deadline = new Date(Date.now() + deadlineMinutes * 60000); // Convert minutes to milliseconds
        const proposal = new proposal_1.default({
            title,
            description,
            amount,
            publicKey,
            deadline,
            creator: publicKey
        });
        yield proposal.save();
        (0, cron_1.scheduleExpiredProposals)();
        res.status(200).json(proposal);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createProposal = createProposal;
const getAllProposal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proposals = yield proposal_1.default.find();
        res.json(proposals);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllProposal = getAllProposal;
const getProposalByCreator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    try {
        const proposal = yield proposal_1.default.find({ creator: id });
        console.log(proposal);
        if (!proposal) {
            return res.status(404).json({ message: 'Proposal not found' });
        }
        res.json(proposal);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getProposalByCreator = getProposalByCreator;
const deleteProposal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("params", req.params);
    try {
        const proposal = yield proposal_1.default.findByIdAndDelete(req.params.id);
        if (!proposal) {
            return res.status(404).json({ message: 'Proposal not found' });
        }
        res.json(proposal);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteProposal = deleteProposal;
