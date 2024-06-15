import mongoose, { Schema, Types, models } from "mongoose";

interface ILike {
  user: Types.ObjectId;
  cat: Types.ObjectId;
}

const likeSchema = new Schema<ILike>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cat: {
    type: Schema.Types.ObjectId,
    ref: "Cat",
    required: true,
  },
});

const Like = models.Like || mongoose.model("Like", likeSchema);

export default Like;
