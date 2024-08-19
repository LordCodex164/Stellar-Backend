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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRecentPayments = void 0;
const stellar_1 = require("../services/stellar");
const fetchRecentPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const records = yield (0, stellar_1.fetchRecentPayments)(req.params.id);
        res.status(200).json(records);
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchRecentPayments = fetchRecentPayments;
