import toJSON from "@/utils/toJSON";
import mongoose, { Types } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface ICheckin {
  userId: Types.ObjectId;
  gymId: Types.ObjectId;
  validatedAt: Date;
}

export interface ICheckinDoc extends mongoose.Document, ICheckin {}

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

const Checkin = mongoose.model<
  ICheckinDoc,
  mongoose.PaginateModel<ICheckinDoc>
>("Checkin", checkinSchema);

export default Checkin;
