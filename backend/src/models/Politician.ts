import { model, Schema } from "mongoose";
import { IPolitican } from "../_types/Politician";

const Politician: Schema<IPolitican> = new Schema({
  name: { type: String, required: true, text: true },
  role: { type: String, text: true },
  location: { type: String, text: true },
  picUrl: { type: String },
});

export default model<IPolitican>("Politician", Politician, "politicians");
