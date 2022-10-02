import express from "express";
import politicianRouter from "./Politician";
import billRouter from "./Bill";

const router = express.Router();

router.use("/politician", politicianRouter);
router.use("/bill", billRouter);

export default router;
