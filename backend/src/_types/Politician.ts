import { Document } from "mongoose";
import { ObjectId } from "bson";

export interface IPolitican extends Document {
  _id: ObjectId;
  name: string;
  role: string;
  location: string;
  picUrl: string;
}
