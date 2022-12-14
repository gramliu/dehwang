import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import router from "./routes";

dotenv.config();

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  autoIndex: true,
});

// Bill.ensureIndexes();
// Politician.ensureIndexes();
// Stance.ensureIndexes();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
