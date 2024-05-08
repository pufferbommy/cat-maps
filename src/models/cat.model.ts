import mongoose, { Schema, Types, models } from "mongoose";

interface ICat {
  latitude: number;
  longitude: number;
  imageUrl: string;
  uploader: Types.ObjectId;
  createdAt: Date;
}

const catSchema = new Schema<ICat>({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  uploader: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cat = models.Cat || mongoose.model("Cat", catSchema);

export default Cat;
