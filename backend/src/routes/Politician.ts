import { getPolitician } from "controllers/Politician";
import express, { Router } from "express";
import { asyncCatch } from "util/asyncCatch";

const router: Router = express.Router();

router.get("/:id", asyncCatch(getPolitician));

export default router;
