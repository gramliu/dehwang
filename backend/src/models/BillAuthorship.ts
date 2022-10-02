import { model, Schema } from "mongoose";
import { IBillAuthorship, AuthorType } from "_types/BillAuthorship";

const BillAuthorship: Schema<IBillAuthorship> = new Schema({
  bill: { type: Schema.Types.ObjectId, ref: "Bill", required: true },
  author: { type: Schema.Types.ObjectId, ref: "Politician", required: true },
  authorType: {
    type: String,
    enum: Object.values(AuthorType),
    default: AuthorType.PRINCIPAL,
  },
});

export default model<IBillAuthorship>(
  "BillAuthorship",
  BillAuthorship,
  "billAuthorships"
);
