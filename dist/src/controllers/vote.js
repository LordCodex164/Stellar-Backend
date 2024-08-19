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
exports.submitVote = void 0;
const proposal_1 = __importDefault(require("../models/proposal"));
const vote_1 = __importDefault(require("../models/vote"));
const submitVote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { proposalId, voter, transactionId, amount } = req.body;
        const proposal = yield proposal_1.default.findById(req.params.id);
        if (!proposal) {
            return res.status(404).json({ message: 'Proposal not found' });
        }
        //await SubmitVote(secret, proposal?.publicKey)
        const newVote = new vote_1.default({
            proposal: proposalId,
            voter,
            transactionId,
            amount
        });
        yield newVote.save();
        res.json({ message: 'Vote submitted successfully' });
    }
    catch (error) {
        console.log(error);
    }
});
exports.submitVote = submitVote;
