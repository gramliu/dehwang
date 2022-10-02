import { getStance } from "../controllers/Stance";
import express, { Router } from "express";
import { asyncCatch } from "../util/asyncCatch";

const router: Router = express.Router();

router.get("/:id", asyncCatch(getStance));

export default router;
