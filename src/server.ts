import express from "express"
import mongoose from "mongoose"
import proposal from "./routes/proposals"
import dotenv from "dotenv"
import voting from "./routes/vote"
import payment from "./routes/payments"
import cors from "cors"

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

app.use(
    cors({
      origin: ["http://localhost:5173", ""],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
      exposedHeaders: ["*"],
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })
  );

app.use(cors());

app.use(express.json())

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.status(200).json("testing") 
})

app.use("/api/v1/proposal", proposal)
app.use("/api/v1/vote", voting)
app.use("/api/v1/payment",payment)
app.listen(PORT, () =>  console.log("Server running on PORT 5000"))