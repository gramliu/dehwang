import { getBill, addBill } from "controllers/Bill";
import express, { Router } from "express";
import { asyncCatch } from "util/asyncCatch";

const router: Router = express.Router();

router.get("/:id", asyncCatch(getBill));
router.post("/", asyncCatch(addBill));

export default router;
