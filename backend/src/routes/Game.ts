import { getRoot, getPlay, putEarnings } from "controllers/Game";
import express, { Router } from "express";
import { asyncCatch } from "util/asyncCatch";

const router: Router = express.Router();

router.get("/", asyncCatch(getRoot));
router.get("/play", asyncCatch(getPlay));
router.put("/earn/:amount", asyncCatch(putEarnings));

export default router;
