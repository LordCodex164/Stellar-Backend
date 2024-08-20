import express from "express"
import mongoose from "mongoose"
import proposal from "./routes/proposals"
import dotenv from "dotenv"
import voting from "./routes/vote"
import payment from "./routes/payments"
import cors from "cors"
import { scheduleExpiredProposals } from "./lib/cron"

dotenv.config()

mongoose.connect(process.env.DATABASE_URL as string)
.then(() => {
 console.log("Connected to MongoDB")
})
.catch((error:any) => {
    console.log(error)
})

const app = express()

app.use(express.urlencoded({ extended: false }));

const allowedOrigins = ['https://example1.com', 'http://localhost:5173', "https://superb-torrone-c83f12.netlify.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
      return callback(null, false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
  }
  ));

app.use(
    cors({
      origin: ["http://localhost:5173", "https://superb-torrone-c83f12.netlify.app"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
      exposedHeaders: ["*"],
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })
  );


app.use(express.json())

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.status(200).json("testing") 
})

scheduleExpiredProposals()

app.use("/api/v1/proposal", proposal)
app.use("/api/v1/vote", voting)
app.use("/api/v1/payment",payment)
app.listen(PORT, () =>  console.log("Server running on PORT 5000"))