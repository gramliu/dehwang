import express from "express";
import politicianRouter from "./Politician";
import billRouter from "./Bill";
import stanceRouter from "./Stance";
import searchRouter from "./Search";

const router = express.Router();

router.use("/politician", politicianRouter);
router.use("/bill", billRouter);
router.use("/stance", stanceRouter);
router.use("/search", searchRouter);

export default router;
