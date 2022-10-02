import { model, Schema } from "mongoose";
import { IStance } from "_types/Stance";

const Stance: Schema<IStance> = new Schema({
  name: { type: String, required: true },
  topic: { type: String },
});

export default model<IStance>("Stance", Stance, "stances");
