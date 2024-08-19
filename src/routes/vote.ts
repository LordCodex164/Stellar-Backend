import express from "express"
import { submitVote } from "../controllers/vote";

const router = express.Router();

router.route("/:id").post(submitVote)

export default router;