import { model, Schema } from "mongoose";
import { IPolitican } from "_types/Politician";

const Politician: Schema<IPolitican> = new Schema({
  name: { type: String, required: true },
  role: { type: String },
  location: { type: String },
  picUrl: { type: String },
});

Politician.index({ name: "text", role: "text", location: "text" });
export default model<IPolitican>("Politician", Politician, "politicians");
