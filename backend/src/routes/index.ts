import billRouter from "./Bill";
import express from "express";
import gameRouter from "./Game";
import politicianRouter from "./Politician";
import stanceRouter from "./Stance";

const router = express.Router();

router.use("/bill", billRouter);
router.use("/game", gameRouter);
router.use("/politician", politicianRouter);
router.use("/stance", stanceRouter);

export default router;
