import mongoose, { Schema, models } from "mongoose";

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  cat: {
    type: Schema.Types.ObjectId,
    ref: "Cat",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Comment = models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
