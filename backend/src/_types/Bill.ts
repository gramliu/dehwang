import { Document, ObjectId } from "mongoose";

import { BillSignificance } from "../_enums/BillSignificance";

export interface IBill extends Document {
  _id: ObjectId;
  billNum: string;
  title: string;
  abstract: string;
  dateField: Date;
  significance: BillSignificance;
  status: string;
  tldr: string;
  text: string;
  sourceUrl: string;
  stances: ObjectId[];
}
