import { model, Schema } from "mongoose";
import { IStance } from "../_types/Stance";

const Stance: Schema<IStance> = new Schema({
  name: { type: String, required: true, text: true },
  topic: { type: String, text: true },
});

export default model<IStance>("Stance", Stance, "stances");
