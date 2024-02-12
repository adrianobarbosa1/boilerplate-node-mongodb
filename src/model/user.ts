import { roles } from "@/config/roles";
import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import validator from "validator";

export interface IUserInput {
  name: string;
  email: string;
  passwordHash: string;
}
export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  role?: string;
  isEmailVerified?: boolean;
}

export interface IUserDoc extends mongoose.Document, IUser {}

const userSchema: Schema<IUserDoc> = new mongoose.Schema(
  {
    name: {
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
        delete ret.passwordHash;
        delete ret.__v;
      },
    },
  }
);

userSchema.plugin(paginate);

const User = mongoose.model<IUserDoc, mongoose.PaginateModel<IUserDoc>>(
  "User",
  userSchema
);

export default User;
