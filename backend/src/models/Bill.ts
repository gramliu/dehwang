import { model, Schema } from "mongoose";
import { IBill } from "../_types/Bill";
import { BillSignificance } from "../_enums/BillSignificance";

const Bill: Schema<IBill> = new Schema({
  billNum: { type: String, required: true },
  title: { type: String, required: true },
  abstract: { type: String },
  dateField: { type: Schema.Types.Date },
  significance: {
    type: String,
    enum: Object.values(BillSignificance),
    default: BillSignificance.NATIONAL,
  },
  status: { type: String },
  tldr: { type: String },
  text: { type: String },
  sourceUrl: { type: String },
  stances: { type: [Schema.Types.ObjectId], ref: "Stance", required: true },
});

Bill.index({ title: "text", text: "text", tldr: "text" });

export default model<IBill>("Bill", Bill, "bills");
