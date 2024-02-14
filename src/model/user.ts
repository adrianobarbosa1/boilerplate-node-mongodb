import * as mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import validator from "validator";
import { roles } from "../config/roles";

export interface User extends Document {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role?: string;
  createdAt: Date;
}

const userSchema = new mongoose.Schema(
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

const User = mongoose.model<User, mongoose.PaginateModel<User>>(
  "User",
  userSchema
);

export default User;
