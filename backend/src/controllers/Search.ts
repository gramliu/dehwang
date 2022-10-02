import { Request, Response } from "express";
import { bad, error } from "../util/error";
import {
  searchBillsPipeline,
  searchPoliticiansPipeline,
  searchStancesPipeline,
} from "../aggregations/Search";
import Bill from "models/Bill";
import Politician from "models/Politician";
import Stance from "models/Stance";
import { IBill } from "_types/Bill";
import { IPolitican } from "_types/Politician";
import BillAuthorship from "models/BillAuthorship";

interface BillResult {
  bill: IBill;
  authors: IPolitican[];
}

export const search = async (req: Request, res: Response): Promise<void> => {
  const { query } = req.params;

  try {
    const billsPipeline = searchBillsPipeline(query);
    const politiciansPipeline = searchPoliticiansPipeline(query);
    const stancesPipeline = searchStancesPipeline(query);

    const bills = await Bill.aggregate(billsPipeline);
    const politicians = await Politician.aggregate(politiciansPipeline);
    const stances = await Stance.aggregate(stancesPipeline);

    const billResults = [];
    for (const bill of bills) {
      const authors = BillAuthorship.find({ bill: bill._id }).populate(
        "author"
      );
      billResults.push({ bill, authors });
    }

    res.json({ billResults, politicians, stances });
  } catch (err) {
    if (err.name === "CastError" || err.name === "ValidationError") {
      return bad(res);
    } else {
      console.error(err);
      return error(res);
    }
  }
};
