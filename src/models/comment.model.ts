import mongoose, { Schema, Types, models } from "mongoose";

interface IComment {
  text: string;
  cat: Types.ObjectId;
  user: Types.ObjectId;
}

const commentSchema = new Schema<IComment>({
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
