import toJSON from "@/utils/toJSON";
import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

interface Location {
  type: string;
  coordinates: number[];
}

export interface IGym {
  title: string;
  description?: string;
  phone?: string;
  location: Location;
}

export interface IGymDoc extends mongoose.Document, IGym {}

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
    // checkin: [
    //   {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: "Chekin",
    //     required: true,
    //   },
    // ],
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
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

const Gym = mongoose.model<IGymDoc, mongoose.PaginateModel<IGymDoc>>(
  "Gym",
  gymSchema
);

export default Gym;
