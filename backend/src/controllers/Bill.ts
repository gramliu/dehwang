import { Request, Response } from "express";
import Bill from "../models/Bill";
import BillAuthorship from "../models/BillAuthorship";
import Stance from "../models/Stance";
import { ObjectId } from "bson";
import { bad, error } from "../util/error";

export const getBill = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const bill = await Bill.findById(id);
    const politicians = await BillAuthorship.find({ bill: id }).populate(
      "author"
    );

    res.json({
      bill,
      politicians,
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

export const addBill = async (req: Request, res: Response): Promise<void> => {
  const {
    billNum,
    title,
    abstract,
    date,
    significance,
    status,
    tldr,
    text,
    sourceUrl,
    stanceNames,
  } = req.body;

  try {
    const dateField = new Date(date);

    const getStanceId = async (stanceName: string): Promise<ObjectId> => {
      const stance = await Stance.findOne({ name: stanceName });
      if (stance) {
        return stance._id;
      }
      const newStance = new Stance({ name: stanceName, topic: stanceName });
      const savedStance = await newStance.save();
      return savedStance._id;
    };
    const stances = await Promise.all(stanceNames.map(getStanceId));

    const bill = new Bill({
      billNum,
      title,
      abstract,
      dateField,
      significance,
      status,
      tldr,
      text,
      sourceUrl,
      stances,
    });
    const savedBill = await bill.save();
    res.json({
      bill: savedBill,
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
