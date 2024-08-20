import express from "express"
import { submitVote } from "../controllers/vote";

const router = express.Router();

router.route("/").post(submitVote)

export default router;