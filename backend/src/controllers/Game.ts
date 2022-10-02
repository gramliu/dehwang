import { Request, Response } from "express";
import Bill from "../models/Bill";
import BillAuthorship from "../models/BillAuthorship";
import { bad, error } from "../util/error";

type Confirmation = void;

export const getRoot = async (_: Request, res: Response): Promise<void> => {
  res.json({});
};

export const getPlay = async (_: Request, res: Response): Promise<void> => {
  try {
    const bills = await Bill.find({});
    const billInfo = await Promise.all(
      bills.map(async (bill) => {
        const authors = await BillAuthorship.find({ bill: bill._id }).populate(
          "author"
        );
        const authorInfo = authors.map((ba) => ba.author);
        return {
          billNum: bill.billNum,
          title: bill.title,
          tldr: bill.tldr,
          abstract: bill.abstract,
          stances: bill.stances,
          authorInfo,
        };
      })
    );
    res.json({
      billInfo,
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

export const putEarnings = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { amount } = req.params;

  const deposit = async (amount: number): Promise<Confirmation> => {};

  try {
    const confirmation = await deposit(parseFloat(amount));
    res.json({ confirmation });
  } catch (err) {
    if (err.name === "CastError" || err.name === "ValidationError") {
      return bad(res);
    } else {
      console.error(err);
      return error(res);
    }
  }
};
