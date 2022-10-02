import express from "express";
import router from "./routes";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  autoIndex: true,
});

const app = express();
app.use(express.json());
app.use("/", router);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
