import { Request, Response } from "express";
import BillAuthorship from "../models/BillAuthorship";
import Politician from "../models/Politician";
import { bad, error } from "../util/error";

export const getPoliticians = async (
  req: Request,
  res: Response
): Promise<void> => {
  const politicians = await Politician.find({});
  res.json(politicians);
};

export const getPolitician = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const politician = await Politician.findById(id);
    const bills = await BillAuthorship.find({ author: id })
      .populate("bill")
      .populate({
        path: "bill",
        populate: {
          path: "stances",
        },
      });

    const promise = new Promise(async (resolve, reject) => {
      (politician as any).getStances(resolve);
    });
    const stances = await promise;

    res.json({
      politician: politician,
      bills: bills,
      stances,
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

export const addPolitician = async (
  req: Request,
  res: Response
): Promise<void> => {
  const body = req.body;

  try {
    const politician = new Politician(body);
    const politicianObject = await politician.save();
    res.json(politicianObject);
  } catch (err) {
    if (err.name === "CastError" || err.name === "ValidationError") {
      console.error(err);
      return bad(res);
    } else {
      console.error(err);
      return error(res);
    }
  }
};
