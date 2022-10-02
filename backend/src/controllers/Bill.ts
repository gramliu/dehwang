import { ObjectId } from "bson";
import { Request, Response } from "express";
import { Schema } from "mongoose";
import Bill from "../models/Bill";
import BillAuthorship from "../models/BillAuthorship";
import Stance from "../models/Stance";
import { bad, error } from "../util/error";
import { AuthorType } from "../_types/BillAuthorship";

export const getBill = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const bill = await (await Bill.findById(id)).populate("stances");
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
    primary,
    secondary,
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
    await generateAuthorships(savedBill._id, primary, secondary);

    res.json({
      bill: savedBill,
    });
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

async function generateAuthorships(
  billId: Schema.Types.ObjectId,
  primary: string[],
  secondary: string[]
) {
  const promises = [];
  for (const id of primary) {
    const authorship = new BillAuthorship({
      bill: billId,
      author: id,
      authorType: AuthorType.PRINCIPAL,
    });
    promises.push(authorship.save());
  }
  for (const id of secondary) {
    const authorship = new BillAuthorship({
      bill: billId,
      author: id,
      authorType: AuthorType.SECONDARY,
    });
    promises.push(authorship.save());
  }
  await Promise.all(promises);
}
