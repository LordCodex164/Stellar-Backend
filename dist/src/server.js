"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const proposals_1 = __importDefault(require("./routes/proposals"));
const dotenv_1 = __importDefault(require("dotenv"));
const vote_1 = __importDefault(require("./routes/vote"));
const payments_1 = __importDefault(require("./routes/payments"));
const cors_1 = __importDefault(require("cors"));
const cron_1 = require("./lib/cron");
dotenv_1.default.config();
mongoose_1.default.connect(process.env.DATABASE_URL)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((error) => {
    console.log(error);
});
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", ""],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    exposedHeaders: ["*"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
}));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.status(200).json("testing");
});
(0, cron_1.scheduleExpiredProposals)();
app.use("/api/v1/proposal", proposals_1.default);
app.use("/api/v1/vote", vote_1.default);
app.use("/api/v1/payment", payments_1.default);
app.listen(PORT, () => console.log("Server running on PORT 5000"));
