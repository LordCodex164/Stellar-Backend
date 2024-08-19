import express from "express"
import { createProposal, getAllProposal, getProposalByCreator, deleteProposal } from "../controllers/proposals";

const router = express.Router();

 router.route("/create").post(createProposal)
 router.route("/").get(getAllProposal)
 router.route("/:id").get(getProposalByCreator).delete(deleteProposal)
 
export default router;