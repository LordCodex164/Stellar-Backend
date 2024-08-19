"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const proposals_1 = require("../controllers/proposals");
const router = express_1.default.Router();
router.route("/create").post(proposals_1.createProposal);
router.route("/").get(proposals_1.getAllProposal);
router.route("/:id").get(proposals_1.getProposalByCreator).delete(proposals_1.deleteProposal);
exports.default = router;
