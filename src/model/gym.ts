import toJSON from "@/utils/toJSON";
import mongoose, { Document } from "mongoose";
import paginate from "mongoose-paginate-v2";

interface Location {
  type: string;
  coordinates: number[];
}

export interface Gym extends Document {
  title: string;
  description?: string;
  phone?: string;
  location: Location;
}

const gymSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true,
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

gymSchema.plugin(toJSON);
gymSchema.plugin(paginate);

gymSchema.index({ location: "2dsphere" });

const Gym = mongoose.model<Gym, mongoose.PaginateModel<Gym>>("Gym", gymSchema);

export default Gym;
