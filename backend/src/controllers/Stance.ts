import { Request, Response } from "express";
import Bill from "../models/Bill";
import BillAuthorship from "../models/BillAuthorship";
import Stance from "../models/Stance";
import { bad, error } from "../util/error";

export const getStance = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const stance = await Stance.findById(id);
    const bills = await Bill.find({ stances: { $elemMatch: { $eq: id } } });

    const billCounts: Record<string, number> = {};
    const authorRecord: Record<string, any> = {};
    for (const bill of bills) {
      const authorships = await BillAuthorship.find({
        bill: bill._id,
      }).populate("author");
      for (const authorship of authorships) {
        const authorId = (authorship.author as any)._id;
        if (authorRecord[authorId] == null) {
          authorRecord[authorId] = authorship.author;
        }
        billCounts[authorId] = (billCounts[authorId] || 0) + 1;
      }
    }
    const authorRankings = Object.entries(billCounts).sort(
      (a, b) => b[1] - a[1]
    );

    const topAuthors = authorRankings.map((entry) => authorRecord[entry[0]]);

    res.json({
      stance,
      bills,
      topAuthors,
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
