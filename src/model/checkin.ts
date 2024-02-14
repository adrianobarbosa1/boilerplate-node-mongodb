import toJSON from "@/utils/toJSON";
import mongoose, { Document, Types } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface Checkin extends Document {
  id: string;
  userId: Types.ObjectId;
  gymId: Types.ObjectId;
  validatedAt: Date;
  createdAt: Date;
}

const checkinSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    gymId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Gym",
      required: true,
    },
    validatedAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

checkinSchema.plugin(toJSON);
checkinSchema.plugin(paginate);

const Checkin = mongoose.model<Checkin, mongoose.PaginateModel<Checkin>>(
  "Checkin",
  checkinSchema
);

export default Checkin;
