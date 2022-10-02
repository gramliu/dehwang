import { Request, Response } from "express";
import Bill from "../models/Bill";
import BillAuthorship from "../models/BillAuthorship";
import Politician from "../models/Politician";
import Stance from "../models/Stance";
import { bad, error } from "../util/error";
import { IBill } from "../_types/Bill";
import { IPolitican } from "../_types/Politician";

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
      {
        $limit: 10,
      },
    ]);
    const politicians = await Politician.aggregate([
      {
        $search: {
          text: { path: politicianPaths, query, fuzzy: {} },
        },
      },
      {
        $limit: 10,
      },
    ]);
    const stances = await Stance.aggregate([
      {
        $search: {
          text: { query, fuzzy: {}, path: stancePaths },
        },
      },
      {
        $limit: 10,
      },
    ]);

    const billPromises = [];
    for (const bill of bills) {
      const promise = new Promise(async (resolve, reject) => {
        const billDoc = await (
          await Bill.findById(bill._id)
        ).populate("stances");
        const authors = await BillAuthorship.find({ bill: bill._id }).populate(
          "author"
        );
        resolve({ bill: billDoc, authors });
      });
      billPromises.push(promise);
    }

    const politicianPromises = [];
    for (const politician of politicians) {
      const promise = new Promise(async (resolve, reject) => {
        const politicianDoc = await Politician.findById(politician._id);
        const promise = new Promise(async (resolve, reject) => {
          await (politicianDoc as any).getStances(resolve);
        });
        const stances = await promise;

        resolve({
          ...politicianDoc.toJSON(),
          stances,
        });
      });
      politicianPromises.push(promise);
    }

    const mappedBills = await Promise.all(billPromises);
    const mappedPoliticians = await Promise.all(politicianPromises);

    res.json({ bills: mappedBills, politicians: mappedPoliticians, stances });
  } catch (err) {
    if (err.name === "CastError" || err.name === "ValidationError") {
      return bad(res);
    } else {
      console.error(err);
      return error(res);
    }
  }
};
