import { model, Schema } from "mongoose";
import { IPolitican } from "../_types/Politician";
import BillAuthorship from "./BillAuthorship";

const Politician: Schema<IPolitican> = new Schema(
  {
    name: { type: String, required: true, text: true },
    role: { type: String, text: true },
    location: { type: String, text: true },
    picUrl: { type: String },
  },
  {
    methods: {
      getStances: async function (callback: (x: any) => any) {
        const id = this._id;
        const bills = await BillAuthorship.find({ author: id })
          .populate("bill")
          .populate({
            path: "bill",
            populate: {
              path: "stances",
            },
          });

        const stances = bills.map((entry: any) => entry.bill.stances).flat();
        const frequency = {} as Record<string, number>;
        const stanceMap = {} as Record<string, any>;
        for (const stance of stances) {
          if (frequency[stance._id] == null) {
            frequency[stance._id] = 0;
            stanceMap[stance._id] = stance;
          }
          frequency[stance._id]++;
        }
        const sorted = Object.entries(frequency)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5);
        const topStances = sorted.map(([id]) => stanceMap[id]);

        callback(topStances);
      },
    },
  }
);

export default model<IPolitican>("Politician", Politician, "politicians");
