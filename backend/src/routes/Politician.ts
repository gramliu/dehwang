import {
  getPolitician,
  addPolitician,
  getPoliticians,
} from "../controllers/Politician";
import express, { Router } from "express";
import { asyncCatch } from "../util/asyncCatch";

const router: Router = express.Router();

router.get("/", asyncCatch(getPoliticians));
router.get("/:id", asyncCatch(getPolitician));
router.post("/", asyncCatch(addPolitician));

export default router;
