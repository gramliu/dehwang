import { Document } from "mongoose";
import { ObjectId } from "bson";

export interface IStance extends Document {
  _id: ObjectId;
  name: string;
  topic: string;
}
