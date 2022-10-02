import { search } from "../controllers/Search";
import express, { Router } from "express";
import { asyncCatch } from "../util/asyncCatch";

const router: Router = express.Router();

router.get("/", asyncCatch(search));

export default router;
