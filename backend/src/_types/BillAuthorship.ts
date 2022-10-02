import { Document } from "mongoose";
import { ObjectId } from "bson";

export enum AuthorType {
  PRINCIPAL = "PRINCIPAL",
  SECONDARY = "SECONDARY",
}

export interface IBillAuthorship extends Document {
  _id: ObjectId;
  bill: ObjectId;
  author: ObjectId;
  authorType: AuthorType;
}
