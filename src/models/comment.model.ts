import mongoose, { Schema, models } from "mongoose";

const commentSchema = new Schema({
  _id: Schema.Types.ObjectId,
  text: {
    type: String,
    required: true,
  },
  catId: {
    type: Schema.Types.ObjectId,
    ref: "Cat",
  },
  createdByUserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Comment = models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
