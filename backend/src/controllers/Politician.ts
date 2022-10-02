import { Request, Response } from "express";
import { ObjectId } from "bson";
import BillAuthorship from "models/BillAuthorship";
import Politician from "models/Politician";
import { bad, error } from "../util/error";
import { AuthorType } from "_types/BillAuthorship"
import { IPolitican } from "_types/Politician";
import { IBill } from "_types/Bill";

export const getPolitician = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const politician = await Politician.findById(id);
    const bills = await BillAuthorship.find({ author: politician.id })
      .populate("bill")
      .populate({
        path: "bill",
        populate: {
          path: "stances",
          model: "Bill",
        },
      });

    res.
  } catch (err) {
    if (err.name === "CastError" || err.name === "ValidationError") {
      return bad(res);
    } else {
      console.error(err);
      return error(res);
    }
  }
};
