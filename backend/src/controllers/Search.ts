import { Request, Response } from "express";
import { bad, error } from "../util/error";
import {
  searchBillsPipeline,
  searchPoliticiansPipeline,
  searchStancesPipeline,
} from "../aggregations/Search";
import Bill from "../models/Bill";
import Politician from "../models/Politician";
import Stance from "../models/Stance";
import { IBill } from "../_types/Bill";
import { IPolitican } from "../_types/Politician";
import BillAuthorship from "../models/BillAuthorship";

interface BillResult {
  bill: IBill;
  authors: IPolitican[];
}

export const search = async (req: Request, res: Response): Promise<void> => {
  const { query } = req.query as { query: string };

  try {
    const billPaths = ["title", "text", "tldr"];
    const politicianPaths = ["name", "role", "location"];
    const stancePaths = ["name", "topic"];

    const bills = await Bill.aggregate([
      {
        $search: {
          text: { path: billPaths, query, fuzzy: {} },
        },
      },
    ]);
    const politicians = await Politician.aggregate([
      {
        $search: {
          text: { path: politicianPaths, query, fuzzy: {} },
        },
      },
    ]);
    const stances = await Stance.aggregate([
      {
        $search: {
          text: { query, fuzzy: {}, path: stancePaths },
        },
      },
    ]);

    const billResults = [];
    for (const bill of bills) {
      const authors = await BillAuthorship.find({ bill: bill._id }).populate(
        "author"
      );
      billResults.push({ bill, authors });
    }

    res.json({ bills: billResults, politicians, stances });
  } catch (err) {
    if (err.name === "CastError" || err.name === "ValidationError") {
      return bad(res);
    } else {
      console.error(err);
      return error(res);
    }
  }
};
