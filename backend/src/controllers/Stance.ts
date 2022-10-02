import { Request, Response } from "express";
import Bill from "models/Bill";
import BillAuthorship from "models/BillAuthorship";
import Stance from "models/Stance";
import { bad, error } from "../util/error";

export const getStance = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const stance = await Stance.findById(id);
    const bills = await Bill.find({ stances: { $elemMatch: { $eq: id } } });

    const billCounts: Record<string, number> = {};
    for (const bill of bills) {
      const authors = await BillAuthorship.find({ bill: bill._id });
      for (const author of authors) {
        billCounts[author.author.toString()] =
          (billCounts[author.author.toString()] || 0) + 1;
      }
    }
    const authorRankings = Object.entries(billCounts).sort(
      (a, b) => b[1] - a[1]
    );

    res.json({
      stance,
      bills,
      authorRankings,
    });
  } catch (err) {
    if (err.name === "CastError" || err.name === "ValidationError") {
      return bad(res);
    } else {
      console.error(err);
      return error(res);
    }
  }
};
