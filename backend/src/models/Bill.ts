import { model, Schema } from "mongoose";
import { IBill } from "../_types/Bill";
import { BillSignificance } from "../_enums/BillSignificance";

const Bill: Schema<IBill> = new Schema({
  billNum: { type: String, required: true, text: true },
  title: { type: String, required: true, text: true },
  abstract: { type: String },
  dateField: { type: Schema.Types.Date },
  significance: {
    type: String,
    enum: Object.values(BillSignificance),
    default: BillSignificance.NATIONAL,
  },
  status: { type: String },
  tldr: { type: String, text: true },
  text: { type: String, text: true },
  sourceUrl: { type: String },
  stances: { type: [Schema.Types.ObjectId], ref: "Stance", required: true },
});

export default model<IBill>("Bill", Bill, "bills");
