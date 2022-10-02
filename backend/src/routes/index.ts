import express from "express";
import politicianRouter from "./Politician";

const router = express.Router();

router.use("/politician", politicianRouter);

export default router;
