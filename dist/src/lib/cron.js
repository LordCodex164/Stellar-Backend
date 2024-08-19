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
const cron = require('node-cron');
const Proposal = require('./models/Proposal');
// Run every hour
cron.schedule('0 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    const expiredProposals = yield Proposal.find({ status: 'active', deadline: { $lt: new Date() } });
    for (let proposal of expiredProposals) {
        proposal.status = 'expired';
        yield proposal.save();
    }
    console.log(`Updated ${expiredProposals.length} expired proposals`);
}));
