import express from "express";
import politicianRouter from "./Politician";
import billRouter from "./Bill";
import stanceRouter from "./Stance";

const router = express.Router();

router.use("/politician", politicianRouter);
router.use("/bill", billRouter);
router.use("/stance", stanceRouter);

export default router;
