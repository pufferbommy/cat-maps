import mongoose, { Schema, models } from "mongoose";

const likeSchema = new Schema({
  _id: Schema.Types.ObjectId,
  catId: {
    type: Schema.Types.ObjectId,
    ref: "Cat",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Like = models.Like || mongoose.model("Like", likeSchema);

export default Like;
