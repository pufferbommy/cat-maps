import mongoose, { Schema, models } from "mongoose";

const catSchema = new Schema({
  _id: Schema.Types.ObjectId,
  description: String,
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  imageUrl: {
    type: String,
    required: true,
  },
  createdByUserId: {
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
