import express from "express"
import { fetchRecentPayments } from "../controllers/payment";

const router = express.Router();

router.route("/recent").get(fetchRecentPayments);

export default router;