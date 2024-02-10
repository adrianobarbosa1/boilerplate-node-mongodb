import { roles } from "@/config/roles";
import mongoose from "mongoose";
import validator from "validator";
import { CheckinAttrs } from "./checkin";

interface GymAttrs {
  title: string;
  description?: string;
  phone?: string;
  latitude: string;
  longitude: string;
  checkin: CheckinAttrs[];
}

interface GymDoc extends mongoose.Document {
  title: string;
  description?: string;
  phone?: string;
  latitude: string;
  longitude: string;
  checkin: CheckinAttrs[];
}

interface GymModel extends mongoose.Model<GymDoc> {
  build(attrs: GymAttrs): GymDoc;
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
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    passwordHash: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },
    role: {
      type: String,
      enum: roles,
      default: "user",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

gymSchema.statics.build = (attrs: GymAttrs) => {
  return new Gym(attrs);
};

const Gym = mongoose.model<GymDoc, GymModel>("Gym", gymSchema);

export { Gym };
