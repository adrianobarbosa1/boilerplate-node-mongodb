import mongoose from "mongoose";

export interface CheckinAttrs {
  userId: string;
  gymId: string;
  validatedAt: Date;
}

interface CheckinDoc extends mongoose.Document {
  userId: string;
  gymId: string;
  validatedAt: Date;
}

interface CheckinModel extends mongoose.Model<CheckinDoc> {
  build(attrs: CheckinAttrs): CheckinDoc;
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
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

checkinSchema.statics.build = (attrs: CheckinAttrs) => {
  return new Checkin(attrs);
};

const Checkin = mongoose.model<CheckinDoc, CheckinModel>(
  "Checkin",
  checkinSchema
);

export { Checkin };
